import { supabase, supabaseService } from "../supabase/index.js";
import AppError, {
  ValidationError,
  AuthenticationError,
} from "../../error/appError.js";

class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    // Authenticate user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AuthenticationError("Invalid email or password");
    }

    res.cookie("token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Lax", // Adjust as necessary
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });
    res.cookie("refresh_token", data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7), // 1 week
    });
    res.json({ message: "Login successful", user: data.user });
  }

  async register(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    const userExists = await this.isUserExists(email);

    if (userExists.isUserExists) {
      throw new AuthenticationError("User already exists");
    }

    // Register user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: req.body.username || "",
          full_name: req.body.full_name || "",
        },
      },
    });

    if (error) {
      throw new AppError(error.message, error.statusCode || 500);
    }

    res.json({
      message: "Registration successful. Confirm Email in your inbox.",
      user: data.user,
    });
  }

  async isUserExists(email) {
    // Check if user exists in Supabase
    const { data, error } = await supabaseService
      .from("profiles")
      .select("id")
      .eq("email", email);

    if (error) {
      return { error: error.message };
    }

    if (data.length > 0) {
      return { isUserExists: true };
    }

    return { isUserExists: false };
  }

  async refresh_token(refreshToken) {
    // Refresh the session using the refresh token
    if (!refreshToken) {
      return { session: null, error: "No refresh token provided" };
    }

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error || !session) {
        throw error;
      }

      return { session, error: null };
    } catch (error) {
      return { session: null, error: error.message };
    }
  }

  async silentSignIn(req, res) {
  let token = req.cookies?.token || null;
  let refreshToken = req.cookies?.refresh_token || null;

  if (!token && !refreshToken) {
    throw new AuthenticationError("No valid session found. Please log in again.", 401);
  }

  let data, error;

  // 1. No access token but refresh available → try refresh
  if (!token && refreshToken) {
     console.log("Refreshing token:", refreshToken);
    const { session, error: refreshError } = await this.refresh_token(refreshToken);

    console.log("Silent sign-in with refresh token:", session, refreshError);
    if (refreshError || !session) {
      throw new AuthenticationError(refreshError?.message || "Failed to refresh token", 401);
    }
    token = session.access_token;
    refreshToken = session.refresh_token;
  }

  // 2. Validate token
  ({ data, error } = await supabase.auth.getUser(token));

  // 3. If invalid → try refresh once
  if (error && error?.code === "bad_jwt" && refreshToken) {

    const { session, error: refreshError } = await this.refresh_token(refreshToken);
    if (refreshError || !session) {
      throw new AuthenticationError("Failed to refresh token", 401);
    }
    token = session.access_token;
    refreshToken = session.refresh_token;

    ({ data, error } = await supabase.auth.getUser(token));
  }

  // 4. Still invalid → reject
  if (error || !data?.user) {
    throw new AuthenticationError("Session expired. Please log in again.", 401);
  }

  // 5. Reset cookies
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax", // Adjust as necessary
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1h
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1w
  });

  res.json({
    message: "Silent sign-in successful",
    user: data.user,
    expiresIn: 3600,
  });
}


  async logout(req, res) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return new AppError(
        error.message || "Failed to log out",
        error.statusCode || 500
      );
    }
    res.clearCookie("token");
    res.clearCookie("refresh_token");
    res.status(200).json({ message: "Logout successful" });
  }
}

export default AuthController;

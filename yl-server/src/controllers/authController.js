import { supabase, supabaseService } from "../supabase/index.js";

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    // Authenticate user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

   
    res.cookie("token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict",
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });
    res.cookie("refresh_token", data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7), // 1 week
    });
     res.json({ message: "Login successful", user: data.user });
  }

  async register(req, res) {
    const { email, password } = req.body;

    const userExists = await this.isUserExists(email);
    if (userExists.isUserExists) {
      return res.status(409).json({ error: "User already exists" });
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
      return res.status(400).json({ error: error.message });
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
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      return { error: error.message };
    }
  }

  async silentSignIn(req, res) {
    let token = req.cookies?.token || null;
    let refreshToken = req.cookies?.refresh_token || null;

    if (!token && !refreshToken) {
      return res
        .status(401)
        .json({ error: "No token or refresh token provided" });
    }

    try {
      if (!token) {
        const { data, error } = await this.refresh_token(refreshToken);

        if (error) {
          throw error;
        }

        token = data?.session.access_token;
        refreshToken = data?.session.refresh_token;
      }

      const { data, error } = await supabase.auth.getUser(token);

      if (error) {
        throw error;
      }

      

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7), // 1 week
      });

      res.json({ message: "Silent sign-in successful", user: data.user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.clearCookie("token");
    res.clearCookie("refresh_token");
    res.status(200).json({ message: "Logout successful" });
  }
}

export default AuthController;

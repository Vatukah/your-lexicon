import supabase from '../supabase/index.js';

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

        res.json({ message: 'Login successful', user: data.user });
    }

    async register(req, res) {
        const { email, password } = req.body;

        // Register user with Supabase
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: req.body.username || '',
                    full_name: req.body.full_name || '',
                },
            },
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Registration successful. Confirm Email in your inbox.', user: data.user });
    }
}

export default AuthController;
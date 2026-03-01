import { supabase } from './config.js';
import { showToast } from './ui.js';

// Sign Up User
export const signupUser = async (email, password, metadata) => {
    try {
        console.log('Starting signup process...');
        
        if (!supabase) {
            throw new Error("Supabase not initialized. Please check your config.js file.");
        }
        
        if (!email || !password) {
            throw new Error("Email aur password zaruri hain!");
        }
        
        if (password.length < 8) {
            throw new Error("Password kam se kam 8 characters ka hona chahiye!");
        }
        
        showToast("Account bana rahe hain, please wait...", 'info');
        
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
                emailRedirectTo: window.location.origin + '/user-dashboard.html'
            }
        });

        if (error) {
            console.error('Signup error:', error);
            throw error;
        }
        
        console.log('Signup successful:', data);
        showToast("Account ban gaya! Email check karein verification ke liye.", 'success');
        
        setTimeout(() => {
            window.location.href = 'verify-email.html';
        }, 1500);
        
        return data;
    } catch (error) {
        console.error('Signup error:', error);
        let errorMessage = error.message;
        
        // User-friendly error messages in Roman Urdu
        if (errorMessage.includes('already registered')) {
            errorMessage = "Ye email pehle se registered hai! Login karein.";
        } else if (errorMessage.includes('invalid email')) {
            errorMessage = "Email address sahi nahi hai!";
        } else if (errorMessage.includes('weak password')) {
            errorMessage = "Password zyada kamzor hai! Strong password use karein.";
        }
        
        showToast(errorMessage, 'error');
        return null;
    }
};

// Login User
export const loginUser = async (email, password) => {
    try {
        console.log('Starting login process...');
        
        if (!supabase) {
            throw new Error("Supabase not initialized. Please check your config.js file.");
        }

        if (!email || !password) {
            throw new Error("Email aur password zaruri hain!");
        }

        showToast("Login ho rahe hain...", 'info');

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error('Login error:', error);
            throw error;
        }

        console.log('Login successful:', data);
        showToast("Login successful! Dashboard par ja rahe hain...", 'success');

        setTimeout(() => {
            window.location.href = 'user-dashboard.html';
        }, 1000);
        
        return data;
    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = error.message;
        
        // User-friendly error messages
        if (errorMessage.includes('Invalid login credentials')) {
            errorMessage = "Email ya password galat hai!";
        } else if (errorMessage.includes('Email not confirmed')) {
            errorMessage = "Pehle email verify karein!";
        }
        
        showToast(errorMessage, 'error');
        return null;
    }
};

// Google OAuth Login
export const loginWithGoogle = async () => {
    try {
        if (!supabase) {
            throw new Error("Supabase not initialized");
        }

        showToast("Google login open ho raha hai...", 'info');

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/user-dashboard.html'
            }
        });

        if (error) throw error;
        
        return data;
    } catch (error) {
        console.error('Google login error:', error);
        showToast("Google login mein problem aayi: " + error.message, 'error');
        return null;
    }
};

// Logout
export const logout = async () => {
    try {
        if (!supabase) {
            throw new Error("Supabase not initialized");
        }
        
        await supabase.auth.signOut();
        showToast("Logout hogaye!", 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    } catch (error) {
        console.error('Logout error:', error);
        showToast("Logout mein problem: " + error.message, 'error');
    }
};

// Check if user is logged in
export const checkAuth = async () => {
    try {
        if (!supabase) {
            return null;
        }
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error('Auth check error:', error);
            return null;
        }
        
        return session ? session.user : null;
    } catch (error) {
        console.error('Auth check error:', error);
        return null;
    }
};

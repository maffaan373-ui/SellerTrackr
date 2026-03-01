import { supabase } from './config.js';
import { showToast } from './ui.js';

export const signupUser = async (email, password, metadata) => {
    try {
        if (!supabase) throw new Error("Supabase not initialized");
        
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        });

        if (error) throw error;
        
        showToast("Registration successful! Check your email.");
        window.location.href = 'verify-email.html';
        return data;
    } catch (error) {
        showToast(error.message, 'error');
        return null;
    }
};

export const loginUser = async (email, password) => {
    try {
        if (!supabase) throw new Error("Supabase not initialized");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        showToast("Login successful!");

        window.location.href = 'user-dashboard.html';
        return data;
    } catch (error) {
        showToast(error.message, 'error');
        return null;
    }
};

export const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
};

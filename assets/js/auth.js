import { supabase } from './config.js';
import { showToast } from './ui.js';

// ─── Sign Up ────────────────────────────────────────────────
export const signupUser = async (email, password, metadata) => {
    try {
        if (!supabase) throw new Error("Supabase not initialized. Check config.js");
        if (!email || !password) throw new Error("Email aur password zaruri hain!");
        if (password.length < 8) throw new Error("Password kam se kam 8 characters hona chahiye!");

        showToast("Account bana rahe hain…", 'info');

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
                emailRedirectTo: window.location.origin + '/user-dashboard.html'
            }
        });

        if (error) throw error;

        if (data.user && data.user.identities && data.user.identities.length === 0) {
            throw new Error("Ye email pehle se registered hai! Login karein.");
        }

        showToast("Account ban gaya! Email check karein verification ke liye.", 'success');
        setTimeout(() => window.location.href = 'verify-email.html', 1500);
        return data;

    } catch (error) {
        let msg = error.message;
        if (msg.includes('already registered') || msg.includes('User already registered')) msg = "Ye email pehle se registered hai! Login karein.";
        else if (msg.includes('invalid email'))   msg = "Email address sahi nahi hai!";
        else if (msg.includes('weak password'))   msg = "Password zyada kamzor hai!";
        else if (msg.includes('Password should')) msg = "Password kam se kam 8 characters hona chahiye!";
        showToast(msg, 'error');
        return null;
    }
};

// ─── Login ──────────────────────────────────────────────────
export const loginUser = async (email, password) => {
    try {
        if (!supabase) throw new Error("Supabase not initialized. Check config.js");
        if (!email || !password) throw new Error("Email aur password zaruri hain!");

        showToast("Login ho rahe hain…", 'info');

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        showToast("Login successful! Dashboard par ja rahe hain…", 'success');
        setTimeout(() => window.location.href = 'user-dashboard.html', 1000);
        return data;

    } catch (error) {
        let msg = error.message;
        if (msg.includes('Invalid login credentials')) msg = "Email ya password galat hai!";
        else if (msg.includes('Email not confirmed'))  msg = "Pehle email verify karein!";
        else if (msg.includes('Too many requests'))    msg = "Bahut zyada attempts. Thodi der baad try karein.";
        showToast(msg, 'error');
        return null;
    }
};

// ─── Google OAuth ────────────────────────────────────────────
export const loginWithGoogle = async () => {
    try {
        if (!supabase) throw new Error("Supabase not initialized");
        showToast("Google login open ho raha hai…", 'info');

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/user-dashboard.html',
                queryParams: { access_type: 'offline', prompt: 'consent' }
            }
        });
        if (error) throw error;
        return data;

    } catch (error) {
        let msg = error.message;
        if (msg.includes('provider is not enabled')) msg = "Google login abhi enable nahi hai. Email se try karein.";
        showToast("Google login error: " + msg, 'error');
        return null;
    }
};

// ─── Forgot Password ─────────────────────────────────────────
export const forgotPassword = async (email) => {
    try {
        if (!supabase) throw new Error("Supabase not initialized");
        if (!email) throw new Error("Email address zaruri hai!");

        showToast("Password reset email bhej rahe hain…", 'info');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password.html'
        });
        if (error) throw error;

        showToast("Password reset link bhej diya! Email check karein.", 'success');
        return true;

    } catch (error) {
        let msg = error.message;
        if (msg.includes('User not found')) msg = "Ye email registered nahi hai!";
        showToast(msg, 'error');
        return false;
    }
};

// ─── Reset Password ──────────────────────────────────────────
export const resetPassword = async (newPassword) => {
    try {
        if (!supabase) throw new Error("Supabase not initialized");
        if (newPassword.length < 8) throw new Error("Password kam se kam 8 characters hona chahiye!");

        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;

        showToast("Password update ho gaya! Login karein.", 'success');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return true;

    } catch (error) {
        showToast(error.message, 'error');
        return false;
    }
};

// ─── Logout ──────────────────────────────────────────────────
export const logout = async () => {
    try {
        if (!supabase) throw new Error("Supabase not initialized");
        await supabase.auth.signOut();
        showToast("Logout hogaye!", 'success');
        setTimeout(() => window.location.href = 'index.html', 500);
    } catch (error) {
        showToast("Logout mein problem: " + error.message, 'error');
    }
};

// ─── Check Auth ───────────────────────────────────────────────
export const checkAuth = async () => {
    try {
        if (!supabase) return null;
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) return null;
        return session ? session.user : null;
    } catch { return null; }
};

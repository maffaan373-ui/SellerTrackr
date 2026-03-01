

const SUPABASE_URL = 'https://your-project-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';



export const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export const APP_CONFIG = {
    NAME: 'SellerTrackr',
    VERSION: '1.0.0',
    OTP_EXPIRY_MINS: 10,
    COOLDOWN_SECONDS: 60
};

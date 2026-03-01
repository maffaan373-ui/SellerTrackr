

const SUPABASE_URL = 'https://dpxuopdoumomasmahnyo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweHVvcGRvdW1vbWFzbWFobnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMTE5NjUsImV4cCI6MjA4Nzg4Nzk2NX0.MxsfAZqhjp2M-yi8LVgOpTJEhSLujYTGJdivSM_VpcQ';



export const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export const APP_CONFIG = {
    NAME: 'SellerTrackr',
    VERSION: '1.0.0',
    OTP_EXPIRY_MINS: 10,
    COOLDOWN_SECONDS: 60
};

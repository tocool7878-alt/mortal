// 請填入您的 Supabase Project URL 與 public anon key
const SUPABASE_URL = 'https://rveilguasnlxryxhwqdc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_XCUECFk-OKoPfKUsaMC3TQ_KKDwLdrZ';

// 透過 index.html CDN 載入的 window.supabase 來建立 Client
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

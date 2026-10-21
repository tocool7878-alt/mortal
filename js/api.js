import { supabase } from './supabase-client.js';

// 取得左側選單的樹狀資料 (界 -> 境界 -> 戰役章節)
export async function getMenuData() {
    const { data, error } = await supabase
        .from('worlds')
        .select(`
            id, name, sort_order,
            realms (
                id, name, sort_order,
                events ( id, title, sort_order )
            )
        `)
        .order('sort_order', { ascending: true })
        // supabase-js 支援對嵌套關聯進行排序
        .order('sort_order', { foreignTable: 'realms', ascending: true })
        .order('sort_order', { foreignTable: 'realms.events', ascending: true });

    if (error) {
        console.error('取得目錄資料錯誤:', error);
        return [];
    }
    return data;
}

// 取得單一章節/戰役的詳細資料 (包含其關聯的實體)
export async function getEventDetails(eventId) {
    const { data, error } = await supabase
        .from('events')
        .select(`
            *,
            event_entities_map (
                context_desc,
                entities ( id, category, name, base_desc )
            )
        `)
        .eq('id', eventId)
        .single();

    if (error) {
        console.error('取得章節詳情錯誤:', error);
        return null;
    }
    return data;
}
import { supabase } from './supabase-client.js';

export function initMap(onLocationSelect) {
    const mapNodes = document.querySelectorAll('.map-node');
    
    mapNodes.forEach(node => {
        node.addEventListener('click', async () => {
            const locationName = node.dataset.location;
            
            // 讓節點發光
            document.querySelectorAll('.map-node circle').forEach(c => c.setAttribute('stroke', 'none'));
            node.querySelector('circle').setAttribute('stroke', '#fff');
            node.querySelector('circle').setAttribute('stroke-width', '3');

            // 觸發向 API 請求該地點的資料
            onLocationSelect(locationName);
        });
    });
}

// 根據地點名稱去 Supabase 模糊搜尋對應的戰役
export async function getEventsByLocation(locationKeyword) {
    const { data, error } = await supabase
        .from('events')
        .select('id, title, subtitle, location')
        .ilike('location', `%${locationKeyword}%`)
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('地圖搜尋錯誤:', error);
        return [];
    }
    return data;
}

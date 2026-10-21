import { getMenuData } from './api.js';

export async function initSidebar(onEventClick) {
    const container = document.getElementById('menu-container');
    const loading = document.getElementById('loading-menu');
    
    const worlds = await getMenuData();
    loading.style.display = 'none';

    if (worlds.length === 0) {
        container.innerHTML = '<p style="color:#9ca3af; padding:1rem;">尚無資料，請至 Supabase 新增。</p>';
        return;
    }

    worlds.forEach(world => {
        const worldDetails = document.createElement('details');
        worldDetails.innerHTML = `<summary>${world.name}</summary>`;
        
        world.realms.forEach(realm => {
            const realmDetails = document.createElement('details');
            realmDetails.style.marginLeft = '1rem';
            realmDetails.innerHTML = `<summary>${realm.name}</summary>`;
            
            realm.events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event-item';
                eventDiv.textContent = event.title;
                eventDiv.dataset.id = event.id; // 綁定 ID 供點擊使用
                
                eventDiv.addEventListener('click', () => {
                    // 移除其他選中狀態
                    document.querySelectorAll('.event-item').forEach(el => el.classList.remove('active'));
                    eventDiv.classList.add('active');
                    // 呼叫外部傳入的回呼函式
                    onEventClick(event.id);
                });
                
                realmDetails.appendChild(eventDiv);
            });
            worldDetails.appendChild(realmDetails);
        });
        container.appendChild(worldDetails);
    });
}
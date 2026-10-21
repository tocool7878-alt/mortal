import { getEventDetails } from './api.js';

export async function displayEventInfo(eventId) {
    const welcomeScreen = document.getElementById('welcome-screen');
    const detailsScreen = document.getElementById('event-details');
    
    // 隱藏歡迎畫面，顯示內容區
    welcomeScreen.classList.add('hidden');
    detailsScreen.classList.remove('hidden');

    const eventData = await getEventDetails(eventId);
    if (!eventData) return;

    // 填充基本文字資料
    document.getElementById('event-title').textContent = eventData.title;
    document.getElementById('event-subtitle').textContent = eventData.subtitle || '';
    document.getElementById('event-location').textContent = eventData.location || '未知區域';
    document.getElementById('event-description').textContent = eventData.description || '暫無描述';
    document.getElementById('event-tactics').textContent = eventData.tactics || '暫無紀錄';

    // 渲染實體卡片 (人物、寶物等)
    const entitiesContainer = document.getElementById('entities-container');
    entitiesContainer.innerHTML = ''; // 清空舊資料

    const mappings = eventData.event_entities_map || [];
    
    if (mappings.length === 0) {
        entitiesContainer.innerHTML = '<p style="color:var(--text-muted);">此章節暫無記錄特殊人物或法寶。</p>';
        return;
    }

    mappings.forEach(map => {
        const entity = map.entities;
        
        // 決定 CSS Class (顏色)
        let catClass = 'cat-item';
        if (entity.category === '宿敵') catClass = 'cat-enemy';
        if (entity.category === '功法') catClass = 'cat-skill';
        if (entity.category === '靈獸') catClass = 'cat-beast';
        if (entity.category === '紅顏') catClass = 'cat-companion';

        const card = document.createElement('div');
        card.className = 'entity-card';
        card.innerHTML = `
            <div class="entity-cat ${catClass}">${entity.category}</div>
            <div class="entity-name">${entity.name}</div>
            <div class="entity-desc">
                <strong>背景設定：</strong> ${entity.base_desc || '無'}<br>
                <strong style="color:var(--accent-jade); margin-top:5px; display:inline-block;">本章表現：</strong> ${map.context_desc || '無特別描述'}
            </div>
        `;
        entitiesContainer.appendChild(card);
    });
}
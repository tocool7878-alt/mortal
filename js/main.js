import { initSidebar } from './sidebar.js';
import { displayEventInfo } from './content-display.js';
import { initMap, getEventsByLocation } from './map.js';

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mapContainer = document.getElementById('map-container');
    const tabChronicle = document.getElementById('tab-chronicle');
    const tabMap = document.getElementById('tab-map');

    // 1. 初始化側邊欄
    initSidebar((eventId) => displayEventInfo(eventId));

    // 2. 初始化地圖點擊事件
    initMap(async (locationKeyword) => {
        const events = await getEventsByLocation(locationKeyword);
        if(events.length > 0) {
            // 地圖點擊後，直接顯示該地點發生的第一個事件
            // (實務上可以做一個列表讓使用者選，這裡為了快速展示直接載入第一筆)
            displayEventInfo(events[0].id);
        } else {
            alert(`目前資料庫中尚未建立「${locationKeyword}」的劇情資料。`);
        }
    });

    // 3. 處理 UI 模式切換 (目錄 vs 地圖)
    tabChronicle.addEventListener('click', () => {
        tabChronicle.classList.add('active');
        tabMap.classList.remove('active');
        sidebar.classList.remove('hidden');
        mapContainer.classList.add('hidden');
    });

    tabMap.addEventListener('click', () => {
        tabMap.classList.add('active');
        tabChronicle.classList.remove('active');
        mapContainer.classList.remove('hidden');
        sidebar.classList.add('hidden');
    });
    
    // 4. 書籤匯出功能 (將當前畫面資料複製為文字)
    document.getElementById('btn-export').addEventListener('click', () => {
        const title = document.getElementById('event-title').textContent;
        if(!title) {
            alert("請先選擇一個章節！");
            return;
        }
        const desc = document.getElementById('event-description').textContent;
        const exportText = `【凡人修仙傳研讀筆記】\n篇章：${title}\n大綱：${desc}`;
        navigator.clipboard.writeText(exportText).then(() => {
            alert("✅ 該章節筆記已成功複製到剪貼簿！");
        });
    });
});

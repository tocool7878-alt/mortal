import { initSidebar } from './sidebar.js';
import { displayEventInfo } from './content-display.js';

document.addEventListener('DOMContentLoaded', () => {
    // 初始化側邊欄，並傳遞點擊事件的 Callback Function
    // 當使用者點擊目錄時，會觸發 displayEventInfo 去撈取並顯示資料
    initSidebar((eventId) => {
        displayEventInfo(eventId);
    });
});
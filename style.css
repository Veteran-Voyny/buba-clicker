/* Глобальные стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    overflow-x: hidden;
    perspective: 1000px; /* Для 3D-эффекта */
}

.container {
    max-width: 900px;
    width: 100%;
    text-align: center;
}

header {
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    background: rgba(0, 0, 0, 0.3);
    padding: 20px;
    border-radius: 15px;
    border: 2px solid gold;
    transition: transform 0.2s ease;
    transform-style: preserve-3d; /* Для 3D-эффекта */
}

h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    color: #FFD700;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.stats {
    display: flex;
    justify-content: space-around;
    background: rgba(0, 0, 0, 0.5);
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
    transform-style: preserve-3d; /* Для 3D-эффекта */
}

.stat-item {
    padding: 0 10px;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
}

.stat-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #4CAF50; /* Зеленый для активных значений */
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.instructions {
    margin: 20px 0;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    font-size: 0.9rem;
    opacity: 0.9;
}

/* Секция кликабельной области (Буба) */
.click-area {
    margin-bottom: 40px;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
}

.buba-container {
    width: 250px;
    height: 250px;
    transition: transform 0.2s ease;
    transform-style: preserve-3d;
}

.buba {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, #FFD700, #FFA500);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 
                0 0 0 10px rgba(255, 255, 255, 0.1);
    transition: transform 0.1s ease-out;
    position: relative;
    overflow: hidden;
}

.buba-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.buba-image {
    /* ИСПРАВЛЕНИЕ: Увеличен размер до 85% для лучшей видимости */
    width: 85%;
    height: 85%;
    object-fit: contain;
    border-radius: 50%;
    transition: transform 0.2s ease;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
}

.buba-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    padding: 10px 0;
    border-radius: 0 0 50% 50% / 0 0 30% 30%;
}

.buba-text {
    font-weight: bold;
    color: #FFD700;
    font-size: 1.2rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

/* Эффект клика (летающие цифры) */
.click-effect {
    position: fixed;
    font-size: 2rem;
    font-weight: bold;
    color: #4CAF50;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    animation: fade-up 1s ease-out forwards;
    pointer-events: none;
    z-index: 100;
}

@keyframes fade-up {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(-50px);
        opacity: 0;
    }
}

/* --- Стили для навигационного меню --- */
.navigation-menu {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
    padding: 10px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.menu-button {
    padding: 10px 15px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.menu-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: #fdbb2d;
}

.menu-button.active {
    background-color: #fdbb2d; /* Золотистый/желтый */
    color: #333;
    border-color: gold;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
}

/* Разделы */
.section {
    margin-top: 40px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    text-align: left;
}

/* Скрытие неактивных разделов */
.section:not(.active) {
    display: none;
}

.section h2 {
    text-align: center;
    margin-bottom: 25px;
    color: #FFD700;
    font-size: 2rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 10px;
}

/* --- Раздел улучшений --- */
.upgrades-section .upgrades {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
}

.upgrade {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 2px solid transparent;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.upgrade:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: gold;
    transform: translateY(-3px);
}

/* ДОБАВЛЕНО: СТИЛЬ ДЛЯ ПОКУПАЕМОГО УЛУЧШЕНИЯ (чтобы светилось) */
.upgrade.can-buy {
    border-color: #4CAF50; /* Зеленый цвет рамки */
    box-shadow: 0 0 15px rgba(76, 175, 80, 0.8); /* Эффект свечения */
    background: rgba(76, 175, 80, 0.15);
}
.upgrade.can-buy:hover {
    box-shadow: 0 0 20px rgba(76, 175, 80, 1);
    background: rgba(76, 175, 80, 0.25);
}

.upgrade.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    border-color: transparent;
    box-shadow: none; /* Убираем свечение, если нельзя купить */
    background: rgba(255, 255, 255, 0.1);
}

.upgrade.disabled:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: none;
}

.upgrade-icon {
    font-size: 2.5rem;
    margin-bottom: 5px;
}

.upgrade-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: #FFD700;
    margin-bottom: 5px;
}

.upgrade-description {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 10px;
}

.upgrade-cost, .upgrade-level {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 5px;
}

.upgrade-cost span {
    color: #4CAF50;
    font-weight: bold;
}

/* --- Раздел достижений (без изменений) --- */
.achievement-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.achievement {
    background: rgba(255, 255, 255, 0.05);
    padding: 10px 15px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    border-left: 5px solid gray;
    transition: all 0.3s ease;
}

.achievement.unlocked {
    background: rgba(76, 175, 80, 0.2);
    border-left-color: #4CAF50; /* Зеленый */
}

.achievement-icon {
    font-size: 1.8rem;
    margin-right: 15px;
}

.achievement-name {
    font-weight: bold;
    flex-grow: 1;
}

.achievement-progress {
    font-size: 0.9rem;
    color: #bbb;
    margin-left: 10px;
}

.achievement.unlocked .achievement-progress {
    color: #FFD700;
    font-weight: bold;
}

.achievement-reward {
    font-size: 0.8rem;
    font-weight: bold;
    color: #4CAF50;
    margin-left: 10px;
}

/* --- Раздел настроек (изменения только в save-section) --- */
.settings {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.setting-group {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
}

.setting-group h3 {
    color: #FFD700;
    margin-bottom: 15px;
    font-size: 1.3rem;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
    padding-bottom: 5px;
    text-align: center;
}

.save-section button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    color: white;
}

/* УДАЛЕНЫ СТИЛИ ДЛЯ #save-button И #load-button */

#reset-button {
    background-color: #f44336; /* Красный */
}

.save-section button:hover {
    transform: translateY(-2px);
}

/* Стили для переключателей (Toggle Switch) */
.toggle-settings {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
}

.toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    width: 100%;
    padding: 5px 0;
}

.toggle input {
    display: none;
}

.toggle-slider {
    position: relative;
    width: 50px;
    height: 26px;
    background-color: #ccc;
    border-radius: 26px;
    transition: background-color 0.4s;
    margin-right: 15px;
    flex-shrink: 0;
}

.toggle-slider:before {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.4s;
}

.toggle input:checked + .toggle-slider {
    background-color: #4CAF50;
}

.toggle input:checked + .toggle-slider:before {
    transform: translateX(24px);
}

.toggle-text {
    font-size: 1rem;
    flex-grow: 1;
    text-align: left;
}

.game-info {
    text-align: center;
}

.game-info p {
    margin: 5px 0;
}

.game-info span {
    font-weight: bold;
    color: #FFD700;
}

/* Стили для уведомлений */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    color: #FFD700;
    padding: 15px 25px;
    border-radius: 10px;
    border-left: 5px solid gold;
    transform: translateX(400px);
    transition: transform 0.5s ease;
    z-index: 1000;
    font-weight: bold;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    max-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification.hide {
    transform: translateX(400px);
}

.notification-title {
    font-size: 1.2rem;
    margin-bottom: 5px;
    color: #FFD700;
}

.notification-message {
    font-size: 1rem;
    opacity: 0.9;
}

/* --- ДОБАВЛЕНО: Стили для МОДАЛЬНОГО ОКНА ВЫБОРА УСТРОЙСТВА --- */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    display: none; 
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-overlay.active {
    display: flex;
}

.modal-content {
    background: #1e3c72; 
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
    max-width: 90%;
}

.modal-buttons {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}


/* --- ДОБАВЛЕНО: Стили для МОБИЛЬНОГО РЕЖИМА (Вертикальный интерфейс) --- */
.mobile-mode body {
    padding: 0; 
}

.mobile-mode .container {
    max-width: 100%;
    width: 100%;
    height: 100vh; 
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow-y: hidden; 
}

.mobile-mode header {
    margin-bottom: 10px;
    padding: 10px;
    flex-shrink: 0; 
}

.mobile-mode h1 {
    font-size: 2rem;
}

.mobile-mode .stats {
    flex-direction: column; 
    gap: 5px;
    padding: 10px;
    margin-bottom: 10px;
    flex-shrink: 0;
}

.mobile-mode .stat-item {
    width: 100%;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
}

.mobile-mode .stat-value {
    font-size: 1.5rem;
}

.mobile-mode .click-area {
    flex-grow: 1; 
    padding: 5px;
    margin-bottom: 5px;
    min-height: 250px; 
}

.mobile-mode .buba-container {
    width: 250px;
    height: 250px;
    touch-action: manipulation;
}

.mobile-mode .instructions {
    margin: 10px 0;
    font-size: 0.85rem;
    flex-shrink: 0;
}

.mobile-mode #tilt-instruction {
    display: none !important; 
}

.mobile-mode .navigation-menu {
    position: relative; 
    width: 100%;
    max-width: none;
    margin: 0 0 10px 0; 
    border-radius: 10px;
    padding: 10px 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    z-index: 50;
    flex-shrink: 0;
    flex-direction: row; 
}

.mobile-mode .menu-button {
    font-size: 0.8rem;
    padding: 10px 5px;
}

.mobile-mode .section {
    flex-grow: 1;
    overflow-y: auto; 
    padding: 10px;
    margin-top: 0;
    margin-bottom: 10px;
    -webkit-overflow-scrolling: touch;
    flex-shrink: 1; 
}

.mobile-mode .section h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
}

.mobile-mode .upgrades-section .upgrades {
    grid-template-columns: 1fr; /* Улучшения в один столбец */
    gap: 10px;
}

.mobile-mode .upgrade {
    padding: 10px;
    text-align: left;
    display: grid;
    grid-template-columns: 40px 1fr auto; /* Иконка, Имя, Стоимость/Уровень */
    gap: 10px;
    align-items: center;
}

.mobile-mode .upgrade-icon {
    grid-column: 1 / 2;
    font-size: 1.5rem;
    margin-bottom: 0;
}

.mobile-mode .upgrade-name {
    grid-column: 2 / 3;
    font-size: 1rem;
    margin-bottom: 0;
}

.mobile-mode .upgrade-description {
    display: none; /* Скрываем на мобильном для компактности */
}

.mobile-mode .upgrade-level, .mobile-mode .upgrade-cost {
    grid-column: 3 / 4;
    font-size: 0.9rem;
    text-align: right;
    white-space: nowrap;
}

.mobile-mode .achievement {
    padding: 8px 10px;
    font-size: 0.9rem;
}

.mobile-mode .save-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

// Игровые переменные
let score = 0;
let clickValue = 1;
let passiveIncome = 0;
let totalClicks = 0;
let gameTimeSeconds = 0; 

// Настройки
let settings = {
    tilt3D: true,
    clickEffects: true,
    sounds: true, 
    deviceType: null // 'mobile', 'desktop', или null
};

// Переменная состояния музыки
let musicPlayed = false;

// Улучшения
const upgrades = [
    { id: 1, name: "Усиленный палец", baseCost: 10, cost: 10, level: 0, effect: 1, description: "Увеличивает очки за клик на 1" },
    { id: 2, name: "Автокликер", baseCost: 50, cost: 50, level: 0, effect: 1, description: "Добавляет 1 очко в секунду" },
    { id: 3, name: "Золотой палец", baseCost: 200, cost: 200, level: 0, effect: 5, description: "Увеличивает очки за клик на 5" },
    { id: 4, name: "Фабрика кликов", baseCost: 1000, cost: 1000, level: 0, effect: 10, description: "Добавляет 10 очков в секунду" }
];

// Достижения
const achievements = [
    { id: 1, clicks: 10, unlocked: false },
    { id: 2, clicks: 50, unlocked: false },
    { id: 3, clicks: 100, unlocked: false },
    { id: 4, clicks: 500, unlocked: false }
];

// Элементы DOM
const scoreElement = document.getElementById('score');
const clickValueElement = document.getElementById('click-value');
const passiveIncomeElement = document.getElementById('passive-income');
const clickArea = document.getElementById('click-area');
const bubaContainer = document.getElementById('buba-container');
const buba = document.getElementById('buba');
const bubaImage = document.getElementById('buba-image');
const header = document.getElementById('header');
const stats = document.getElementById('stats');
const totalClicksDisplay = document.getElementById('total-clicks-display');
const playTimeDisplay = document.getElementById('play-time');
const toggle3D = document.getElementById('toggle-3d');
const toggleEffects = document.getElementById('toggle-effects');
const toggleSounds = document.getElementById('toggle-sounds');
const gameMusic = document.getElementById('game-music'); 
const tiltInstruction = document.getElementById('tilt-instruction'); 

// Элементы для меню
const upgradesSection = document.getElementById('upgrades-section');
const achievementsSection = document.getElementById('achievements-section');
const settingsSection = document.getElementById('settings-section');
const menuButtons = document.querySelectorAll('.menu-button');

// Элементы для модального окна
const deviceSelectModal = document.getElementById('device-select-modal');
const selectMobileButton = document.getElementById('select-mobile');
const selectDesktopButton = document.getElementById('select-desktop');
const deviceTypeDisplay = document.getElementById('device-type-display');

// --- ДОБАВЛЕНЫ: Переменные для отслеживания главного прослушивателя события клика ---
let currentClickListener = null;
let currentListenerType = null;
// ---------------------------------------------------------------------------------

// --- ФУНКЦИИ УПРАВЛЕНИЯ ЗВУКОМ ---
function toggleMusic(play) {
    if (play) {
        const playPromise = gameMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                gameMusic.volume = 0.3; 
                musicPlayed = true;
            }).catch(error => {
                console.log("Музыка заблокирована браузером.");
                musicPlayed = false;
            });
        }
    } else {
        gameMusic.pause();
        musicPlayed = false;
    }
    settings.sounds = play;
}
// ---------------------------------

// --- ФУНКЦИЯ: Переключение разделов ---
function showSection(sectionId) {
    const sections = [upgradesSection, achievementsSection, settingsSection];
    const targetSection = document.getElementById(sectionId);

    sections.forEach(section => {
        section.classList.remove('active');
    });
    menuButtons.forEach(button => {
        button.classList.remove('active');
    });

    if (targetSection) {
        targetSection.classList.add('active');
        document.getElementById(`menu-${sectionId.replace('-section', '')}`).classList.add('active');
    }
}
// ---------------------------------------------

function recalculateAllStats() {
    let newClickValue = 1;
    let newPassiveIncome = 0;
    
    upgrades.forEach(upgrade => {
        if (upgrade.id === 1 || upgrade.id === 3) {
            newClickValue += upgrade.level * upgrade.effect;
        } else if (upgrade.id === 2 || upgrade.id === 4) {
            newPassiveIncome += upgrade.level * upgrade.effect;
        }
    });
    
    clickValue = newClickValue;
    passiveIncome = newPassiveIncome;
    updateDisplay();
}

// Функция для показа уведомлений
function showNotification(title, message) {
    const notificationArea = document.getElementById('notification-area');
    if (!notificationArea) return;
    
    notificationArea.classList.remove('show', 'hide');
    
    notificationArea.innerHTML = '';
    
    notificationArea.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
    `;
    
    setTimeout(() => { notificationArea.classList.add('show'); }, 50);
    
    setTimeout(() => {
        notificationArea.classList.remove('show');
        notificationArea.classList.add('hide');
    }, 3000);
}

// Переменные для 3D наклона
let tiltEffectListener = null;
let mouseLeaveListener = null;

// Функция для легкого 3D наклона
function initTiltEffect() {
    if (tiltEffectListener) { document.removeEventListener('mousemove', tiltEffectListener); }
    if (mouseLeaveListener) { document.removeEventListener('mouseleave', mouseLeaveListener); }
    
    bubaContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
    header.style.transform = 'rotateY(0deg) rotateX(0deg)';
    stats.style.transform = 'rotateY(0deg) rotateX(0deg)';
    bubaImage.style.transform = 'translateX(0px) translateY(0px)';
    
    if (settings.tilt3D && settings.deviceType === 'desktop') { // 3D только для десктопа
        if (tiltInstruction) tiltInstruction.style.display = 'block';

        tiltEffectListener = (e) => {
            const { clientX: x, clientY: y } = e;
            const { innerWidth: width, innerHeight: height } = window;
            
            const xPos = (x / width - 0.5) * 2;
            const yPos = (y / height - 0.5) * 2;
            
            const bubaRotateY = xPos * 2;
            const bubaRotateX = -yPos * 2;
            bubaContainer.style.transform = `rotateY(${bubaRotateY}deg) rotateX(${bubaRotateX}deg)`;
            
            const elementRotateY = xPos * 0.5;
            const elementRotateX = -yPos * 0.5;
            header.style.transform = `rotateY(${elementRotateY}deg) rotateX(${elementRotateX}deg)`;
            stats.style.transform = `rotateY(${elementRotateY}deg) rotateX(${elementRotateX}deg)`;
            
            const imageMoveX = xPos * 3;
            const imageMoveY = yPos * 3;
            bubaImage.style.transform = `translateX(${imageMoveX}px) translateY(${imageMoveY}px)`;
        };

        mouseLeaveListener = () => {
            bubaContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
            header.style.transform = 'rotateY(0deg) rotateX(0deg)';
            stats.style.transform = 'rotateY(0deg) rotateX(0deg)';
            bubaImage.style.transform = 'translateX(0px) translateY(0px)';
        };

        document.addEventListener('mousemove', tiltEffectListener);
        document.addEventListener('mouseleave', mouseLeaveListener);
    } else {
        if (tiltInstruction) tiltInstruction.style.display = 'none';
    }
}

// --- НОВАЯ ФУНКЦИЯ: Установка прослушивателей кликов/тапов ---
function setupClickListeners() {
    // 1. Очистка старого прослушивателя
    if (currentClickListener && currentListenerType) {
        clickArea.removeEventListener(currentListenerType, currentClickListener);
    }
    
    // 2. Определение нового прослушивателя и типа
    if (settings.deviceType === 'mobile') {
        // На мобильном используем touchend для моментального действия (без задержки клика)
        currentListenerType = 'touchend';
        currentClickListener = handleClick; 
    } else {
        // На компьютере используем стандартный click
        currentListenerType = 'click';
        currentClickListener = handleClick;
    }
    
    // 3. Добавление нового прослушивателя
    clickArea.addEventListener(currentListenerType, currentClickListener);
}

// --- ФУНКЦИИ ДЛЯ ВЫБОРА УСТРОЙСТВА ---
function applyDeviceSettings(deviceType) {
    settings.deviceType = deviceType;
    document.body.classList.remove('mobile-mode', 'desktop-mode');
    
    if (deviceType === 'mobile') {
        document.body.classList.add('mobile-mode');
        settings.tilt3D = false; // Отключаем 3D на мобильном
    } else {
        // Десктоп по умолчанию без специального класса
    }
    
    updateToggleDisplays();
    setupClickListeners(); // ДОБАВЛЕНО: Устанавливаем корректный прослушиватель клика
    saveProgress();
}

function handleDeviceSelection(deviceType) {
    applyDeviceSettings(deviceType);
    deviceSelectModal.classList.remove('active'); 
    
    const message = deviceType === 'mobile' ? 'Режим "Телефон" активирован. Интерфейс вертикальный.' : 'Режим "Компьютер" активирован. Включены все визуальные эффекты.';
    showNotification(`Выбрано: ${deviceType === 'mobile' ? 'Телефон' : 'Компьютер'}`, message);
}

window.showDeviceSelectionModal = function() {
    deviceSelectModal.classList.add('active');
    showNotification('Смена устройства', 'Выберите ваше текущее устройство.');
}
// ------------------------------------

// Обновление состояния переключателей и дисплея устройства
function updateToggleDisplays() {
    toggle3D.checked = settings.tilt3D;
    toggleEffects.checked = settings.clickEffects;
    toggleSounds.checked = settings.sounds;
    
    const deviceName = settings.deviceType === 'mobile' ? 'Телефон 📱' : (settings.deviceType === 'desktop' ? 'Компьютер 💻' : 'Не определен');
    deviceTypeDisplay.textContent = deviceName;

    if (settings.deviceType === 'mobile') {
        toggle3D.disabled = true; // Запрещаем 3D на мобильном
    } else {
        toggle3D.disabled = false;
    }

    toggleMusic(settings.sounds); 
    initTiltEffect();
}

// Функция для обработки ошибки загрузки изображения
function handleImageError() {
    const bubaContent = document.querySelector('.buba-content');
    bubaContent.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #FFD700, #FFA500); border-radius: 15px;">
            <div style="font-size: 5rem;">😊</div>
            <div style="margin-top: 10px; font-weight: bold; color: #333; font-size: 2rem;">БУБА</div>
            <div style="position: absolute; bottom: 20px; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 15px; border-radius: 0 0 15px 15px;">
                <div style="font-weight: bold; color: #FFD700; font-size: 1.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">КЛИКАЙ НА МЕНЯ!</div>
            </div>
        </div>
    `;
}

// Функция клика
function handleClick(event) {
    // ВАЖНО: Проверяем, что это не сработавший tap, если у нас уже был клик.
    // На мобильных устройствах, если мы слушаем 'touchend', этот код выполнится

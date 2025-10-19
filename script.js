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
        if(section) section.classList.remove('active');
    });
    menuButtons.forEach(button => {
        button.classList.remove('active');
    });

    if (targetSection) {
        targetSection.classList.add('active');
        const menuButtonId = `menu-${sectionId.replace('-section', '')}`;
        const menuButton = document.getElementById(menuButtonId);
        if (menuButton) menuButton.classList.add('active');
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
    
    if (settings.tilt3D && settings.deviceType === 'desktop') { 
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

// --- ФУНКЦИИ ДЛЯ ВЫБОРА УСТРОЙСТВА ---
function applyDeviceSettings(deviceType) {
    settings.deviceType = deviceType;
    document.body.classList.remove('mobile-mode', 'desktop-mode');
    
    if (deviceType === 'mobile') {
        document.body.classList.add('mobile-mode');
        settings.tilt3D = false; 
    } else {
        document.body.classList.add('desktop-mode');
        settings.tilt3D = true;
    }
    
    updateToggleDisplays();
    saveProgress();
}

function handleDeviceSelection(deviceType) {
    applyDeviceSettings(deviceType);
    deviceSelectModal.classList.remove('active'); // КРИТИЧЕСКИ ВАЖНО: Скрываем модальное окно!
    
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
        toggle3D.disabled = true; 
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
    score += clickValue;
    totalClicks++;
    updateDisplay();
    
    if (settings.clickEffects) {
        // --- Универсальное определение координат ---
        let clientX = event.clientX;
        let clientY = event.clientY;
        if (event.touches && event.touches.length > 0) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }
        createClickEffect(clientX, clientY, `+${clickValue}`);
    }
    
    checkAchievements();
    upgrades.forEach(upgrade => {
        if (upgrade.updateDisplay) upgrade.updateDisplay();
    });

    if (settings.sounds && !musicPlayed) {
         toggleMusic(true);
    }
}

// Создание эффекта клика
function createClickEffect(x, y, text) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = text;
    
    const offsetX = Math.random() * 40 - 20; 
    const offsetY = Math.random() * 40 - 20;

    effect.style.left = `${x + offsetX}px`;
    effect.style.top = `${y + offsetY}px`;
    
    document.body.appendChild(effect);
    
    setTimeout(() => { effect.remove(); }, 1000);
}

// Покупка улучшения
function buyUpgrade(upgradeId) {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        
        upgrade.level++;
        
        // Пересчет стоимости: baseCost * 1.5^level
        upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(1.5, upgrade.level));
        
        recalculateAllStats(); 
        
        upgrade.updateDisplay();
        showNotification('Улучшение куплено!', `"${upgrade.name}" успешно приобретено!`);
    } else {
        showNotification('Недостаточно очков', 'Нужно больше очков для покупки этого улучшения');
    }
}

// Обновление прогресса достижений в DOM
function updateAchievementDisplay() {
    achievements.forEach(achievement => {
        const element = document.getElementById(`achievement-${achievement.id}`);
        if (!element) return;
        
        const progressElement = element.querySelector('.achievement-progress');
        
        if (achievement.unlocked) {
            element.classList.add('unlocked');
            progressElement.textContent = `${achievement.clicks} кликов (ВЫПОЛНЕНО)`;
        } else {
            element.classList.remove('unlocked');
            progressElement.textContent = `${totalClicks}/${achievement.clicks} кликов`;
        }
    });
}

// Проверка достижений
function checkAchievements() {
    let unlocked = false;
    
    achievements.forEach(achievement => {
        if (!achievement.unlocked && totalClicks >= achievement.clicks) {
            achievement.unlocked = true;
            unlocked = true;
            
            const reward = achievement.clicks * 2;
            score += reward;
            
            showNotification('Достижение разблокировано!', `${achievement.clicks} кликов! +${reward} очков`);
        }
    });
    
    if (unlocked) {
        updateDisplay();
        updateAchievementDisplay();
        upgrades.forEach(upgrade => {
            if (upgrade.updateDisplay) upgrade.updateDisplay();
        });
    }
}

// Обновление отображения
function updateDisplay() {
    scoreElement.textContent = Math.floor(score);
    clickValueElement.textContent = clickValue;
    passiveIncomeElement.textContent = passiveIncome;
    totalClicksDisplay.textContent = totalClicks;
    playTimeDisplay.textContent = gameTimeSeconds;
    
    upgrades.forEach(upgrade => {
        if (upgrade.updateDisplay) upgrade.updateDisplay();
    });
    updateAchievementDisplay();
}

// Сохранение прогресса
function saveProgress() {
    const gameData = {
        score,
        totalClicks,
        gameTimeSeconds,
        settings, 
        upgrades: upgrades.map(upgrade => ({
            id: upgrade.id,
            level: upgrade.level,
            cost: upgrade.cost
        })),
        achievements: achievements.map(achievement => ({
            id: achievement.id,
            unlocked: achievement.unlocked
        }))
    };
    
    localStorage.setItem('bubaClickerSave', JSON.stringify(gameData));
    console.log("Прогресс сохранен.");
}

// Загрузка прогресса
function loadProgress() {
    const savedData = localStorage.getItem('bubaClickerSave');
    if (savedData) {
        try {
            const gameData = JSON.parse(savedData);
            
            score = gameData.score || 0;
            totalClicks = gameData.totalClicks || 0;
            gameTimeSeconds = gameData.gameTimeSeconds || 0;
            
            if (gameData.settings) { settings = {...settings, ...gameData.settings}; }
            
            if (gameData.upgrades) {
                gameData.upgrades.forEach(savedUpgrade => {
                    const upgrade = upgrades.find(u => u.id === savedUpgrade.id);
                    if (upgrade) {
                        upgrade.level = savedUpgrade.level || 0;
                        upgrade.cost = savedUpgrade.cost || upgrade.baseCost;
                    }
                });
            }
            
            if (gameData.achievements) {
                gameData.achievements.forEach(savedAchievement => {
                    const achievement = achievements.find(a => a.id === savedAchievement.id);
                    if (achievement) {
                        achievement.unlocked = savedAchievement.unlocked || false;
                    }
                });
            }
            
            recalculateAllStats();
            
            if (settings.deviceType) {
                applyDeviceSettings(settings.deviceType);
            }
            
            showNotification('Прогресс загружен', 'Ваш прогресс успешно восстановлен!');
            
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            showNotification('Ошибка', 'Не удалось загрузить сохранение');
            recalculateAllStats();
            updateToggleDisplays();
        }
    } else {
        recalculateAllStats();
        updateToggleDisplays();
    }
}

// Сброс игры
function resetGame() {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
        localStorage.removeItem('bubaClickerSave');
        
        const deviceType = settings.deviceType; 
        
        score = 0;
        totalClicks = 0;
        gameTimeSeconds = 0;

        settings = { tilt3D: true, clickEffects: true, sounds: true, deviceType: deviceType };
        
        upgrades.forEach(upgrade => {
            upgrade.level = 0;
            upgrade.cost = upgrade.baseCost;
        });
        
        achievements.forEach(achievement => {
            achievement.unlocked = false;
        });
        
        recalculateAllStats();
        
        if (deviceType) {
            applyDeviceSettings(deviceType); 
        } else {
            updateToggleDisplays();
        }
        
        showNotification('Игра сброшена', 'Весь прогресс удален!');
    }
}

// Пассивный доход
function passiveIncomeTick() {
    if (passiveIncome > 0) {
        score += passiveIncome;
        updateDisplay();
    }
}

// Таймер игры
function gameTimerTick() {
    gameTimeSeconds++;
    playTimeDisplay.textContent = gameTimeSeconds;
}

// --- ФУНКЦИИ ДЛЯ ОБРАБОТКИ МЕНЮ (для тапов и кликов) ---
const handleMenuAction = (sectionId) => (e) => {
    if (e.type === 'touchstart') {
        e.preventDefault();
        showSection(sectionId);
    } 
    if (e.type === 'click') {
        showSection(sectionId);
    }
};

// --- ИНИЦИАЛИЗАЦИЯ ИГРЫ ---
function initGame() {
    
    bubaImage.onerror = handleImageError;
    
    // Инициализация улучшений
    upgrades.forEach(upgrade => {
        const element = document.getElementById(`upgrade-${upgrade.id}`);
        const costElement = document.getElementById(`cost-${upgrade.id}`);
        const levelElement = document.getElementById(`level-${upgrade.id}`);
        
        if (element) {
            element.addEventListener('click', function() {
                buyUpgrade(upgrade.id);
            });
            
            upgrade.updateDisplay = function() {
                costElement.textContent = Math.floor(this.cost);
                levelElement.textContent = this.level;
                
                if (score >= this.cost) {
                    element.classList.add('can-buy');
                    element.classList.remove('disabled');
                } else {
                    element.classList.remove('can-buy');
                    element.classList.add('disabled');
                }
            };
        }
    });
    
    // --- ИСПРАВЛЕНИЕ: Обработчики для кнопок меню (Табы) ---
    const menuUpgrades = document.getElementById('menu-upgrades');
    const menuAchievements = document.getElementById('menu-achievements');
    const menuSettings = document.getElementById('menu-settings');

    [menuUpgrades, menuAchievements, menuSettings].forEach(button => {
        if (button) {
            const sectionId = button.id.replace('menu-', '') + '-section';
            button.addEventListener('touchstart', handleMenuAction(sectionId));
            button.addEventListener('click', handleMenuAction(sectionId));
        }
    });

    // --- КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Обработчики кликов/тапов на Бубе ---
    
    // Начисление очков по клику для ПК/Десктопа
    clickArea.addEventListener('click', (e) => {
        if (settings.deviceType !== 'mobile') {
            handleClick(e);
        }
    }); 
    
    // Начисление очков по тапу для мобильных/APK (Самое надежное событие)
    clickArea.addEventListener('touchstart', (e) => { 
        e.preventDefault(); // БЛОКИРУЕМ СКРОЛЛ/ЗУМ ДЛЯ КОРРЕКТНОЙ РЕГИСТРАЦИИ ТАПА
        handleClick(e); 
    }, { passive: false }); 

    // Обработчики для анимации нажатия/отпускания
    clickArea.addEventListener('mousedown', () => buba.style.transform = 'scale(0.95)');
    clickArea.addEventListener('mouseup', () => buba.style.transform = 'scale(1)');
    clickArea.addEventListener('mouseleave', () => buba.style.transform = 'scale(1)'); 
    clickArea.addEventListener('touchstart', () => buba.style.transform = 'scale(0.95)');
    clickArea.addEventListener('touchend', () => buba.style.transform = 'scale(1)'); 
    
    // Обработчики кнопок сохранения/сброса
    document.getElementById('save-button').addEventListener('click', function() {
        saveProgress();
        showNotification('Сохранение', 'Прогресс успешно сохранен!');
    });
    
    document.getElementById('load-button').addEventListener('click', function() {
        loadProgress();
    });
    
    document.getElementById('reset-button').addEventListener('click', function() {
        resetGame();
    });
    
    // Обработчики переключателей настроек
    toggle3D.addEventListener('change', function() {
        settings.tilt3D = this.checked;
        initTiltEffect();
        saveProgress();
        showNotification('Настройки', `3D эффект ${this.checked ? 'включен' : 'выключен'}`);
    });

    toggleEffects.addEventListener('change', function() {
        settings.clickEffects = this.checked;
        saveProgress();
        showNotification('Настройки', `Эффекты кликов ${this.checked ? 'включены' : 'выключены'}`);
    });

    toggleSounds.addEventListener('change', function() {
        toggleMusic(this.checked);
        saveProgress();
        showNotification('Настройки', `Звуки/Музыка ${this.checked ? 'включены' : 'выключены'}`);
    });
    
    // --- ИСПРАВЛЕНИЕ: Обработчики для кнопок модального окна (с tap-fix) ---
    const handleDeviceSelect = (deviceType) => (e) => {
        if (e.type === 'touchstart') e.preventDefault();
        handleDeviceSelection(deviceType);
    };

    selectMobileButton.addEventListener('click', handleDeviceSelect('mobile'));
    selectMobileButton.addEventListener('touchstart', handleDeviceSelect('mobile'));
    
    selectDesktopButton.addEventListener('click', handleDeviceSelect('desktop'));
    selectDesktopButton.addEventListener('touchstart', handleDeviceSelect('desktop'));
    // --- КОНЕЦ ИСПРАВЛЕНИЯ МОДАЛЬНОГО ОКНА ---

    // --- АВТОСОХРАНЕНИЕ ПРИ ВЫХОДЕ --
    window.addEventListener('beforeunload', saveProgress);
    window.addEventListener('pagehide', saveProgress); 

    loadProgress(); 
    
    if (!settings.deviceType) {
        deviceSelectModal.classList.add('active'); // Показываем выбор устройства, если не выбран
    } else {
        applyDeviceSettings(settings.deviceType); 
    }
    
    showSection('upgrades-section');
    
    // Запускаем таймеры
    setInterval(saveProgress, 30000); 
    setInterval(passiveIncomeTick, 1000); 
    setInterval(gameTimerTick, 1000); 
}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', initGame);

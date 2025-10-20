[file name]: script.js
[file content begin]
// Игровые переменные
let score = 0;
let clickValue = 1;
let passiveIncome = 0;
let totalClicks = 0;
let gameTimeSeconds = 0; 

// Настройки
let settings = {
    clickEffects: true,
    sounds: true
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

// Промокоды (скрыты от пользователей)
const promocodes = {
    "START100": { reward: 100, used: false },
    "BOOST500": { reward: 500, used: false },
    "GOLD1000": { reward: 1000, used: false },
    "CLICK2000": { reward: 2000, used: false },
    "BUBAMAX": { reward: 5000, used: false }
};

// Элементы DOM
const scoreElement = document.getElementById('score');
const clickValueElement = document.getElementById('click-value');
const passiveIncomeElement = document.getElementById('passive-income');
const clickArea = document.getElementById('click-area');
const buba = document.querySelector('.buba');
const totalClicksDisplay = document.getElementById('total-clicks-display');
const playTimeDisplay = document.getElementById('play-time');
const toggleEffects = document.getElementById('toggle-effects');
const toggleSounds = document.getElementById('toggle-sounds');
const gameMusic = document.getElementById('game-music');

// --- ФУНКЦИИ УПРАВЛЕНИЯ ЗВУКОМ ---
function toggleMusic(play) {
    if (play) {
        gameMusic.volume = 0.3;
        gameMusic.play().catch(() => {
            console.log("Автовоспроизведение музыки заблокировано");
        });
        musicPlayed = true;
    } else {
        gameMusic.pause();
        musicPlayed = false;
    }
    settings.sounds = play;
}

// --- ФУНКЦИЯ: Переключение разделов ---
function showSection(sectionId) {
    // Скрываем все разделы
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Убираем активный класс со всех кнопок
    document.querySelectorAll('.menu-button').forEach(button => {
        button.classList.remove('active');
    });

    // Показываем целевой раздел
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Активируем соответствующую кнопку меню
        const menuButton = document.getElementById(`menu-${sectionId.replace('-section', '')}`);
        if (menuButton) {
            menuButton.classList.add('active');
        }
    }
}

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
    notificationArea.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
    `;
    
    setTimeout(() => notificationArea.classList.add('show'), 50);
    setTimeout(() => {
        notificationArea.classList.remove('show');
        notificationArea.classList.add('hide');
    }, 3000);
}

// Функция для обработки ошибки загрузки изображения
function handleImageError() {
    const bubaContent = document.querySelector('.buba-content');
    bubaContent.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #FFD700, #FFA500); border-radius: 50%;">
            <div style="font-size: 3rem;">😊</div>
            <div style="margin-top: 5px; font-weight: bold; color: #333; font-size: 1.2rem;">БУБА</div>
            <div style="position: absolute; bottom: 10px; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 8px; border-radius: 0 0 50% 50%;">
                <div style="font-weight: bold; color: #FFD700; font-size: 0.9rem;">КЛИКАЙ НА МЕНЯ!</div>
            </div>
        </div>
    `;
}

// Функция клика
function handleBubaClick(event) {
    let clientX, clientY;
    
    if (event.type === 'touchstart' || event.type === 'touchend') {
        const touch = event.touches[0] || event.changedTouches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }
    
    score += clickValue;
    totalClicks++;
    updateDisplay();
    
    if (settings.clickEffects) {
        createClickEffect(clientX, clientY, `+${clickValue}`);
    }
    
    buba.style.transform = 'scale(0.95)';
    setTimeout(() => { buba.style.transform = 'scale(1)'; }, 100);
    
    checkAchievements();
    upgrades.forEach(upgrade => upgrade.updateDisplay());

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
    
    setTimeout(() => effect.remove(), 1000);
}

// Покупка улучшения
function buyUpgrade(upgradeId) {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        upgrade.level++;
        upgrade.cost = upgrade.baseCost * Math.pow(1.5, upgrade.level);
        
        recalculateAllStats(); 
        upgrade.updateDisplay();
        showNotification('Улучшение куплено!', `"${upgrade.name}" успешно приобретено!`);
    } else {
        showNotification('Недостаточно очков', 'Нужно больше очков для покупки этого улучшения');
    }
}

// Активация промокода
function activatePromocode() {
    const promocodeInput = document.getElementById('promocode-input');
    const code = promocodeInput.value.trim().toUpperCase();
    
    if (!code) {
        showNotification('Ошибка', 'Введите промокод');
        return;
    }
    
    if (promocodes[code]) {
        if (promocodes[code].used) {
            showNotification('Промокод уже использован', 'Этот промокод уже был активирован');
        } else {
            const reward = promocodes[code].reward;
            score += reward;
            promocodes[code].used = true;
            
            updateDisplay();
            showNotification('Промокод активирован!', `+${reward} очков!`);
            promocodeInput.value = '';
            saveProgress();
        }
    } else {
        showNotification('Неверный промокод', 'Проверьте правильность ввода');
    }
}

// Обновление прогресса достижений в DOM
function updateAchievementDisplay() {
    achievements.forEach(achievement => {
        const element = document.getElementById(`achievement-${achievement.id}`);
        if (!element) return;
        
        element.classList.toggle('unlocked', achievement.unlocked);
        
        const progressElement = element.querySelector('.achievement-progress');
        if (progressElement) {
            progressElement.textContent = `${achievement.clicks} кликов`;
        }
    });
}

// Проверка достижений
function checkAchievements() {
    achievements.forEach(achievement => {
        if (!achievement.unlocked && totalClicks >= achievement.clicks) {
            achievement.unlocked = true;
            showNotification('Достижение разблокировано!', `+${achievement.clicks * 2} очков!`);
            score += achievement.clicks * 2;
            updateAchievementDisplay();
            updateDisplay();
        }
    });
}

// Обновление отображения
function updateDisplay() {
    scoreElement.textContent = Math.floor(score);
    clickValueElement.textContent = clickValue;
    passiveIncomeElement.textContent = passiveIncome;
    totalClicksDisplay.textContent = totalClicks;
    playTimeDisplay.textContent = gameTimeSeconds;
}

// Пассивный доход
function passiveIncomeTick() {
    score += passiveIncome;
    updateDisplay();
}

// Сохранение прогресса
function saveProgress() {
    const progress = {
        score,
        clickValue,
        passiveIncome,
        totalClicks,
        gameTimeSeconds,
        upgrades,
        achievements,
        promocodes,
        settings
    };
    localStorage.setItem('bubaClickerProgress', JSON.stringify(progress));
}

// Загрузка прогресса
function loadProgress() {
    const savedProgress = localStorage.getItem('bubaClickerProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        
        score = progress.score || 0;
        clickValue = progress.clickValue || 1;
        passiveIncome = progress.passiveIncome || 0;
        totalClicks = progress.totalClicks || 0;
        gameTimeSeconds = progress.gameTimeSeconds || 0;
        
        if (progress.upgrades) {
            upgrades.forEach(upgrade => {
                const savedUpgrade = progress.upgrades.find(u => u.id === upgrade.id);
                if (savedUpgrade) {
                    upgrade.level = savedUpgrade.level || 0;
                    upgrade.cost = savedUpgrade.cost || upgrade.baseCost;
                }
            });
        }
        
        if (progress.achievements) {
            achievements.forEach(achievement => {
                const savedAchievement = progress.achievements.find(a => a.id === achievement.id);
                if (savedAchievement) {
                    achievement.unlocked = savedAchievement.unlocked || false;
                }
            });
        }
        
        if (progress.promocodes) {
            Object.keys(promocodes).forEach(code => {
                if (progress.promocodes[code]) {
                    promocodes[code].used = progress.promocodes[code].used || false;
                }
            });
        }
        
        if (progress.settings) {
            settings = { ...settings, ...progress.settings };
        }
        
        recalculateAllStats();
        updateAchievementDisplay();
        updateDisplay();
        
        if (settings.sounds) {
            toggleMusic(true);
        }
    }
}

// Сброс игры
function resetGame() {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.')) {
        localStorage.removeItem('bubaClickerProgress');
        location.reload();
    }
}

// Инициализация игры
function initGame() {
    // Загрузка сохраненного прогресса
    loadProgress();
    
    // Обновление отображения улучшений
    upgrades.forEach(upgrade => {
        const element = document.getElementById(`upgrade-${upgrade.id}`);
        if (!element) return;
        
        upgrade.updateDisplay = function() {
            const costElement = document.getElementById(`cost-${upgrade.id}`);
            const levelElement = document.getElementById(`level-${upgrade.id}`);
            
            if (costElement) costElement.textContent = Math.floor(upgrade.cost);
            if (levelElement) levelElement.textContent = upgrade.level;
            
            element.classList.toggle('can-buy', score >= upgrade.cost);
            element.classList.toggle('disabled', score < upgrade.cost);
        };
        
        element.addEventListener('click', () => buyUpgrade(upgrade.id));
        upgrade.updateDisplay();
    });
    
    // Обновление отображения достижений
    updateAchievementDisplay();
    
    // Настройка обработчиков событий
    clickArea.addEventListener('click', handleBubaClick);
    clickArea.addEventListener('touchstart', handleBubaClick, { passive: true });
    
    // Настройка навигации
    document.getElementById('menu-upgrades').addEventListener('click', () => showSection('upgrades-section'));
    document.getElementById('menu-achievements').addEventListener('click', () => showSection('achievements-section'));
    document.getElementById('menu-promocodes').addEventListener('click', () => showSection('promocodes-section'));
    document.getElementById('menu-settings').addEventListener('click', () => showSection('settings-section'));
    
    // Настройка промокодов
    document.getElementById('activate-promocode').addEventListener('click', activatePromocode);
    document.getElementById('promocode-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') activatePromocode();
    });
    
    // Настройка сброса игры
    document.getElementById('reset-button').addEventListener('click', resetGame);
    
    // Настройка переключателей
    toggleEffects.checked = settings.clickEffects;
    toggleSounds.checked = settings.sounds;
    
    toggleEffects.addEventListener('change', () => {
        settings.clickEffects = toggleEffects.checked;
        saveProgress();
    });
    
    toggleSounds.addEventListener('change', () => {
        settings.sounds = toggleSounds.checked;
        if (settings.sounds) {
            toggleMusic(true);
        } else {
            toggleMusic(false);
        }
        saveProgress();
    });
    
    // Обработка ошибки загрузки изображения
    const bubaImage = document.getElementById('buba-image');
    if (bubaImage) {
        bubaImage.addEventListener('error', handleImageError);
    }
    
    // Игровой цикл
    setInterval(passiveIncomeTick, 1000);
    setInterval(() => {
        gameTimeSeconds++;
        playTimeDisplay.textContent = gameTimeSeconds;
        saveProgress();
    }, 1000);
}

// Запуск игры при загрузке страницы
window.addEventListener('load', initGame);
[file content end]

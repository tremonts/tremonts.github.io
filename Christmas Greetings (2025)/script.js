// ===== DYNAMIC SCREEN SIZE DETECTION =====
function detectScreenSize() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        return 'mobile';
    } else if (width <= 1024) {
        return 'tablet';
    } else if (width <= 1366) {
        return 'laptop';
    } else {
        return 'desktop';
    }
}

// ===== DYNAMIC LAYOUT ADJUSTMENT =====
function adjustLayoutForScreenSize() {
    const screenType = detectScreenSize();
    const characterGroup = document.querySelector('.character-group');
    const giftWrapper = document.querySelector('.gift-wrapper');
    const tree = document.querySelector('.tree');
    
    // Remove all existing screen classes
    characterGroup.classList.remove('screen-mobile', 'screen-tablet', 'screen-laptop', 'screen-desktop');
    giftWrapper.classList.remove('screen-mobile', 'screen-tablet', 'screen-laptop', 'screen-desktop');
    tree.classList.remove('screen-mobile', 'screen-tablet', 'screen-laptop', 'screen-desktop');
    
    // Add specific class for current screen type
    characterGroup.classList.add(`screen-${screenType}`);
    giftWrapper.classList.add(`screen-${screenType}`);
    tree.classList.add(`screen-${screenType}`);
    
    console.log(`📱 Screen type: ${screenType} (${window.innerWidth}px)`);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎄 Genshin Christmas - FINAL PERFECT VERSION!');
    
    // Elements
    const elements = {
        snowContainer: document.getElementById('snow-container'),
        itemsContainer: document.getElementById('items-container'),
        confettiContainer: document.getElementById('confetti-container'),
        ventiCard: document.getElementById('venti-card'),
        xiaoCard: document.getElementById('xiao-card'),
        ventiNormal: document.getElementById('venti-normal'),
        ventiDrunk: document.getElementById('venti-drunk'),
        xiaoNormal: document.getElementById('xiao-normal'),
        xiaoCute: document.getElementById('xiao-cute'),
        ventiBubble: document.getElementById('venti-bubble'),
        xiaoBubble: document.getElementById('xiao-bubble'),
        wishBtn: document.getElementById('wish-btn'),
        wishPopup: document.getElementById('wish-popup'),
        wishContent: document.getElementById('wish-content'),
        closeBtn: document.getElementById('close-btn'),
        senderNotification: document.getElementById('sender-notification'),
        tree: document.getElementById('tree')
    };
    
    // State
    let state = {
        ventiActive: false,
        xiaoActive: false,
        wishVisible: false,
        audio: null,
        audioTimer: null,
        ventiTimer: null,
        xiaoTimer: null
    };
    
    // 3 UNIQUE CHRISTMAS BLESSINGS
    const blessings = [
        "🎄 May your holidays sparkle with joy and laughter! Wishing you warmth, wonderful memories, and magical moments with loved ones. Merry Christmas! 🎅✨",
        
        "🌟 May the spirit of Christmas fill your heart with peace, your home with happiness, and your life with countless blessings. Here's to a season of love and cheer! 🎁❤️",
        
        "❄️ As snow blankets Mondstadt, may your Christmas be wrapped in love, sprinkled with joy, and filled with the sweetest moments. Sending you festive hugs and holiday wishes! 🎄☃️"
    ];
    
    // Initialize
    function init() {
        createSnow();
        createChristmasItems();
        setupEventListeners();
        adjustLayoutForScreenSize(); // CALL THIS HERE
        console.log('✅ PERFECT VERSION LOADED!');
    }
    
    // Create Snow
    function createSnow() {
        elements.snowContainer.innerHTML = '';
        for (let i = 0; i < 70; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            
            const size = Math.random() * 5 + 2;
            const duration = Math.random() * 7 + 3;
            const delay = Math.random() * 5;
            
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.left = `${Math.random() * 100}%`;
            snowflake.style.animationDuration = `${duration}s`;
            snowflake.style.animationDelay = `${delay}s`;
            snowflake.style.opacity = Math.random() * 0.5 + 0.2;
            
            elements.snowContainer.appendChild(snowflake);
        }
    }
    
    // Create Christmas Items
    function createChristmasItems() {
        elements.itemsContainer.innerHTML = '';
        const items = [
            { class: 'item-bell', count: 10 },
            { class: 'item-candy', count: 9 },
            { class: 'item-gingerbread', count: 8 }
        ];
        
        items.forEach(item => {
            for (let i = 0; i < item.count; i++) {
                const el = document.createElement('div');
                el.className = `christmas-item ${item.class}`;
                
                el.style.left = `${Math.random() * 100}%`;
                el.style.top = `${Math.random() * 100}%`;
                el.style.animationDelay = `${Math.random() * 6}s`;
                
                const scale = 0.6 + Math.random() * 0.5;
                el.style.transform = `scale(${scale})`;
                
                elements.itemsContainer.appendChild(el);
            }
        });
    }
    
    // CONFETTI EFFECT FUNCTION
    function createConfetti() {
        elements.confettiContainer.innerHTML = '';
        
        for (let i = 0; i < 200; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const left = Math.random() * 100;
            const width = Math.random() * 12 + 5;
            const height = Math.random() * 25 + 10;
            const rotation = Math.random() * 360;
            
            const duration = Math.random() * 4 + 2;
            const delay = Math.random() * 1.5;
            
            confetti.style.left = `${left}%`;
            confetti.style.width = `${width}px`;
            confetti.style.height = `${height}px`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.opacity = '0';
            
            const animation = confetti.animate([
                { 
                    transform: `translateY(0) rotate(0deg)`, 
                    opacity: 0 
                },
                { 
                    transform: `translateY(20px) rotate(${rotation}deg)`, 
                    opacity: 1 
                },
                { 
                    transform: `translateY(100vh) rotate(${rotation + 180}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            elements.confettiContainer.appendChild(confetti);
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }
        
        playShortSound();
    }
    
    // Character Click Handler
    function handleCharacterClick(character, normalImg, altImg, bubble, isVenti) {
        const timerName = isVenti ? 'ventiTimer' : 'xiaoTimer';
        const activeName = isVenti ? 'ventiActive' : 'xiaoActive';
        
        if (state[timerName]) return;
        
        // Click glow effect
        character.classList.add('click-glow');
        setTimeout(() => character.classList.remove('click-glow'), 500);
        
        // Reset other character
        if (isVenti) {
            resetCharacter(elements.xiaoCard, elements.xiaoNormal, elements.xiaoCute, elements.xiaoBubble);
        } else {
            resetCharacter(elements.ventiCard, elements.ventiNormal, elements.ventiDrunk, elements.ventiBubble);
        }
        
        // Activate clicked character
        character.classList.add('active');
        normalImg.style.opacity = '0';
        altImg.style.opacity = '1';
        bubble.style.display = 'block';
        
        state[timerName] = true;
        state[activeName] = true;
        
        // Auto reset after 4 seconds
        setTimeout(() => {
            resetCharacter(character, normalImg, altImg, bubble);
            state[timerName] = false;
            state[activeName] = false;
        }, 4000);
    }
    
    // Reset Character
    function resetCharacter(character, normalImg, altImg, bubble) {
        character.classList.remove('active');
        normalImg.style.opacity = '1';
        altImg.style.opacity = '0';
        bubble.style.display = 'none';
    }
    
    // MAKE WISH FUNCTION
    function makeWish() {
        if (state.wishVisible) {
            elements.wishPopup.style.display = 'none';
            state.wishVisible = false;
            return;
        }
        
        // Get random blessing
        const randomIndex = Math.floor(Math.random() * blessings.length);
        elements.wishContent.textContent = blessings[randomIndex];
        
        // Show message
        elements.wishPopup.style.display = 'block';
        state.wishVisible = true;
        
        // Show sender notification
        elements.senderNotification.style.display = 'block';
        setTimeout(() => {
            elements.senderNotification.style.display = 'none';
        }, 2500);
        
        // Create sparkle effect
        createSparkleParticles();
        
        // Play Christmas sound
        playChristmasSound();
    }
    
    // Create Sparkle Particles for Wish
    function createSparkleParticles() {
        const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#96ceb4', '#45b7d1'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = particle.style.height = `${Math.random() * 10 + 5}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.zIndex = '999';
            particle.style.pointerEvents = 'none';
            particle.style.boxShadow = '0 0 15px currentColor';
            
            // Star shape for some particles
            if (Math.random() > 0.7) {
                particle.style.borderRadius = '0';
                particle.style.transform = 'rotate(45deg)';
                particle.style.width = particle.style.height = `${Math.random() * 8 + 4}px`;
            }
            
            // Animation
            particle.style.animation = `sparkleExplode 1.5s ease-out forwards`;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
        
        // Add animation if not exists
        if (!document.querySelector('#sparkle-anim')) {
            const style = document.createElement('style');
            style.id = 'sparkle-anim';
            style.textContent = `
                @keyframes sparkleExplode {
                    0% { 
                        transform: scale(0.5) translate(0, 0) rotate(0deg); 
                        opacity: 0; 
                    }
                    50% { 
                        transform: scale(1.3) translate(${Math.random() * 50 - 25}px, ${Math.random() * -50}px) rotate(180deg); 
                        opacity: 1; 
                    }
                    100% { 
                        transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px) rotate(360deg); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Play Christmas Sound
    function playChristmasSound() {
        try {
            // Clear previous timer
            if (state.audioTimer) clearTimeout(state.audioTimer);
            
            // Stop any playing audio
            if (state.audio) {
                state.audio.pause();
                state.audio.currentTime = 0;
            }
            
            // Create new audio
            state.audio = new Audio('audio/JingleBells.mp3');
            state.audio.volume = 0.5;
            
            // Play audio
            state.audio.play().catch(e => console.log('Sound:', e));
            
            // Stop after 8 seconds
            state.audioTimer = setTimeout(() => {
                if (state.audio && !state.audio.paused) {
                    state.audio.pause();
                    state.audio.currentTime = 0;
                }
            }, 8000);
            
        } catch (e) {
            console.log('Audio error');
        }
    }
    
    // Play Short Sound for Confetti
    function playShortSound() {
        try {
            const shortAudio = new Audio('audio/JingleBells.mp3');
            shortAudio.volume = 0.3;
            shortAudio.currentTime = 1;
            shortAudio.play().catch(e => console.log('Confetti sound:', e));
            
            setTimeout(() => {
                if (!shortAudio.paused) {
                    shortAudio.pause();
                }
            }, 3000);
        } catch (e) {
            console.log('Short audio error');
        }
    }
    
    // Setup Event Listeners
    function setupEventListeners() {
        // Venti click
        elements.ventiCard.addEventListener('click', () => {
            handleCharacterClick(
                elements.ventiCard,
                elements.ventiNormal,
                elements.ventiDrunk,
                elements.ventiBubble,
                true
            );
        });
        
        // Xiao click
        elements.xiaoCard.addEventListener('click', () => {
            handleCharacterClick(
                elements.xiaoCard,
                elements.xiaoNormal,
                elements.xiaoCute,
                elements.xiaoBubble,
                false
            );
        });
        
        // Wish button
        elements.wishBtn.addEventListener('click', makeWish);
        
        // Close button
        elements.closeBtn.addEventListener('click', () => {
            elements.wishPopup.style.display = 'none';
            state.wishVisible = false;
        });
        
        // TREE CLICK - CONFETTI ONLY
        elements.tree.addEventListener('click', function() {
            // Tree glow animation
            this.style.animation = 'treeGlow 0.3s ease 3';
            
            // Create confetti
            createConfetti();
            
            // Reset tree animation
            setTimeout(() => {
                this.style.animation = 'treeGlow 5s infinite alternate';
            }, 1000);
        });
        
        // Click outside to close message
        document.addEventListener('click', (e) => {
            if (state.wishVisible && 
                !elements.wishPopup.contains(e.target) && 
                !elements.wishBtn.contains(e.target)) {
                elements.wishPopup.style.display = 'none';
                state.wishVisible = false;
            }
        });
        
        // ===== DYNAMIC RESIZE HANDLER =====
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                adjustLayoutForScreenSize();
                // Re-create snow and items on resize
                createSnow();
                createChristmasItems();
            }, 250); // Wait 250ms after resize finishes
        });
    }
    
    // Start
    init();
});
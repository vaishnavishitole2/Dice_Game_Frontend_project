const rollBtn = document.getElementById('rollBtn');
const players = document.querySelectorAll('.player');
const winnerMessage = document.querySelector('.winner-message');
const diceNumbers = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
};

rollBtn.addEventListener('click', () => {
    const results = [];
    
    players.forEach((player, index) => {
        const dice = player.querySelector('.dice');
        const result = player.querySelector('.result');
        const dots = dice.querySelectorAll('.dot');
        
        player.classList.remove('winner', 'loser');
        dice.classList.add('rolling');
        result.textContent = '';
        winnerMessage.textContent = '';
        
        const num = Math.floor(Math.random() * 6) + 1;
        results[index] = num;

        setTimeout(() => {
            dice.classList.remove('rolling');
            dots.forEach(dot => dot.classList.remove('active'));
            diceNumbers[num].forEach(dotIndex => {
                dots[dotIndex].classList.add('active');
            });
            result.textContent = num;
        }, 600);
    });

    

    setTimeout(() => {
        const max = Math.max(...results);
        const winners = [];
        
        players.forEach((player, index) => {
            if (results[index] === max) {
                player.classList.add('winner');
                winners.push(index + 1);
            } else {
                player.classList.add('loser');
            }
        });

        const winnerText = winners.length === 1 
            ? `Player ${winners[0]} is the CHAMPION! 🏆` 
            : `Tie between Players ${winners.join(', ')}! ⚔️`;
            
        winnerMessage.textContent = winnerText;
    }, 600 + 50);
});



// Create roaming background dice
function createBackgroundDice() {
    const background = document.querySelector('.background-dice');
 const diceEmojis = ['🎲', '🎲', '🎲', '🎲', '🎲', '🎲'];
    
    for(let i = 0; i < 20; i++) {
        const dice = document.createElement('div');
        dice.className = 'floating-dice';
        dice.textContent = diceEmojis[Math.floor(Math.random() * diceEmojis.length)];
        
        
        // Random properties
        const size = Math.random() * 40 + 20; // Between 20px and 60px
        const left = Math.random() * 100;
        const delay = Math.random() * -15;
        const duration = Math.random() * 10 + 15;
        const hue = Math.random() * 360;
        
        dice.style.cssText = `
            left: ${left}%;
            font-size: ${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            filter: hue-rotate(${hue}deg);
            opacity: ${Math.random() * 0.2 + 0.05};
        `;
        
        background.appendChild(dice);
    }
}



// Handle window resize
let resizeTimer;
function handleResize() {
    const background = document.querySelector('.background-dice');
    background.innerHTML = '';
    createBackgroundDice();
}

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 500);
});

// Initial creation
createBackgroundDice();
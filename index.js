const start = document.querySelector('#start'),
      game = document.querySelector('#game'),
      time = document.querySelector('#time'),
      gameTime = document.querySelector('#game-time'),
      colors = ['green', 'blue', 'red', 'yellow', 'aqua', 'pink', 'orange'];
      


let score = 0,
    isGameStarted = false,
    timeHeader = document.querySelector('#time-header'),
    resultHeader = document.querySelector('#result-header'),
    result = document.querySelector('#result');

start.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);
gameTime.addEventListener('input', setGameTime);

function startGame () {
    score = 0;
    setGameTime();

    gameTime.setAttribute('disabled', 'true');

    isGameStarted = true;
    game.style.backgroundColor = '#fff';
    start.classList.add('hide');

    let interval = setInterval(function () {
        let timer = parseFloat(time.textContent);

        if (timer <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            time.textContent = (timer - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function setGameScore () {
    result.textContent = score.toString();
}

function setGameTime () {
    let inpTime = +gameTime.value;
    time.textContent = inpTime.toFixed(1);
    timeHeader.classList.remove('hide');
    resultHeader.classList.add('hide');
}

function endGame () {
    gameTime.removeAttribute('disabled');
    isGameStarted = false;
    setGameScore();
    start.classList.remove('hide');
    game.innerHTML = '';
    game.style.backgroundColor = '#ccc';
    timeHeader.classList.add('hide');
    resultHeader.classList.remove('hide');
}

function renderBox () {
    game.innerHTML = '';
    const box = document.createElement('div'),
          boxSize = getRandom(30, 100),
          gameSize = game.getBoundingClientRect(),
          maxTop = gameSize.height - boxSize,
          maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = randomColor(colors);
    box.style.borderRadius = '100%';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    game.insertAdjacentElement('afterbegin', box);
}

function handleBoxClick (event) {

    if (!isGameStarted) {
        return;
    }

    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomColor (colors) {
    return colors = colors[Math.floor(Math.random() * colors.length)]; 
}

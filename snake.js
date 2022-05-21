let snake = document.getElementById('snake')
let enemy = document.getElementById('enemy')
let main = document.getElementById('main')
let score = document.getElementById('score')
let timer = document.getElementById('timer')

let starting = 0
let starting2 = 0
let starting3 = 0
let startingEnemy = 0

let timeoutGold = 0
let timeoutMove = 0
let timeoutTouch = 0
let timeoutTimer = 0
let timeoutEnemy = 0
let timeoutI = 0
//alert('пробел - старт, управление стрелочками')

let n = 10
timer.innerHTML = n
let width = 2
let height = 2
let enemyWidth = 12
let enemyHeight = 12
let direction = 'right'
let abc
let i = 0
let coins = []
let array = []
let points = 0
let timerNumber = n

document.addEventListener('keydown', e => {
    if(e.keyCode === 37) {
        direction = 'left'
        snake.style.transform =  'rotate(135deg)'
    }
    else if (e.keyCode === 38) {
        direction = 'top'
        snake.style.transform =  'rotate(215deg)'
    }
    else if (e.keyCode === 39) {
        direction = 'right'
        snake.style.transform =  'rotate(315deg)'
    }
    else if (e.keyCode === 40) {
        direction = 'bottom'
        snake.style.transform =  'rotate(45deg)'
    }
    else if ((e.keyCode === 32) ) {
        reset()
        addGold()
        starting = setInterval(addGold, n * 150)  
        starting2 = setInterval(move, 250)
        starting3 = setInterval(timerFn, 1000)
        startingTouch = setInterval(touch, 125)
        startingEnemy = setInterval(moveEnemy, 350)
        
        timeoutGold = setTimeout(() => clearInterval(starting), n * 1000);
        timeoutMove = setTimeout(() => clearInterval(starting2), n *1000);
        timeoutTimer = setTimeout(() => clearInterval(starting3), n *1000);
        timeoutTouch = setTimeout(() => clearInterval(startingTouch), n *1000);
        timeoutEnemy = setTimeout(() => clearInterval(startingEnemy), n *1000);
        timeoutI = setTimeout(() => clearInterval(i = 0), n * 1000);
    }
})


function reset() {
    direction = 'right'
    snake.style.transform =  'rotate(315deg)'
    coins = []
    points = 0
    timerNumber = n
    width = 2
    height = 2
    enemyWidth = 12
    enemyHeight = 12
    snake.style.gridColumnEnd = width
    snake.style.gridRowEnd = height

    enemy.style.gridColumnEnd = enemyWidth
    enemy.style.gridRowEnd = enemyHeight
    enemy.style.gridColumnStart = enemyWidth - 2
    enemy.style.gridRowStart = enemyHeight - 2


    let ff = document.querySelectorAll('.point').forEach(el => {
        el.parentNode.removeChild(el);
    })
    if (starting !== 0) {
        clearInterval(starting)
        clearInterval(starting2)
        clearInterval(starting3)
        clearInterval(startingEnemy)
        clearInterval(startingTouch)
    }
    clearTimeout(timeoutGold)
    clearTimeout(timeoutMove)
    clearTimeout(timeoutTimer)
    clearTimeout(timeoutTouch)
    clearTimeout(timeoutEnemy)
}


function timerFn() {
    timerNumber--
    timer.innerHTML = timerNumber
}


function addGold() {
    let abc = document.createElement('div')
    abc.className = 'point'
    abc.id = 'point' + i
    abc.style.gridColumnEnd = Math.floor(Math.random() * 19 + 2);
    abc.style.gridRowEnd = Math.floor(Math.random() * 19 + 2);
    main.append(abc)
    array.push(i, abc.style.gridColumnEnd, abc.style.gridRowEnd)
    coins.push(array)
    i++
    array = []
}



function move() {
    if(direction == 'right') {
        width++
        if (width > 21) {
            width =2
        }
    }
    else if(direction == 'bottom') {
        height++ 
        if (height > 21) {
            height = 2
        }
    }
    else if(direction == 'left') {
        width--
        if (width < 2) {
            width = 21
        }
    }
    else {
        height--
        if (height < 2) {
            height = 21
        }
    }
    snake.style.gridColumnEnd = width
    snake.style.gridRowEnd = height
    coins.forEach(el => {
        if (snake.style.gridColumnEnd == el[1] && snake.style.gridRowEnd == el[2]) {
            delete coins[el[0]]
            let vremennii = 'point' + el[0]
            points++
            let elem = document.getElementById(vremennii)
            elem.parentNode.removeChild(elem)
            score.innerHTML = points
            addGold()
            snake.style.backgroundColor = 'green'
            setTimeout(() => snake.style.backgroundColor = 'transparent', 150);
        }
    })

}

function moveEnemy() {
    if(height > enemyHeight) {
        enemyHeight++
    }
    else if (height < enemyHeight) {
        enemyHeight--
    }

    if(width > enemyWidth) {
        enemyWidth++
    }
    else if (width < enemyWidth) {
        enemyWidth--
    }

    if (enemyWidth == 2) {
        enemyWidth++
    }

    if(enemyHeight == 2) {
        enemyHeight++
    }
    enemy.style.gridColumnEnd = enemyWidth
    enemy.style.gridRowEnd = enemyHeight
    enemy.style.gridColumnStart = enemyWidth - 2
    enemy.style.gridRowStart = enemyHeight - 2

}
function touch() {
    if ((height == enemyHeight && width == enemyWidth) ||
    (height == enemyHeight - 1 && width == enemyWidth) ||
    (height == enemyHeight - 1 && width == enemyWidth - 1) ||
    (height == enemyHeight && width == enemyWidth - 1)) {
            console.log('догнал')
            reset()
    }
}

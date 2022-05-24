let snake = document.getElementById('snake')
let enemy = document.getElementById('enemy')
let main = document.getElementById('main')
let score = document.getElementById('score')
let timer = document.getElementById('timer')


let buttonStart = document.getElementById('button-start')
let clockMove = document.getElementById('clock-move')

let starting = 0
let starting2 = 0
let starting3 = 0
let startingEnemy = 0
let startingClock = 0

let timeoutClock = 0
let timeoutGold = 0
let timeoutMove = 0
let timeoutTouch = 0
let timeoutTimer = 0
let timeoutEnemy = 0
let timeoutI = 0

let clockArrow = 6
let clockArrowString = ''
//alert('пробел - старт, управление стрелочками')

let n = 30
let m = 1
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

buttonStart.addEventListener('click', el => {
    startGame()
})

document.querySelectorAll(".difficult-el").forEach(el => {
    el.addEventListener('click' , function() {
        document.querySelectorAll(".difficult-el").forEach(ele => {
                ele.style.backgroundColor = "#fff"
            })
        if (el.id == "difficult1") {
            m = 2
        }
        else if (el.id == "difficult2") {
            m = 1
        }
        else if (el.id == "difficult3") {
            m = .75
        }
        this.style.backgroundColor = "#d9ffb3"
        reset()
    })
})

document.querySelectorAll(".time-el").forEach(el => {
    el.addEventListener('click' , function() {
        document.querySelectorAll(".time-el").forEach(ele => {
                ele.style.backgroundColor = "#fff"
            })
        if (el.id == "time1") {
            n = 30
        }
        else if (el.id == "time2") {
            n = 60
        }
        else if (el.id == "time3") {
            n = 90
        }
        this.style.backgroundColor = "#d9ffb3"
        reset()
    })
})



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
        startGame()
    }
})

function cloak() {
    clockArrow = - timerNumber * 6 
    clockArrowString = "rotate(" + clockArrow + "deg)"
    clockMove.style.transform = clockArrowString
}

function startGame() {
    reset()
    addGold()
    starting = setInterval(addGold, n * 250)  
    starting2 = setInterval(move, 250)
    starting3 = setInterval(timerFn, 1000)
    startingTouch = setInterval(touch, 150)
    startingEnemy = setInterval(moveEnemy, m * 350)
    startingClock = setInterval(cloak, 1000)
 
    timeoutGold = setTimeout(() => clearInterval(starting), n * 1000);
    timeoutMove = setTimeout(() => clearInterval(starting2), n *1000);
    timeoutTimer = setTimeout(() => clearInterval(starting3), n *1000);
    timeoutTouch = setTimeout(() => clearInterval(startingTouch), n *1000);
    timeoutEnemy = setTimeout(() => clearInterval(startingEnemy), n *1000);
    timeoutI = setTimeout(() => clearInterval(i = 0), n * 1000);
}

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
    timer.innerHTML = n
    snake.style.gridColumnEnd = width
    snake.style.gridRowEnd = height
    score.innerHTML = ': 0' 

    enemy.style.gridColumnEnd = enemyWidth
    enemy.style.gridRowEnd = enemyHeight
    enemy.style.gridColumnStart = enemyWidth - 2
    enemy.style.gridRowStart = enemyHeight - 2
    clockArrow = - timerNumber * 6 
    clockArrowString = "rotate(" + clockArrow + "deg)"
    clockMove.style.transform = clockArrowString


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
            score.innerHTML = ': ' + points
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
            reset()
    }
}

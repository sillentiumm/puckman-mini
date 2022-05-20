let snake = document.getElementById('snake')
let left = document.getElementById('left')
let right = document.getElementById('right')
let topa = document.getElementById('top')
let bottom = document.getElementById('bottom')
let main = document.getElementById('main')
let score = document.getElementById('score')
let timer = document.getElementById('timer')
alert('пробел - старт, управление стрелочками')

let n = 30
timer.innerHTML = n
let width = 2
let height = 2
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
    else if ((e.keyCode === 32) && i == 0) {
        reset()
        start.style.display = 'none'
        addGold()
        let starting = setInterval(addGold, 3000)  
        let starting2 = setInterval(move, 250)
        let finish = setInterval(timerFn, 1000)
        setTimeout(() => clearInterval(starting), n * 1000);
        setTimeout(() => clearInterval(starting2), n *1000);
        setTimeout(() => clearInterval(finish), n *1000);
        setTimeout(() => clearInterval(start.style.display = 'block'), n* 1000);
        setTimeout(() => clearInterval(i = 0), n * 1000);
    }
})

left.addEventListener('click', function(){
    direction = 'left'
    snake.style.transform =  'rotate(135deg)'
})

right.addEventListener('click', function(){
    direction = 'right'
    snake.style.transform =  'rotate(315deg)'
})

topa.addEventListener('click', function(){
    direction = 'top'
    snake.style.transform =  'rotate(215deg)'
})

bottom.addEventListener('click', function(){
    direction = 'bottom'
    snake.style.transform =  'rotate(45deg)'
})

start.addEventListener('click', function(){
    reset()
    start.style.display = 'none'
    addGold()
    let starting = setInterval(addGold, 3000)  
    let starting2 = setInterval(move, 250)
    let finish = setInterval(timerFn, 1000)
    setTimeout(() => clearInterval(starting), 30000);
    setTimeout(() => clearInterval(starting2), 30000);
    setTimeout(() => clearInterval(finish), 30000);
    setTimeout(() => clearInterval(start.style.display = 'block'), 30000);
})

function reset() {
    coins = []
    points = 0
    timerNumber = n
    let ff = document.querySelectorAll('.point').forEach(el => {
        el.parentNode.removeChild(el);
    })
    //setTimeout(() => clearInterval(m), 1);
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

var countdown_id = null
var start_ss = null
var start_mm = null
var start_hh = null

var bar = new ProgressBar.Circle(document.getElementById('progress-bar'), {
    strokeWidth: 3,
    duration: 100,
    color: '#FFFFFF',
    trailColor: '#AAAAAA',
    trailWidth: 2,
    svgStyle: null,
});

var content = document.querySelector(".content");
var menu_items = document.querySelectorAll(".menu-item");
menu_items.forEach((i) => {
    i.addEventListener("click", () => {
        const i_name = i.getAttribute("data-name");
        content.setAttribute("data-active", i_name);
    });
});


var timer_items = document.querySelectorAll('.timer-item')
timer_items.forEach(timer_item => {
    let up = timer_item.querySelector('.timer-item__up')
    let down = timer_item.querySelector('.timer-item__down')
    let input = timer_item.querySelector('.timer-item__input')
    up.addEventListener('click', () => {
        let state = document.querySelector('.content').getAttribute('data-state')
        if (state === "stop") {
            input.value = increaseTimerItem(input.value, 60)
        }    
    })
    down.addEventListener('click', () => {
        let state = document.querySelector('.content').getAttribute('data-state')
        if (state === "stop") {
            input.value = decreaseTimerItem(input.value, 60)
        }  
    })
    input.addEventListener('blur', (e) => {
        if (parseInt(input.value)>60) {
            input.value = '59'
        } else if (parseInt(input.value)<0) {
            input.value = '00'
        } else if (parseInt(input.value)<11) {
            input.value = '0' + parseInt(input.value)
        }
    })
});

const increaseTimerItem = (value, max_value) => {
    if (parseInt(value) < 9) {
        value = '0' + (parseInt(value) + 1)
    } else if (parseInt(value) === max_value-1) {
        value = '00'
    } else {
        value = parseInt(value) + 1
    }
    return value
}

const decreaseTimerItem = (value, max_value) => {
    if (parseInt(value) === 0) {
        value = max_value-1
    } else if (parseInt(value) < 11) {
        value = '0' + (parseInt(value) - 1)
    } else {
        value = parseInt(value) - 1
    }
    return value
}

const startTimer = () => {
    let timer_items = document.querySelectorAll('.timer-item')
    let ss = timer_items[2].querySelector('.timer-item__input')
    let mm = timer_items[1].querySelector('.timer-item__input')
    let hh = timer_items[0].querySelector('.timer-item__input')
    if (hh.value === '00' && mm.value === '00' && ss.value === '00') {
        stop()
    } else if (ss.value === '00' && mm.value === '00') {
        ss.value = '59'
        mm.value = '59'
        hh.value = decreaseTimerItem(hh.value, 60)
    } else if (ss.value === '00') {
        mm.value = decreaseTimerItem(mm.value, 60)
        ss.value = '59'
    } else {
        ss.value = decreaseTimerItem(ss.value, 60)
    }
    let start_time = parseInt(start_hh) * 3600 + parseInt(start_mm) * 60 + parseInt(start_ss)
    let actual_time = parseInt(hh.value) * 3600 + parseInt(mm.value) * 60 + parseInt(ss.value)
    let animation_status = (start_time - actual_time) / start_time
    bar.animate(animation_status);
}

const startStopwatch = () => {
    let sw_items = document.querySelectorAll('.stopwatch-item')
    let ss = sw_items[2]
    let mm = sw_items[1]
    let hh = sw_items[0]
    if (ss.textContent === '59' && mm.textContent === '59') {
        hh.textContent = increaseTimerItem(hh.textContent, 100)
        mm.textContent = '00'
        ss.textContent = '00'
    } else if (ss.textContent === '59') {
        mm.textContent = increaseTimerItem(mm.textContent, 60)
        ss.textContent = '00'
    } else {
        ss.textContent = increaseTimerItem(ss.textContent, 60)
    }

}

var start_timer_button = document.querySelector('#start-button')
start_timer_button.addEventListener('click', () => {
    document.querySelector('.content').setAttribute('data-state', 'start')
    if (document.querySelector('.content').getAttribute('data-active') === 'timer') {
        let timer_items = document.querySelectorAll('.timer-item')
        start_ss = timer_items[2].querySelector('.timer-item__input').value
        start_mm = timer_items[1].querySelector('.timer-item__input').value
        start_hh = timer_items[0].querySelector('.timer-item__input').value
        countdown_id = setInterval(startTimer, 1000)
    } else {
        countdown_id = setInterval(startStopwatch, 1000)
    }
})

var pause_timer_button = document.querySelector('#pause-button')
pause_timer_button.addEventListener('click', () => {
    clearInterval(countdown_id)
    document.querySelector('.content').setAttribute('data-state', 'pause')
})

var stop_timer_button = document.querySelector('#stop-button')
const stop = () => {
    clearInterval(countdown_id)
    document.querySelector('.content').setAttribute('data-state', 'stop')
    if (document.querySelector('.content').getAttribute('data-active') === 'timer') {
        let timer_items = document.querySelectorAll('.timer-item')
        timer_items[2].querySelector('.timer-item__input').value = start_ss
        timer_items[1].querySelector('.timer-item__input').value = start_mm
        timer_items[0].querySelector('.timer-item__input').value = start_hh
        bar.animate(0);
    } else {
        let sw_items = document.querySelectorAll('.stopwatch-item')
        sw_items.forEach(el => {
            el.textContent = '00'
        });
    }

}

stop_timer_button.addEventListener('click', stop)

var resume_timer_button = document.querySelector('#resume-button')
resume_timer_button.addEventListener('click', () => {
    document.querySelector('.content').setAttribute('data-state', 'start')
    if (document.querySelector('.content').getAttribute('data-active') === 'timer') {
        countdown_id = setInterval(startTimer, 1000)
    } else {
        countdown_id = setInterval(startStopwatch, 1000)
    }
})
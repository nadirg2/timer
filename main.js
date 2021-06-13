var countdown_id = null

var menu = document.getElementsByClassName("menu")[0];
var menu_items = document.querySelectorAll(".menu-item");
menu_items.forEach((i) => {
  i.addEventListener("click", () => {
    const i_name = i.getAttribute("data-name");
    menu.setAttribute("data-active", i_name);
  });
});


var timer_items = document.querySelectorAll('.timer-item')
timer_items.forEach(timer_item => {
    let up = timer_item.querySelector('.timer-item__up')
    let down = timer_item.querySelector('.timer-item__down')
    let input = timer_item.querySelector('.timer-item__input')
    up.addEventListener('click', () => {
        input.value = increaseTimerItem(input)
    })
    down.addEventListener('click', () => {
        input.value = decreaseTimerItem(input)
    })
});

const increaseTimerItem = (item) => {
    value = item.value
    if (parseInt(value)<9){
        value = '0' + (parseInt(value)+1)
    } else if (parseInt(value)===59) {
        value = '00'
    } else {
        value = parseInt(value)+1
    }
    return value
}

const decreaseTimerItem = (item) => {
    value = item.value
    if (parseInt(value) == 0) {
        value = 59
    } else if (parseInt(value) < 11) {
        value = '0' + (parseInt(value)-1)
    } else {
        value = parseInt(value)-1
    }
    return value
}

const startTimer = () => {
    let timer_items = document.querySelectorAll('.timer-item')
    let ss = timer_items[2].querySelector('.timer-item__input')
    let mm = timer_items[1].querySelector('.timer-item__input')
    let hh = timer_items[0].querySelector('.timer-item__input')
    if (hh.value=='00' && mm.value=='00' && ss.value=='00') {
        clearInterval(countdown_id)
    } else if (ss.value=='00' && mm.value=='00') {
        ss.value = '59'
        mm.value = '59'
        hh.value = decreaseTimerItem(hh)
    } else if (ss.value=='00') {
        mm.value = decreaseTimerItem(mm)
        ss.value = '59'
    } else {
        ss.value = decreaseTimerItem(ss)
    }
}

var start_timer_button = document.getElementById('button_start-timer')
start_timer_button.addEventListener('click', () => {
    countdown_id = setInterval(startTimer, 1000)
})
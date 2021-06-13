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
    console.log(timer_item);
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
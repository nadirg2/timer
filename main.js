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
        if (parseInt(input.value)<9){
            input.value = '0' + (parseInt(input.value)+1)
        } else if (parseInt(input.value)===59) {
            input.value = '00'
        } else {
            input.value = parseInt(input.value)+1
        }
    })
    down.addEventListener('click', () => {
        if (parseInt(input.value) == 0) {
            input.value = 59
        } else if (parseInt(input.value) < 11) {
            input.value = '0' + (parseInt(input.value)-1)
        } else {
            input.value = parseInt(input.value)-1
        }
    })
});
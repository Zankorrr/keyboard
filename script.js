document.body.insertAdjacentHTML('afterbegin', `<textarea rows="8" cols="111" autofocus></textarea>
<div class="keyboard"></div>`)

const KEYBOARD = document.querySelector('.keyboard')
const TEXTAREA = document.querySelector('textarea')

const CODES = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 
'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 
'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 
'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 
'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 
'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 
'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'AltRight']

const KEYS = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete', 
'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 
'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'return', 
'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift', 
'ctrl', 'opt', 'cmd', ' ', 'cmd', '◀', '▼', '▶', 'opt']



function init() {
    let out = ''
    for(let i = 0; i < KEYS.length; i++) {
        let keyWidth = ''
        if(i == 57) {
            keyWidth = ' class="x7"'
        } else if(i == 13 || i == 14 || i == 28 || i == 40 || i == 41 || i == 53) {
            keyWidth = ' class="x2"'
        }
        out += `<div${keyWidth} id="${CODES[i]}">${KEYS[i]}</div>`
    }
    KEYBOARD.innerHTML = out
}

init()

document.onkeydown = function(event) {
    document.querySelector(`.keyboard div[id="${event.code}"]`).classList.add('active')
    TEXTAREA.focus()
}

document.onmousedown = function(event) {
    console.log(event.target.id)
    if(event.target.innerHTML.length == 1) {
        TEXTAREA.value += (event.target.innerHTML)
    } else if(event.target.id == "Backspace") {
        TEXTAREA.value = TEXTAREA.value.slice(0, -1)
    } else if(event.target.id == "Enter") {
        TEXTAREA.value += "\n"
    }
    
    TEXTAREA.focus()
    event.target.classList.add('active')
}

document.onmouseup = function(event) {
    event.target.classList.remove('active')
    TEXTAREA.focus()
}

document.onkeyup = function(event) {
    document.querySelector(`.keyboard div[id="${event.code}"]`).classList.remove('active')
}
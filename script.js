
document.body.insertAdjacentHTML('afterbegin', `<textarea rows="8" cols="111" disabled></textarea>
<div class="keyboard"></div>
<p>Клавиатура создана в операционной системе MacOS</p>
<p>Для переключения языка комбинация: левый control + левый shift</p>
<p>PS: Tab и CapsLock работают ужасно, я правда не понимаю как их укротить(</p>
<p>PPS: Да и Shift не очень...</p>`)

const KEYBOARD = document.querySelector('.keyboard')
const TEXTAREA = document.querySelector('textarea')
let caps = false
let lang

if(localStorage.lang) {
    lang = localStorage.lang
} else {
    lang = 'en'
}


const CODES = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 
'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 
'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 
'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 
'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 
'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 
'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'AltRight']

const KEYS_EN = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete', 
'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 
'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'return', 
'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift', 
'ctrl', 'opt', 'cmd', ' ', 'cmd', '◀', '▼', '▶', 'opt']

const KEYS_RU = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'удалить', 
'таб', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 
'капс', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ввод', 
'шифт', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'шифт', 
'ктрл', 'опц', 'ком', ' ', 'ком', '◀', '▼', '▶', 'опц']

const KEYS_RU_SHIFT = ['Ë', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'удалить', 
'таб', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 
'капс', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'ввод', 
'шифт', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲', 'шифт', 
'ктрл', 'опц', 'ком', ' ', 'ком', '◀', '▼', '▶', 'опц']

const KEYS_EN_SHIFT = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'delete', 
'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 
'caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "\"", 'return', 
'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'shift', 
'ctrl', 'opt', 'cmd', ' ', 'cmd', '◀', '▼', '▶', 'opt']

function init() {
    let out = ''
    for(let i = 0; i < CODES.length; i++) {
        let keyClass = ''
        if(i == 57) {
            keyClass = ' class="x7"'
        } else if(i == 13 || i == 14 || i == 40 || i == 41 || i == 53) {
            keyClass = ' class="x2"'
        } else if(i == 28) {
            if(!caps) {
                keyClass = ' class="x2"'
            } else {
                keyClass = ' class="x2 active"'
            }
        }
        if(!caps) {
            if(lang == 'en') {
                out += `<div${keyClass} id="${CODES[i]}">${KEYS_EN[i]}</div>`
            } else {
                out += `<div${keyClass} id="${CODES[i]}">${KEYS_RU[i]}</div>`
            }
            
        } else {
            if(lang == 'en') {
                out += `<div${keyClass} id="${CODES[i]}">${KEYS_EN_SHIFT[i]}</div>`
            } else {
                out += `<div${keyClass} id="${CODES[i]}">${KEYS_RU_SHIFT[i]}</div>`
            }
            
        }
    }
    KEYBOARD.innerHTML = out
}

init()

document.addEventListener('keydown', (event) => {
    if (event.code == 'ShiftLeft') {
        if(event.ctrlKey) {
           if(lang == 'en') {
                lang = 'ru'
            } else {
                lang = 'en'
            }
            init() 
        }
        
    }
})

document.onkeydown = function(event) {
    if(event.code != 'CapsLock') {
        document.querySelector(`.keyboard div[id="${event.code}"]`).classList.add('active')
        if(event.key.length == 1) {
            if(event.shiftKey) {
                if(lang == 'en') {
                    TEXTAREA.value += KEYS_EN_SHIFT[CODES.indexOf(event.code)]
                } else {
                    TEXTAREA.value += KEYS_RU_SHIFT[CODES.indexOf(event.code)]
                }
            } else {
                TEXTAREA.value += document.querySelector(`.keyboard div[id="${event.code}"]`).innerHTML
            }
        } else if(event.code == 'Backspace') {
            TEXTAREA.value = TEXTAREA.value.slice(0, -1)
        } else if(event.code == 'Tab') {
            TEXTAREA.value += '\t'
            setTimeout(() => {
                document.querySelector(`.keyboard div[id="Tab"]`).classList.remove('active')
            }, '200')
            KEYBOARD.focus()
        }
    } else {
        if(document.querySelector(`.keyboard div[id="${event.code}"]`).classList.contains('active')) {
            caps = false
        } else {
            caps = true
        }
        init()
    }
}

KEYBOARD.onmousedown = function(event) {
    if(event.target.innerHTML.length == 1) {
        TEXTAREA.value += (event.target.innerHTML)
    } else if(event.target.id == "Backspace") {
        TEXTAREA.value = TEXTAREA.value.slice(0, -1)
    } else if(event.target.id == "Enter") {
        TEXTAREA.value += "\n"
    } else if(event.target.id == "Tab") {
        TEXTAREA.value += "\t"
    } else if(event.target.id == "CapsLock") {
        if(!caps) {
            caps = true
        } else {
            caps = false
        }
        init()
    }
    event.target.classList.add('active')
}

KEYBOARD.onmouseup = function(event) {
    if(event.target.id != "CapsLock") {
        event.target.classList.remove('active')
    }
}

document.onkeyup = function(event) {
    document.querySelector(`.keyboard div[id="${event.code}"]`).classList.remove('active')
    KEYBOARD.focus()
}

window.addEventListener('beforeunload', () => {
    if(lang == 'ru') {
        localStorage.setItem('lang', 'ru')
    } else {
        localStorage.setItem('lang', 'en')
    }
})
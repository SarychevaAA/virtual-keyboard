import './index.html';
import './index.scss';

let currentLanguage = null;
const userLanguage = {
  'en': {
    'classic': [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
    ],
    'shift': [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
      'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
      'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
      'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
    ],
  },
  'ru': {
    'classic': [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
      'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
    ],
    'shift': [
      'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '-', '=', 'Backspace',
      'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Del',
      'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
      'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
    ],
  }
}

let capsFlag = false;
let shiftFlag = false;
let positionCursor = 0;
const keyboardCodes = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
];
const specialLetters = ['Backspace', 'Tab', 'Del', 'Caps Lock', 'Enter', 'Shift', 'Ctrl', 'Win', 'Alt', 'Space', '◄', '▼', '►', '▲'];
const specialCodes = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'MetaLeft', 'AltLeft', 'AltRight', 'Space', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp'];

const rowLength = [14, 15, 13, 13, 9];
const keyNumberStartRow = [0, 14, 29, 42, 55];

function createKeys(row) {
  const keys = userLanguage[currentLanguage].classic
    .slice(keyNumberStartRow[row], keyNumberStartRow[row] + rowLength[row]);
  const keyRow = [];
  keys.forEach((key, index) => {
    const keyElement = document.createElement('div');
    keyElement.classList.add('keyboard__key');
    if (specialLetters.includes(key)) {
      keyElement.textContent = key;
      keyElement.classList.add('keyboard__key_special');
    } else {
      keyElement.textContent = shiftFlag ? userLanguage[currentLanguage].shift[keyNumberStartRow[row] + index]
        : capsFlag ? key.toUpperCase() : key.toLowerCase();
      keyElement.classList.add('keyboard__key_classic');
    }
    keyElement.classList.add(keyboardCodes[keyNumberStartRow[row] + index]);
    if (key === 'Caps Lock' && capsFlag) {
      keyElement.classList.add('active');
    }
    keyRow.push(keyElement);
  });
  return keyRow;
}
function addText(textArea, symbol) {
  if (document.activeElement === textArea) {
    positionCursor = textArea.selectionEnd;
  }
  const textAreaArray = textArea.textContent.split('');
  const currentElement = textAreaArray[positionCursor];
  textAreaArray.splice(positionCursor, 1, symbol, currentElement);
  textArea.textContent = textAreaArray.join('');
  positionCursor += 1;
}

function initKeyboardLayout() {
  const keyboardRows = [];
  for (let i = 0; i < 5; i += 1) {
    const row = document.createElement('div');
    row.classList.add('keyboard__row');
    const keys = createKeys(i);
    row.append(...keys);
    keyboardRows.push(row);
  }
  return keyboardRows;
}

function initPage() {
  const body = document.querySelector('body');
  body.classList.add('page');
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = 'Virtual Keyboard';
  const textArea = document.createElement('textarea');
  textArea.classList.add('text-area');
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  const additionaltext = document.createElement('p');
  additionaltext.classList.add('additional-text');
  additionaltext.textContent = 'Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: левый ctrl + alt';
  body.append(wrapper);
  wrapper.append(title);
  wrapper.append(textArea);
  wrapper.append(keyboard);
  wrapper.append(additionaltext);
  keyboard.append(...initKeyboardLayout());
}

function updateKeyboard() {
  const keyboard = document.getElementsByClassName('keyboard')[0];
  keyboard.innerHTML = '';
  keyboard.append(...initKeyboardLayout());
  listenVirtualKeyboard();
}

function InputSpecialKeys(keyCode, textArea) {
  if (keyCode === 'ArrowLeft') {
    addText(textArea, '◄');
  } else if (keyCode === 'ArrowRight') {
    addText(textArea, '►');
  } else if (keyCode === 'ArrowDown') {
    addText(textArea, '▼');
  } else if (keyCode === 'ArrowUp') {
    addText(textArea, '▲');
  } else if (keyCode === 'Enter') {
    addText(textArea, '\n');
  } else if (keyCode === 'Space') {
    addText(textArea, ' ');
  } else if (keyCode === 'Tab') {
    addText(textArea, '    ');
    positionCursor += 3;
  } else if (keyCode === 'CapsLock') {
    capsFlag = !capsFlag;
    updateKeyboard();
  } else if (keyCode === 'Backspace') {
    textArea.focus();
    if (positionCursor >= 0 && textArea.selectionEnd > 0) {
      positionCursor = textArea.selectionEnd - 1;
      const textAreaArray = textArea.textContent.split('');
      textAreaArray.splice(positionCursor, 1);
      textArea.textContent = textAreaArray.join('');
    } else {
      positionCursor = textArea.selectionEnd;
    }
  } else if (keyCode === 'Delete') {
    textArea.focus();
    if (positionCursor < textArea.textContent.length
        || textArea.selectionEnd < textArea.textContent.length) {
      positionCursor = textArea.selectionEnd;
      const textAreaArray = textArea.textContent.split('');
      textAreaArray.splice(positionCursor, 1);
      textArea.textContent = textAreaArray.join('');
    }
  } else if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
    shiftFlag = true;
    updateKeyboard();
  }
}
function listenVirtualKeyboard() {
  const keyboardClassicKeys = document.getElementsByClassName('keyboard__key_classic');
  const keyboardSpecialKeys = document.getElementsByClassName('keyboard__key_special');
  for (const key of keyboardClassicKeys) {
    key.addEventListener('mousedown', (event) => {
      const keyCodeIndex = keyboardCodes
        .indexOf(event.target.classList[event.target.classList.length - 1]);
      event.target.classList.add('active');
      const textArea = document.getElementsByClassName('text-area')[0];
      addText(
        textArea,
        shiftFlag ? userLanguage[currentLanguage].shift[keyCodeIndex] : capsFlag
          ? userLanguage[currentLanguage].classic[keyCodeIndex].toUpperCase() : userLanguage[currentLanguage].classic[keyCodeIndex],
      );
      textArea.setSelectionRange(positionCursor, positionCursor);
      textArea.focus();
    });
    key.addEventListener('mouseup', (event) => {
      event.target.classList.remove('active');
    });
  }
  for (const key of keyboardSpecialKeys) {
    key.addEventListener('mousedown', (event) => {
      let keyCode = event.target.classList[event.target.classList.length - 1];
      if (keyCode === 'active') keyCode = event.target.classList[event.target.classList.length - 2];
      const textArea = document.getElementsByClassName('text-area')[0];
      InputSpecialKeys(keyCode, textArea);
      if (keyCode !== 'CapsLock') {
        event.target.classList.add('active');
      }
      textArea.setSelectionRange(positionCursor, positionCursor);
    });
    key.addEventListener('mouseup', (event) => {
      const keyCode = event.target.classList[event.target.classList.length - 1];
      if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
        shiftFlag = false;
        updateKeyboard();
      }
      if (event.target.classList[event.target.classList.length - 2] !== 'CapsLock') {
        event.target.classList.remove('active');
      }
    });
  }
}

function listenPhysicalKeyboard() {
  window.addEventListener('keydown', (event) => {
    event.preventDefault();
    const activeCode = event.code;
    const activeElement = document.querySelector(`.${activeCode}`);
    const textArea = document.querySelector('.text-area');
    if (!specialCodes.includes(activeCode)) {
      activeElement.classList.add('active');
      addText(textArea, shiftFlag ? userLanguage[currentLanguage].shift[keyboardCodes.indexOf(event.code)]
        : (capsFlag ? event.key.toUpperCase() : event.key));
    }
    InputSpecialKeys(activeCode, textArea);
    if (specialCodes.includes(activeCode)) {
      if (activeCode !== 'CapsLock') {
        activeElement.classList.add('active');
      }
    }
    textArea.setSelectionRange(positionCursor, positionCursor);
  }, false);

  window.addEventListener('keyup', (event) => {
    const activeCode = event.code;
    if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
      shiftFlag = false;
      updateKeyboard();
    }
    if (activeCode !== 'CapsLock') {
      const activeElement = document.querySelector(`.${activeCode}`);
      activeElement.classList.remove('active');
    }
  });
}
function initLanguage(){
  if (localStorage.getItem('currentLanguage')){
    currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
    console.log(currentLanguage);
  }
  else{
    currentLanguage = 'en';
    localStorage.setItem('currentLanguage', JSON.stringify(currentLanguage));
  }
}

function changeLanguage(){
  if (currentLanguage === 'ru'){
    currentLanguage = 'en';
    localStorage.setItem('currentLanguage', JSON.stringify(currentLanguage));
  }
  else{
    currentLanguage = 'ru';
    localStorage.setItem('currentLanguage', JSON.stringify(currentLanguage));
  }
  updateKeyboard();
}

window.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initPage();
  listenVirtualKeyboard();
  listenPhysicalKeyboard();
  document.onkeydown = function (event) {
    if (event.code === 'ControlLeft') {
      document.onkeyup = function (newEvent) {
        if (newEvent.code === 'AltLeft' || newEvent.code === 'AltRight') {
          changeLanguage();
        }
        else {
          document.onkeyup = null;
        }
      };
    }
  };
});

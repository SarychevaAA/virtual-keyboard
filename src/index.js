import './index.html';
import './index.scss';

const keyboardLettersEn = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
  'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
];

const keyboardCodes = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
];
const specialLetters = ['Backspace', 'Tab', 'Del', 'Caps Lock', 'Enter', 'Shift', 'Ctrl', 'Win', 'Alt', 'Space', '◄', '▼', '►', '▲'];
const rowLength = [14, 15, 13, 13, 9];
const keyNumberStartRow = [0, 14, 29, 42, 55];

function createKeys(row) {
  const keys = keyboardLettersEn
    .slice(keyNumberStartRow[row], keyNumberStartRow[row] + rowLength[row]);
  const keyRow = [];
  keys.forEach((key, index) => {
    const keyElement = document.createElement('button');
    keyElement.classList.add('keyboard__key');
    keyElement.textContent = key;
    if (specialLetters.includes(key)) {
      keyElement.classList.add('keyboard__key_special');
    } else {
      keyElement.classList.add('keyboard__key_classic');
    }
    keyElement.classList.add(keyboardCodes[keyNumberStartRow[row] + index]);
    keyRow.push(keyElement);
  });
  return keyRow;
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

window.addEventListener('DOMContentLoaded', () => {
  initPage();
});

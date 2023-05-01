import './index.html';
import './index.scss';

class Keyboard {
  constructor() {
    this.capsFlag = false;
    this.shiftFlag = false;
    this.shiftType = null;
    this.positionCursor = 0;
    this.languageFlag = false;
    this.currentLanguage = null;
    this.keyboardCodes = [
      'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
      'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
      'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
      'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
    ];
    this.specialLetters = ['Backspace', 'Tab', 'Del', 'Caps Lock', 'Enter', 'Shift', 'Ctrl', 'Win', 'Alt', 'Space', '◄', '▼', '►', '▲'];
    this.specialCodes = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'MetaLeft', 'AltLeft', 'AltRight', 'Space', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp'];
    this.rowLength = [14, 15, 13, 13, 9];
    this.keyNumberStartRow = [0, 14, 29, 42, 55];
    this.userLanguage = {
      en: {
        classic: [
          '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
          'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
          'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
          'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
          'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
        ],
        shift: [
          '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
          'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
          'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
          'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'Shift',
          'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
        ],
      },
      ru: {
        classic: [
          'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
          'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
          'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
          'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift',
          'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
        ],
        shift: [
          'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '-', '=', 'Backspace',
          'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Del',
          'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
          'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲', 'Shift',
          'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
        ],
      },
    };
  }

  initLanguage() {
    if (localStorage.getItem('currentLanguage')) {
      this.currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
    } else {
      this.currentLanguage = 'en';
      localStorage.setItem('currentLanguage', JSON.stringify(this.currentLanguage));
    }
  }

  changeLanguage() {
    if (this.currentLanguage === 'ru') {
      this.currentLanguage = 'en';
      localStorage.setItem('currentLanguage', JSON.stringify(this.currentLanguage));
    } else {
      this.currentLanguage = 'ru';
      localStorage.setItem('currentLanguage', JSON.stringify(this.currentLanguage));
    }
    this.updateKeyboard();
  }

  createKeys(row) {
    const keys = this.userLanguage[this.currentLanguage].classic
      .slice(this.keyNumberStartRow[row], this.keyNumberStartRow[row] + this.rowLength[row]);
    const keyRow = [];
    keys.forEach((key, index) => {
      const keyElement = document.createElement('div');
      keyElement.classList.add('keyboard__key');
      if (this.specialLetters.includes(key)) {
        keyElement.textContent = key;
        keyElement.classList.add('keyboard__key_special');
      } else {
        let text = key.toLowerCase();
        if (this.shiftFlag && !this.capsFlag) {
          text = this.userLanguage[this.currentLanguage].shift[this.keyNumberStartRow[row] + index];
        }
        if (this.shiftFlag && this.capsFlag) {
          text = this.userLanguage[this.currentLanguage]
            .shift[this.keyNumberStartRow[row] + index].toLowerCase();
        } else if (this.capsFlag) text = key.toUpperCase();
        keyElement.textContent = text;
        keyElement.classList.add('keyboard__key_classic');
      }
      keyElement.classList.add(this.keyboardCodes[this.keyNumberStartRow[row] + index]);
      if (key === 'Caps Lock' && this.capsFlag) {
        keyElement.classList.add('active');
      }
      if (key === 'Shift' && this.shiftFlag && this.keyboardCodes[this.keyNumberStartRow[row] + index] === this.shiftType) {
        keyElement.classList.add('active');
      }
      keyRow.push(keyElement);
    });
    return keyRow;
  }

  initKeyboardLayout() {
    const keyboardRows = [];
    for (let i = 0; i < 5; i += 1) {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      const keys = this.createKeys(i);
      row.append(...keys);
      keyboardRows.push(row);
    }
    return keyboardRows;
  }

  addText(symbol) {
    const textArea = document.querySelector('.text-area');
    if (document.activeElement === textArea) {
      this.positionCursor = textArea.selectionEnd;
    }
    const textAreaArray = textArea.textContent.split('');
    const currentElement = textAreaArray[this.positionCursor];
    textAreaArray.splice(this.positionCursor, 1, symbol, currentElement);
    textArea.textContent = textAreaArray.join('');
    this.positionCursor += 1;
  }

  initPage() {
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
    keyboard.append(...this.initKeyboardLayout());
  }

  updateKeyboard() {
    const keyboard = document.getElementsByClassName('keyboard')[0];
    keyboard.innerHTML = '';
    keyboard.append(...this.initKeyboardLayout());
    this.listenVirtualKeyboard();
  }

  InputSpecialKeys(keyCode) {
    const textArea = document.querySelector('.text-area');
    if (keyCode === 'ArrowLeft') {
      this.addText('◄');
    } else if (keyCode === 'ArrowRight') {
      this.addText('►');
    } else if (keyCode === 'ArrowDown') {
      this.addText('▼');
    } else if (keyCode === 'ArrowUp') {
      this.addText('▲');
    } else if (keyCode === 'Enter') {
      this.addText('\n');
    } else if (keyCode === 'Space') {
      this.addText(' ');
    } else if (keyCode === 'Tab') {
      this.addText('    ');
      this.positionCursor += 3;
    } else if (keyCode === 'CapsLock') {
      this.capsFlag = !this.capsFlag;
      this.updateKeyboard();
    } else if (keyCode === 'Backspace') {
      textArea.focus();
      if (this.positionCursor >= 0 && textArea.selectionEnd > 0) {
        this.positionCursor = textArea.selectionEnd - 1;
        const textAreaArray = textArea.textContent.split('');
        textAreaArray.splice(this.positionCursor, 1);
        textArea.textContent = textAreaArray.join('');
      } else {
        this.positionCursor = textArea.selectionEnd;
      }
    } else if (keyCode === 'Delete') {
      textArea.focus();
      if (this.positionCursor < textArea.textContent.length
          || textArea.selectionEnd < textArea.textContent.length) {
        this.positionCursor = textArea.selectionEnd;
        const textAreaArray = textArea.textContent.split('');
        textAreaArray.splice(this.positionCursor, 1);
        textArea.textContent = textAreaArray.join('');
      }
    } else if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
      this.shiftFlag = true;
      this.shiftType = keyCode;
      this.updateKeyboard();
    }
  }

  listenVirtualKeyboard() {
    const keyboardClassicKeys = document.getElementsByClassName('keyboard__key_classic');
    const keyboardSpecialKeys = document.getElementsByClassName('keyboard__key_special');
    Array.from(keyboardClassicKeys).forEach((key) => {
      key.addEventListener('mousedown', (event) => {
        const keyCodeIndex = this.keyboardCodes
          .indexOf(event.target.classList[event.target.classList.length - 1]);
        event.target.classList.add('active');
        const textArea = document.getElementsByClassName('text-area')[0];
        let text = this.userLanguage[this.currentLanguage].classic[keyCodeIndex];
        if (this.shiftFlag && !this.capsFlag) {
          text = this.userLanguage[this.currentLanguage].shift[keyCodeIndex];
        } else if (this.shiftFlag && this.capsFlag) {
          text = this.userLanguage[this.currentLanguage].shift[keyCodeIndex].toLowerCase();
        } else if (this.capsFlag) {
          text = this.userLanguage[this.currentLanguage]
            .classic[keyCodeIndex].toUpperCase();
        }
        this.addText(text);
        textArea.setSelectionRange(this.positionCursor, this.positionCursor);
        textArea.focus();
      });
      key.addEventListener('mouseup', (event) => {
        event.target.classList.remove('active');
      });
    });
    Array.from(keyboardSpecialKeys).forEach((key) => {
      key.addEventListener('mousedown', (event) => {
        let keyCode = event.target.classList[event.target.classList.length - 1];
        if (keyCode === 'active') keyCode = event.target.classList[event.target.classList.length - 2];
        const textArea = document.getElementsByClassName('text-area')[0];
        this.InputSpecialKeys(keyCode, textArea);
        if (keyCode !== 'CapsLock') {
          event.target.classList.add('active');
        }
        if (Array.from(key.classList).includes('ControlLeft')) this.languageFlag = true;
        textArea.setSelectionRange(this.positionCursor, this.positionCursor);
      });
      key.addEventListener('mouseup', (event) => {
        if (event.target.classList[event.target.classList.length - 2] === 'ShiftRight' || event.target.classList[event.target.classList.length - 2] === 'ShiftLeft') {
          this.shiftFlag = false;
          this.updateKeyboard();
        }
        if ((Array.from(event.target.classList).includes('AltLeft') || Array.from(event.target.classList).includes('AltRight')) && this.languageFlag === true) {
          this.languageFlag = false;
          this.changeLanguage();
        }
        if (event.target.classList[event.target.classList.length - 2] !== 'CapsLock') {
          event.target.classList.remove('active');
        }
      });
    });
  }

  listenPhysicalKeyboard() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      const activeCode = event.code;
      const activeElement = document.querySelector(`.${activeCode}`);
      const textArea = document.querySelector('.text-area');
      if (!this.specialCodes.includes(activeCode)) {
        activeElement.classList.add('active');
        let text = event.key;
        if (this.shiftFlag && !this.capsFlag) {
          text = this.userLanguage[this.currentLanguage]
            .shift[this.keyboardCodes.indexOf(event.code)];
        } else if (this.shiftFlag && this.capsFlag) {
          text = this.userLanguage[this.currentLanguage]
            .shift[this.keyboardCodes.indexOf(event.code)].toLowerCase();
        } else if (this.capsFlag) {
          text = event.key.toUpperCase();
        }
        this.addText(text);
      }
      this.InputSpecialKeys(activeCode, textArea);
      if (this.specialCodes.includes(activeCode)) {
        if (activeCode !== 'CapsLock') {
          activeElement.classList.add('active');
        }
        if (activeCode === 'ControlLeft') {
          this.languageFlag = true;
        }
      }
      textArea.setSelectionRange(this.positionCursor, this.positionCursor);
    }, false);

    window.addEventListener('keyup', (event) => {
      const activeCode = event.code;
      if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
        this.shiftFlag = false;
        this.updateKeyboard();
      }
      if ((activeCode === 'AltLeft' || activeCode === 'AltRight') && this.languageFlag === true) {
        this.languageFlag = false;
        this.changeLanguage();
      }
      if (activeCode !== 'CapsLock') {
        const activeElement = document.querySelector(`.${activeCode}`);
        activeElement.classList.remove('active');
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.initLanguage();
  keyboard.initPage();
  keyboard.listenVirtualKeyboard();
  keyboard.listenPhysicalKeyboard();
});

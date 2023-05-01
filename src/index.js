import './index.html'
import './index.scss'


const keyboardLettersEn = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl'],
];
const specialLetters = ['Backspace','Tab', 'Del', 'Caps Lock', 'Enter', 'Shift', 'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '◄', '▼', '►', '▲']
function findSpecialClass(key, index){
  let flag = false;
  let className = null;
  if (key === 'Enter'){
    flag = true;
    className = 'enter';
  }
  else if (key === 'Shift'){
    if (index === 0){
      flag = true;
      className = 'shiftLft';
    }
    else{
      flag = true;
      className = 'shiftRgt';
    }
  }
  else if (key === 'Caps Lock'){
    flag = true;
    className = 'caps';
  }
  else if (key === 'Backspace'){
    flag = true;
    className = 'backspace';
  }
  else if (key === 'Space'){
    flag = true;
    className = 'space';
  }
  else if (key === 'Tab'){
    flag = true;
    className = 'tab';
  }
  return {
    flag: flag,
    class: className,
  }
}
function createKeys(row){
  const keys = keyboardLettersEn[row];
  const keyRow = [];
  keys.forEach((key, index)=>{
    const keyElement = document.createElement('button');
    keyElement.classList.add('keyboard__key');
    keyElement.textContent=key;
    if (specialLetters.includes(key)){
      keyElement.classList.add('keyboard__key_special');
    }
    else{
      keyElement.classList.add('keyboard__key_classic');
    }
    keyRow.push(keyElement);
    let isSpecialClass = findSpecialClass(key, index);
    if (isSpecialClass.flag){
      keyElement.classList.add(isSpecialClass.class);
    }
  })
  return keyRow;
}
function initKeyboardLayout(){
  const keyboardRows = [];
  for (let i = 0; i < 5; i++){
    const row = document.createElement('div');
    row.classList.add('keyboard__row');
    const keys = createKeys(i);
    row.append(...keys);
    keyboardRows.push(row);
  }
  return keyboardRows
}
function initPage() {
  const body = document.querySelector('body');
  body.classList.add('page');
  const wrapper = document.createElement('div');
  wrapper.classList.add("wrapper");
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

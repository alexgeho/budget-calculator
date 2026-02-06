// @ts-nocheck

import './style.css';

let myData = [];
 

const input = document.querySelector('#addItem')
const writeBtn = document.querySelector('#write')
const readBtn = document.querySelector('#read')

readBtn?.addEventListener('click', readFromLocalStorage)

input?.addEventListener('keydown', checkInputConfirm);

function checkInputConfirm(e) {

const ENTER_KEYCODE = 13;

  if (!e.keyCode === ENTER_KEYCODE) {
    return;
  } else {
    console.log('Yeeeei');
    
  }

myData.push(input.value)

console.log(myData);

saveToLocalStorage();
}

function saveToLocalStorage(params:type) {
  const stringified = JSON.stringify(myData)

localStorage.setItem('mySavedStuff', stringified)  
console.log('Data saved');

}


function readFromLocalStorage() {
const savedValue = localStorage.getItem('mySavedStuff');

myData = JSON.parse(savedValue);

console.log('myData är nu', myData);

}





/* HIDE TAGS */

function toggleTagsHide(hide: boolean) {
  document.querySelectorAll('form, section, header, footer').forEach(el => {
    (el as HTMLElement).hidden = hide;
  });
}

toggleTagsHide(true);

/* HIDE TAGS */




/* BUTTON SUBMIT */
const registerBtn = document.querySelector('#register');
registerBtn.addEventListener('click', registerExpense);

function registerExpense(e) {
  e.preventDefault();

  console.log('registrera belopp och text i en array');

}



/* DELETE BUTTON */
document.addEventListener('click', deleteRow);

function deleteRow(e: Event) {
  const target = e.target as HTMLElement;

  if (!target.classList.contains('delete-row')) return;

  target.closest('.row').remove();
}
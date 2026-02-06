// @ts-nocheck

import './style.css';


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
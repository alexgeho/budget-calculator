import './style.css';

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains('delete-row')) {
    target.closest('.row')?.remove();
  }
});
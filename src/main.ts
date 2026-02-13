import './style.css'


let budgetPosters: Itransaction[] = [];

interface Itransaction {
  descrition: string;
  amount: number;
  type: 'expence' | 'income';
}

const form = document.querySelector('form')

form?.addEventListener('submit', saveToStorage)

function saveToStorage(e: SubmitEvent) {
  e.preventDefault()

  const description = document.querySelector<HTMLInputElement>('#desc')
  const amount = document.querySelector<HTMLInputElement>('#amount')
  const type = document.querySelector<HTMLInputElement>('input[name="type"]:checked')

  if (!description || !amount || !type) {
    return
  }

  const descriptionValue = description.value.trim()
  const amountValue = Number(amount.value)
  const typeValue = type.value as 'expence' | 'income';

  if (!descriptionValue || amountValue <= 0) {
    return
  }

  const budgetPoster: Itransaction = {
    descrition: descriptionValue,
    amount: amountValue,
    type: typeValue
  }


budgetPosters.push(budgetPoster)

if (budgetPosters) {
  console.log('budgetPosters::::', budgetPosters);

}

}









// if (descrition) {
//   descrition.innerHTML = 'Hello brother'
// }


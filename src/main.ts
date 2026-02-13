import './style.css'


let budgetPosters: Itransaction[] = [];

interface Itransaction {
  descrition: string;
  amount: number;
  type: 'expence' | 'income';
}

const form = document.querySelector('form')
const transactionsContainer = document.querySelector<HTMLDivElement>('#budgetItemsList')


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

// descriptionValue.value = '' 
// amountValue.value = ''

 render()

}

function render () {
  if (!transactionsContainer) return

  transactionsContainer.innerHTML = ``

  budgetPosters.forEach(post => {
    const div = document.createElement('div')
    div.textContent = `${post.descrition} - ${post.amount} (${post.type})`
    transactionsContainer.appendChild(div)
  })

}




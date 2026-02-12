import categories from './categories.json'
import './SCSS/style.scss'
import { calculateBalance } from './logic'
import { load, save } from './storage'

interface Itransaction {
  id: string
  text?: string
  amount: number
  category?: string
  type: 'income' | 'expense'
}

// DOM
const form = document.querySelector('#form') as HTMLFormElement
const list = document.querySelector('#list') as HTMLUListElement
const balanceEl = document.querySelector('#balance') as HTMLElement
const categorySelect = document.querySelector('#category') as HTMLSelectElement

// state
let transactions: Itransaction[] = load()

// select categories 
categories.forEach(cat => {
  const option = document.createElement('option')
  option.value = cat
  option.textContent = cat
  categorySelect.appendChild(option)
})

function render() {
  list.innerHTML = ''

  transactions.forEach(t => {
    const li = document.createElement('li')

    li.innerHTML = `
      ${t.text} ${t.category} ${t.amount} kr
      <button>X</button>
    ` 

    li.querySelector('button')!.onclick = () => {
      transactions = transactions.filter(item => item.id !== t.id)
      save(transactions)
      render()
    }

    list.appendChild(li)
  })

  
  const balance = calculateBalance(transactions)
  balanceEl.textContent = `Balance: ${balance} kr`
  balanceEl.style.color = balance >= 0 ? 'green' : 'red'
}

form.onsubmit = e => {
  e.preventDefault()

  const data = new FormData(form)

  const transaction: Itransaction = {
    id: crypto.randomUUID(),
    text: String(data.get('text')),
    amount: Number(data.get('amount')),
    category: String(data.get('category')),
    type: data.get('type') as 'income' | 'expense'
  }

  transactions.push(transaction)
  save(transactions)
  form.reset()
  render()
}

render()


/* DELETE ALL */

const resetBtn = document.querySelector('#reset') as HTMLButtonElement

resetBtn.onclick = () => {
  if (!confirm('Vill du ta bort alla transaktioner?')) return

  transactions = []
  save(transactions)
  render()
}
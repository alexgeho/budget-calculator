import './style.css'

// ---------------------------
// Data layer
// Array that stores all transactions in memory
// ---------------------------
interface Itransaction {
  description: string
  amount: number
  type: 'expense' | 'income'
}

let budgetPosters: Itransaction[] = []

// ---------------------------
// DOM references
// ---------------------------
const form = document.querySelector<HTMLFormElement>('form')
const transactionsContainer = document.querySelector<HTMLDivElement>('#budgetItemsList')
const balanceElement = document.querySelector<HTMLDivElement>('#balance')

// Attach submit event to form
form?.addEventListener('submit', saveToStorage)

// ---------------------------
// Handle form submission
// ---------------------------
function saveToStorage(e: SubmitEvent) {
  e.preventDefault()

  const descriptionInput = document.querySelector<HTMLInputElement>('#desc')
  const amountInput = document.querySelector<HTMLInputElement>('#amount')
  const typeInput = document.querySelector<HTMLInputElement>('input[name="type"]:checked')

  if (!descriptionInput || !amountInput || !typeInput) return

  const descriptionValue = descriptionInput.value.trim()
  const amountValue = Number(amountInput.value)
  const typeValue = typeInput.value as 'expense' | 'income'

  if (!descriptionValue || amountValue <= 0) return

  const transaction: Itransaction = {
    description: descriptionValue,
    amount: amountValue,
    type: typeValue
  }

  budgetPosters.push(transaction)

  render()
  calculateBalance()

  form?.reset()
}

// ---------------------------
// Render transactions to DOM
// ---------------------------
function render() {
  if (!transactionsContainer) return

  transactionsContainer.innerHTML = ''

  budgetPosters.forEach((post, index) => {
    const div = document.createElement('div')
    div.classList.add('transaction')

    const text = document.createElement('span')
    text.textContent = `${post.description} - ${post.amount} (${post.type})`

    const btn = document.createElement('button')
    btn.textContent = 'X'
    btn.classList.add('text-red-500')

    // Delete logic
    btn.addEventListener('click', () => {
      budgetPosters.splice(index, 1)
      render()
      calculateBalance()
    })

    div.appendChild(text)
    div.appendChild(btn)

    transactionsContainer.appendChild(div)
  })
}

// ---------------------------
// Calculate and display balance
// ---------------------------
function calculateBalance() {
  let balance = 0

  budgetPosters.forEach(post => {
    if (post.type === 'income') {
      balance += post.amount
    } else {
      balance -= post.amount
    }
  })

  if (!balanceElement) return

  balanceElement.textContent = `Balance: ${balance}`

  balanceElement.classList.remove('text-green-500', 'text-red-500')

  if (balance > 0) {
    balanceElement.classList.add('text-green-500')
  } else if (balance < 0) {
    balanceElement.classList.add('text-red-500')
  }
}
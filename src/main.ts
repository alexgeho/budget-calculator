import './style.css'
import categories from './categories.json'

// ---------------------------
// Data layer
// Array that stores all transactions in memory
// ---------------------------
interface Itransaction {
  description: string
  amount: number
  type: 'expense' | 'income'
  category: string

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
  const categorySelect = document.querySelector<HTMLSelectElement>('#category')

  if (!descriptionInput || !amountInput || !typeInput || !categorySelect) return

  const descriptionValue = descriptionInput.value.trim()
  const amountValue = Number(amountInput.value)
  const typeValue = typeInput.value as 'expense' | 'income'
  const categoryValue = categorySelect.value

  if (!descriptionValue || amountValue <= 0) return

  const transaction: Itransaction = {
    description: descriptionValue,
    amount: amountValue,
    type: typeValue,
    category: categoryValue
  }

  budgetPosters.push(transaction)

  saveToLocalStorage()
  render()
  calculateBalance()

  form?.reset()
}

// ---------------------------
// Render transactions to DOM
// ---------------------------

// ---------------------------
// Render transactions to DOM
// ---------------------------
function render(): void {
  if (!transactionsContainer) return

  // 1. Clear previous content
  transactionsContainer.innerHTML = ''

  // 2. Loop through all transactions
  budgetPosters.forEach(createTransactionRow)
}

// ---------------------------
// Create one transaction row
// ---------------------------
function createTransactionRow(post: Itransaction, index: number): void {
  if (!transactionsContainer) return

  // 1. Create container div
  const div = document.createElement('div')
  div.classList.add('transaction')

  // 2. Create text element
  const text = document.createElement('span')
  text.textContent =
    `${post.description} - ${post.amount} (${post.type}) [${post.category}]`

  // 3. Create delete button
  const btn = document.createElement('button')
  btn.textContent = 'X'
  btn.classList.add('text-red-500')

  // 4. Attach delete handler
  btn.addEventListener('click', function handleDeleteClick() {
    deleteTransaction(index)
  })

  // 5. Append elements to row
  div.appendChild(text)
  div.appendChild(btn)

  // 6. Append row to container
  transactionsContainer.appendChild(div)
}

// ---------------------------
// Delete transaction logic
// ---------------------------
function deleteTransaction(index: number): void {
  // 1. Remove item from array
  budgetPosters.splice(index, 1)

  // 2. Update localStorage
  saveToLocalStorage()

  // 3. Re-render UI
  render()
  calculateBalance()
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

/* SAVE TO LOCAL STORAGE */
function saveToLocalStorage() {
  localStorage.setItem('budget', JSON.stringify(budgetPosters))
}

/* LOAD FROM LOCAL STORAGE */

function loadFromLocalStorage() {
  const data = localStorage.getItem('budget')

  if (!data) return

  budgetPosters = JSON.parse(data)

  render()
  calculateBalance()
}

loadFromLocalStorage()
renderCategories()


/* RENDER CATEGORIES */

function renderCategories() {
  const select = document.querySelector<HTMLSelectElement>('#category')
  if (!select) return

  categories.forEach(cat => {
    const option = document.createElement('option')
    option.value = cat
    option.textContent = cat
    select.appendChild(option)
  })
}
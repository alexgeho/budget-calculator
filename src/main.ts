import './style.css'

// ---------------------------
// Data layer
// Array that stores all transactions in memory
// ---------------------------
let budgetPosters: Itransaction[] = []

// Type definition for one transaction object
interface Itransaction {
  descrition: string
  amount: number
  type: 'expence' | 'income'
}

// ---------------------------
// DOM references
// ---------------------------
const form = document.querySelector('form')
const transactionsContainer = document.querySelector<HTMLDivElement>('#budgetItemsList')

// Attach submit event to form
form?.addEventListener('submit', saveToStorage)

// ---------------------------
// Handle form submission
// ---------------------------
function saveToStorage(e: SubmitEvent) {
  e.preventDefault() // Prevent page reload

  // Get form inputs
  const description = document.querySelector<HTMLInputElement>('#desc')
  const amount = document.querySelector<HTMLInputElement>('#amount')
  const type = document.querySelector<HTMLInputElement>('input[name="type"]:checked')

  // Safety check – ensure elements exist
  if (!description || !amount || !type) {
    return
  }

  // Extract and clean input values
  const descriptionValue = description.value.trim()
  const amountValue = Number(amount.value)
  const typeValue = type.value as 'expence' | 'income'

  // Validation – prevent empty description or invalid amount
  if (!descriptionValue || amountValue <= 0) {
    return
  }

  // Create transaction object
  const budgetPoster: Itransaction = {
    descrition: descriptionValue,
    amount: amountValue,
    type: typeValue
  }

  // Add transaction to array
  budgetPosters.push(budgetPoster)

  // Re-render UI after data change
  render()
  calculateBalance()
}

// ---------------------------
// Render transactions to DOM
// ---------------------------
function render() {
  if (!transactionsContainer) return

  // Clear existing list
  transactionsContainer.innerHTML = ``

  // Loop through array and create DOM elements
  budgetPosters.forEach(post => {
    const div = document.createElement('div')
    div.textContent = `${post.descrition} - ${post.amount} (${post.type})`
    transactionsContainer.appendChild(div)
  })
}

/* CALCULATE */

function calculateBalance() {

  let balanca = 0

  budgetPosters.forEach(post => {


    if (post.type === 'income') {
      balanca += post.amount
    } else {
      balanca -= post.amount
    }
    console.log('balance::::', balanca);

    /* BALANCE TO DOM */

    const balanceElement = document.querySelector('#balance')
    balanceElement.textContent = `Balace: ${balanca}`
  }

  )
}

console.log('budgetPosters::::', budgetPosters);

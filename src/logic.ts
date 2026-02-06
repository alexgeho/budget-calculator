export function calculateBalance(items: any[]) {
  return items.reduce((sum, i) => {
    return i.type === 'income' ? sum + i.amount : sum - i.amount
  }, 0)
}
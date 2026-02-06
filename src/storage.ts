const KEY = 'transactions'

export function load() {
  return JSON.parse(localStorage.getItem(KEY) || '[]')
}

export function save(data: any[]) {
  localStorage.setItem(KEY, JSON.stringify(data))
}
export async function loadTransactions() {
  const response = await fetch('http://localhost:3000/transactions')
  const data = await response.json()
  return data
}
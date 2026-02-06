import { child, get, push, ref, remove, set, update } from "firebase/database";

import { firebaseDb } from "./firebase";

function toDbExpense(expenseData) {
  return {
    amount: expenseData.amount,
    date:
      expenseData.date instanceof Date
        ? expenseData.date.toISOString()
        : expenseData.date,
    description: expenseData.description,
  };
}

export async function storeExpense(expenseData) {
  const newExpenseRef = push(ref(firebaseDb, "expenses"));
  await set(newExpenseRef, toDbExpense(expenseData));
  return newExpenseRef.key;
}

export async function fetchExpenses() {
  const dbRef = ref(firebaseDb);
  const snapshot = await get(child(dbRef, "expenses"));

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();
  const expenses = [];

  for (const key in data) {
    expenses.push({
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
    });
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return update(ref(firebaseDb, `expenses/${id}`), toDbExpense(expenseData));
}

export function deleteExpense(id) {
  return remove(ref(firebaseDb, `expenses/${id}`));
}

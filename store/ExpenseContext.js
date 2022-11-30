import { useReducer } from "react";
import { createContext } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 55.99,
    date: new Date("2021-12-18"),
  },
  {
    id: "e2",
    description: "A ham sandwich",
    amount: 4.99,
    date: new Date("2021-12-21"),
  },
  {
    id: "e3",
    description: "A crowbar",
    amount: 21.78,
    date: new Date("2021-12-24"),
  },
  {
    id: "e4",
    description: "New window",
    amount: 65.99,
    date: new Date("2021-12-24"),
  },
  {
    id: "e5",
    description: "Butterfly Collection",
    amount: 1999.99,
    date: new Date("2023-05-13"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 55.99,
    date: new Date("2021-12-18"),
  },
  {
    id: "e7",
    description: "A ham sandwich",
    amount: 4.99,
    date: new Date("2021-12-21"),
  },
  {
    id: "e8",
    description: "A crowbar",
    amount: 21.78,
    date: new Date("2021-12-24"),
  },
  {
    id: "e9",
    description: "New window",
    amount: 65.99,
    date: new Date("2021-12-24"),
  },
  {
    id: "e10",
    description: "Butterfly Collection",
    amount: 1999.99,
    date: new Date("2023-05-13"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;

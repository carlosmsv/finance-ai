import { TransactionType } from "@prisma/client"

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Expense",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Deposit",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investment",
  },
]

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: "HOUSING",
    label: "Housing",
  },
  {
    value: "TRANSPORTATION",
    label: "Transportation",
  },
  {
    value: "FOOD",
    label: "Food",
  },
  {
    value: "ENTERTAINMENT",
    label: "Entertainment",
  },
  {
    value: "HEALTH",
    label: "Health",
  },
  {
    value: "UTILITY",
    label: "Utility",
  },
  {
    value: "SALARY",
    label: "Salary",
  },
  {
    value: "EDUCATION",
    label: "Education",
  },
  {
    value: "OTHER",
    label: "Other",
  },
]

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: "CREDIT_CARD",
    label: "Credit Card",
  },
  {
    value: "DEBIT_CARD",
    label: "Debit Card",
  },
  {
    value: "BANK_TRANSFER",
    label: "Bank Transfer",
  },
  {
    value: "BANK_SLIP",
    label: "Bank Slip",
  },
  {
    value: "CASH",
    label: "Cash",
  },
  {
    value: "PIX",
    label: "Pix",
  },
  {
    value: "OTHER",
    label: "Other",
  },
]

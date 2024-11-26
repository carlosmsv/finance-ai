import { TransactionCategory, TransactionType } from "@prisma/client"

export type TransactionPercentageByType = {
  [key in TransactionType]: number
}
export interface TotalExpenseByCategory {
  category: TransactionCategory
  totalAmount: number
  percentageOfTotal: number
}

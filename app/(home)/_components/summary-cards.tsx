import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"
import SummaryCard from "./summary-card"
import { db } from "@/app/_lib/prisma"

interface SummaryCardsProps {
  month: string
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  }
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  )
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  )
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  )
  const balance = depositsTotal - investmentsTotal - expensesTotal
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Balance"
        amount={balance}
        size={"large"}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={14} />}
          title="Invested"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={14} className="text-primary" />}
          title="Deposits"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={14} className="text-red-500" />}
          title="Expenses"
          amount={expensesTotal}
        />
      </div>
    </div>
  )
}

export default SummaryCards

"use client"

import { Pie, PieChart } from "recharts"

import { Card, CardContent } from "@/app/_components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart"
import { TransactionType } from "@prisma/client"
import { TransactionPercentageByType } from "@/app/_data/get-dashboard/types"
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import PercentageItem from "./percentage-item"

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investments",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Deposit",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Expenses",
    color: "#E93030",
  },
} satisfies ChartConfig

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentageByType
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
}

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ]
  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Deposits"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Expenses"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investments"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionsPieChart

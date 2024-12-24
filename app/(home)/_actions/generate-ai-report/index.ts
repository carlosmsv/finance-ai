"use server"

import { db } from "@/app/_lib/prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"
import OpenAI from "openai"
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema"

const DUMMY_REPORT =
  '### Personal Finance Report\n\n#### General Finance Summary\nThe listed transactions were analyzed, and the following insights were extracted to provide a better understanding of your finances:\n\n- **Total expenses:** $19,497.56\n- **Total investments:** $14,141.47\n- **Total deposits/checking:** $10,100.00 (including salary deposits and others)\n- **Highest expense category:** Food\n\n#### Category Analysis\n\n1. **Food:** $853.76\n2. **Transportation:** $144.05\n3. **Entertainment:** $143.94\n4. **Other expenses:** $17,828.28 (includes categories like health, education, housing)\n\n#### Trends and Insights\n- **High Food Expenses:** The food category represents a significant portion of your expenses, totaling $853.76 over the past months. It is important to monitor this category to seek savings.\n\n- **Variable Expenses:** Other types of expenses, like entertainment and transportation, also accumulate over the month. Identifying days with higher spending could help reduce costs.\n\n- **Investments:** You have made significant investments amounting to $14,141.47. This is a good sign for building wealth and increasing financial security in the future.\n\n- **Expense Categorization:** There are several expenses listed as "OTHER" that could be reassessed. Classifying these expenses can provide better financial control.\n\n#### Tips to Improve Your Financial Life\n\n1. **Create a Monthly Budget:** Set a spending limit for each category. This helps avoid overspending in areas like food and entertainment.\n\n2. **Reduce Food Expenses:** Consider cooking at home more often, planning meals, and using shopping lists to avoid impulse purchases.\n\n3. **Review Recurring Expenses:** Look into your fixed expenses (such as health and education) to check if they fit your needs and see if there’s room for reduction.\n\n4. **Set Savings Goals:** Based on your deposits and investments, establish specific goals to save a percentage of your monthly income. Estimating how much you can save can help build an emergency fund.\n\n5. **Cut Back on Entertainment Costs:** Plan leisure activities within your budget and look for free or low-cost options. Remember, entertainment can also be done at home.\n\n6. **Reassess Your Investments:** Ensure your investments align with your short- and long-term financial goals. Research alternatives that may offer better returns.\n\n7. **Track Your Finances Regularly:** Use financial management apps to monitor your expenses and income, keeping you informed about your financial health.\n\n#### Conclusion\nImproving your financial life is an ongoing process involving planning, monitoring, and regular adjustments. With the above analysis and suggestions, you can start making more strategic financial decisions to achieve your goals. Remember, every dollar saved is a step closer to financial security!'

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month })
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }
  const client = await clerkClient()

  const user = await client.users.getUser(userId)

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium"
  if (!hasPremiumPlan) {
    throw new Error("You need a premium plan to generate AI reports")
  }
  if (!process.env.OPENAI_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return DUMMY_REPORT
  }
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  // Fetch transactions for the given month
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  })
  // Send the transactions to ChatGPT and ask it to generate a report with insights
  const content = `Generate a report with insights about my finances, along with tips and guidance on how to improve my financial life. Transactions are separated by semicolons. Each structure is {DATE}-{TYPE}-{AMOUNT}-{CATEGORY}. They are:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("en-US")}-\$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`
  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert in personal finance management and organization. You help people better organize their finances.",
      },
      {
        role: "user",
        content,
      },
    ],
  })
  // Return the generated report from ChatGPT to the user
  return completion.choices[0].message.content
}

"use client"

import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { BotIcon, Loader2Icon } from "lucide-react"
import { generateAiReport } from "../_actions/generate-ai-report"
import { useState } from "react"
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import Markdown from "react-markdown"

interface AiReportButtonProps {
  month: string
}

const AiReportButton = ({ month }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null)
  const [reportIsLoading, setReportIsLoading] = useState(false)

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true)
      const aiReport = await generateAiReport({ month })
      console.log({ aiReport })
      setReport(aiReport)
    } catch (error) {
      console.error(error)
    } finally {
      setReportIsLoading(false)
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          AI Report
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>AI Report</DialogTitle>
          <DialogDescription>
            Use artificial intelligence to generate a report with insights into
            your finances.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleGenerateReportClick}
            disabled={reportIsLoading}
          >
            {reportIsLoading && <Loader2Icon className="animate-spin" />}
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AiReportButton

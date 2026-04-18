'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface MonthFilterProps {
  month: number
  year: number
}

export default function MonthFilter({ month, year }: MonthFilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  function navigate(delta: number) {
    const date = new Date(year, month - 1 + delta, 1)
    const m = date.getMonth() + 1
    const y = date.getFullYear()
    router.push(`${pathname}?month=${m}&year=${y}`)
  }

  const label = format(new Date(year, month - 1, 1), 'MMMM yyyy', { locale: ptBR })

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-sm">
      <Button variant="ghost" size="icon" className="h-8 w-8 dark:hover:bg-slate-800" onClick={() => navigate(-1)}>
        <ChevronLeft className="w-4 h-4 dark:text-slate-300" />
      </Button>
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize w-36 text-center">{label}</span>
      <Button variant="ghost" size="icon" className="h-8 w-8 dark:hover:bg-slate-800" onClick={() => navigate(1)}>
        <ChevronRight className="w-4 h-4 dark:text-slate-300" />
      </Button>
    </div>
  )
}

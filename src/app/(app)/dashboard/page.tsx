import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Transaction } from '@/types'
import SummaryCards from '@/components/SummaryCards'
import CategoryChart from '@/components/CategoryChart'
import MonthlyChart from '@/components/MonthlyChart'
import RecentTransactions from '@/components/RecentTransactions'
import MonthFilter from '@/components/MonthFilter'

interface PageProps {
  searchParams: Promise<{ month?: string; year?: string }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const params = await searchParams
  const now = new Date()
  const month = params.month ? parseInt(params.month) : now.getMonth() + 1
  const year = params.year ? parseInt(params.year) : now.getFullYear()

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = new Date(year, month, 0)
  const endDateStr = `${year}-${String(month).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDateStr)
    .order('date', { ascending: false })

  const { data: allTransactions } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })

  const txs: Transaction[] = transactions || []
  const allTxs: Transaction[] = allTransactions || []

  const receitas = txs.filter(t => t.type === 'receita').reduce((s, t) => s + t.amount, 0)
  const despesas = txs.filter(t => t.type === 'despesa').reduce((s, t) => s + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Resumo financeiro do período selecionado</p>
        </div>
        <MonthFilter month={month} year={year} />
      </div>

      <SummaryCards receitas={receitas} despesas={despesas} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryChart transactions={txs} />
        <MonthlyChart transactions={allTxs} />
      </div>

      <RecentTransactions transactions={txs.slice(0, 5)} />
    </div>
  )
}

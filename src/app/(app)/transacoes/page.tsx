import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Transaction } from '@/types'
import TransacoesClient from './TransacoesClient'

export default async function TransacoesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })

  const transactions: Transaction[] = data || []

  return <TransacoesClient initialTransactions={transactions} />
}

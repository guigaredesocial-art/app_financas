'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Transaction } from '@/types'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface MonthlyChartProps {
  transactions: Transaction[]
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default function MonthlyChart({ transactions }: MonthlyChartProps) {
  const monthly = transactions.reduce<Record<string, { receitas: number; despesas: number }>>((acc, t) => {
    const month = t.date.substring(0, 7)
    if (!acc[month]) acc[month] = { receitas: 0, despesas: 0 }
    if (t.type === 'receita') acc[month].receitas += t.amount
    else acc[month].despesas += t.amount
    return acc
  }, {})

  const data = Object.entries(monthly)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, values]) => ({
      name: format(parseISO(month + '-01'), 'MMM/yy', { locale: ptBR }),
      Receitas: values.receitas,
      Despesas: values.despesas,
    }))

  if (data.length === 0) {
    return (
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-700">Histórico Mensal</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48 text-slate-400 text-sm">
          Sem dados para exibir
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-700">Histórico Mensal (últimos 6 meses)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              tickFormatter={(v: number) => `R$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) => [formatCurrency(Number(value))]}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend formatter={(value: string) => <span className="text-sm text-slate-600">{value}</span>} />
            <Bar dataKey="Receitas" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

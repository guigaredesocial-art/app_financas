import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

interface SummaryCardsProps {
  receitas: number
  despesas: number
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default function SummaryCards({ receitas, despesas }: SummaryCardsProps) {
  const saldo = receitas - despesas

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Receitas</CardTitle>
          <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(receitas)}</p>
          <p className="text-xs text-slate-400 mt-1">Total no período</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Despesas</CardTitle>
          <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(despesas)}</p>
          <p className="text-xs text-slate-400 mt-1">Total no período</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Saldo</CardTitle>
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${saldo >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
            <Wallet className={`w-5 h-5 ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
          </div>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {formatCurrency(saldo)}
          </p>
          <p className="text-xs text-slate-400 mt-1">{saldo >= 0 ? 'Saldo positivo' : 'Saldo negativo'}</p>
        </CardContent>
      </Card>
    </div>
  )
}

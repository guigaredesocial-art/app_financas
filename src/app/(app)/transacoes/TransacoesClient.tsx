'use client'

import { useState, useMemo } from 'react'
import { Transaction, CATEGORIES, CATEGORY_COLORS, Category } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import TransactionModal from '@/components/TransactionModal'
import DeleteConfirmModal from '@/components/DeleteConfirmModal'
import { Plus, Search, Download, Pencil, Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TransacoesClientProps {
  initialTransactions: Transaction[]
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function TransacoesClient({ initialTransactions }: TransacoesClientProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [monthFilter, setMonthFilter] = useState<string>('all')
  const [yearFilter, setYearFilter] = useState<string>('all')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const now = new Date()
  const years = Array.from(new Set(transactions.map(t => t.date.substring(0, 4))))
    .sort((a, b) => b.localeCompare(a))
  if (!years.includes(String(now.getFullYear()))) years.unshift(String(now.getFullYear()))

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase())
      const matchCategory = categoryFilter === 'all' || t.category === categoryFilter
      const matchType = typeFilter === 'all' || t.type === typeFilter
      const matchMonth = monthFilter === 'all' || t.date.substring(5, 7) === String(monthFilter).padStart(2, '0')
      const matchYear = yearFilter === 'all' || t.date.substring(0, 4) === yearFilter
      return matchSearch && matchCategory && matchType && matchMonth && matchYear
    })
  }, [transactions, search, categoryFilter, typeFilter, monthFilter, yearFilter])

  const totalReceitas = filtered.filter(t => t.type === 'receita').reduce((s, t) => s + t.amount, 0)
  const totalDespesas = filtered.filter(t => t.type === 'despesa').reduce((s, t) => s + t.amount, 0)

  function handleNew() {
    setEditingTransaction(null)
    setModalOpen(true)
  }

  function handleEdit(t: Transaction) {
    setEditingTransaction(t)
    setModalOpen(true)
  }

  async function refreshTransactions() {
    const res = await fetch('/api/transactions')
    if (res.ok) {
      const data = await res.json()
      setTransactions(data)
    }
  }

  function exportCSV() {
    const headers = ['Data', 'Descrição', 'Tipo', 'Categoria', 'Valor']
    const rows = filtered.map(t => [
      t.date,
      `"${t.description}"`,
      t.type,
      t.category,
      t.amount.toFixed(2).replace('.', ','),
    ])
    const csv = [headers, ...rows].map(r => r.join(';')).join('\n')
    const bom = '\uFEFF'
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transacoes_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Transações</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{filtered.length} transação(ões) encontrada(s)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            <Download className="w-4 h-4" /> Exportar CSV
          </Button>
          <Button size="sm" onClick={handleNew} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Nova Transação
          </Button>
        </div>
      </div>

      {/* Mini Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="py-3 px-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Receitas</span>
            </div>
            <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">{formatCurrency(totalReceitas)}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="py-3 px-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Despesas</span>
            </div>
            <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">{formatCurrency(totalDespesas)}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm col-span-2 sm:col-span-1 bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="py-3 px-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Saldo filtrado</span>
            </div>
            <p className={`text-lg font-bold mt-1 ${totalReceitas - totalDespesas >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
              {formatCurrency(totalReceitas - totalDespesas)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <Input
                placeholder="Buscar por descrição..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={v => setTypeFilter(v ?? 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="receita">Receitas</SelectItem>
                <SelectItem value="despesa">Despesas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={v => setCategoryFilter(v ?? 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Select value={monthFilter} onValueChange={v => setMonthFilter(v ?? 'all')}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo mês</SelectItem>
                  {MONTHS.map((m, i) => (
                    <SelectItem key={i} value={String(i + 1)}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={yearFilter} onValueChange={v => setYearFilter(v ?? 'all')}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 dark:text-slate-500">
              <p className="text-lg font-medium">Nenhuma transação encontrada</p>
              <p className="text-sm mt-1">Tente ajustar os filtros ou adicione uma nova transação</p>
              <Button onClick={handleNew} className="mt-4 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" /> Nova Transação
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map(t => (
                <div key={t.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[t.category as Category] || '#6b7280' }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{t.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {format(parseISO(t.date), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <Badge variant="outline" className="text-xs py-0 px-1.5 dark:border-slate-700 dark:text-slate-400">{t.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <p className={`text-sm font-semibold ${t.type === 'receita' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {t.type === 'receita' ? '+' : '-'}{formatCurrency(t.amount)}
                    </p>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(t)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(t.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={refreshTransactions}
        transaction={editingTransaction}
      />

      <DeleteConfirmModal
        open={!!deleteId}
        transactionId={deleteId}
        onClose={() => setDeleteId(null)}
        onDelete={refreshTransactions}
      />
    </div>
  )
}

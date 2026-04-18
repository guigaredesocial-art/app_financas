import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  TrendingUp,
  Shield,
  Smartphone,
  Download,
  CheckCircle,
  ArrowRight,
  Wallet,
  PieChart,
  Filter,
} from 'lucide-react'

const features = [
  {
    icon: Wallet,
    title: 'CRUD de Transações',
    desc: 'Registre receitas e despesas com descrição, valor, data e categoria em segundos.',
  },
  {
    icon: PieChart,
    title: 'Dashboard Visual',
    desc: 'Veja cards de resumo e gráficos interativos de categorias e histórico mensal.',
  },
  {
    icon: Filter,
    title: 'Filtros Avançados',
    desc: 'Filtre por mês, ano, categoria e tipo. Busque por descrição instantaneamente.',
  },
  {
    icon: Download,
    title: 'Exportar CSV',
    desc: 'Exporte suas transações filtradas em formato CSV para planilhas.',
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    desc: 'Seus dados são privados. Row Level Security garante que só você vê suas finanças.',
  },
  {
    icon: Smartphone,
    title: '100% Responsivo',
    desc: 'Use no celular, tablet ou desktop com a mesma experiência fluida.',
  },
]

const categories = ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Salário', 'Freelance', 'Outros']

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Header */}
      <header className="border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-lg">FinançasPessoais</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-300">Entrar</Button>
            </Link>
            <Link href="/cadastro">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Criar conta grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            100% gratuito · Sem cartão de crédito
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
            Controle suas finanças
            <span className="text-blue-600"> com simplicidade</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Registre receitas e despesas, visualize um dashboard completo com gráficos
            e tenha total controle do seu dinheiro em um só lugar.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-base px-8 gap-2 w-full sm:w-auto">
                Começar agora, é grátis <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-base px-8 w-full sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Tudo que você precisa</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">Ferramentas simples e poderosas para organizar suas finanças</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900 hover:shadow-md dark:hover:shadow-blue-950/30 transition-all group dark:bg-slate-900">
                <div className="w-11 h-11 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">9 categorias pré-definidas</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Organize suas transações de forma inteligente</p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <span
                key={cat}
                className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '100%', label: 'Gratuito' },
              { value: 'RLS', label: 'Dados protegidos' },
              { value: 'Mobile', label: 'Responsivo' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-bold text-white">{value}</p>
                <p className="text-blue-100 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Como funciona</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Crie sua conta', desc: 'Cadastro rápido com e-mail e senha. Comece em menos de 1 minuto.' },
              { step: '2', title: 'Registre transações', desc: 'Adicione receitas e despesas com descrição, valor, data e categoria.' },
              { step: '3', title: 'Acompanhe o dashboard', desc: 'Veja gráficos, cards de resumo e exporte relatórios em CSV.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Comece a controlar suas finanças hoje
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Gratuito, sem limite de transações, sem cartão de crédito.
          </p>
          <Link href="/cadastro">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-base px-8 gap-2">
              Criar conta grátis <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-blue-100 text-sm">
            {['Grátis para sempre', 'Dados seguros', 'Sem anúncios'].map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">FinançasPessoais</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Construído com Next.js · Supabase · shadcn/ui · Recharts
          </p>
        </div>
      </footer>
    </div>
  )
}

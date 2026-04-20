'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Loader2, CheckCircle, Mail, AlertTriangle, Inbox } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function CadastroPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    })

    if (error) {
      setError('Erro ao criar conta. Tente novamente.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4 transition-colors">
        <div className="fixed top-4 right-4">
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-md shadow-lg border-0 dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="pt-8 pb-8 space-y-5">
            {/* Ícone de sucesso */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Conta criada com sucesso!</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                Enviamos um e-mail de confirmação para:
              </p>
              <p className="font-semibold text-blue-700 dark:text-blue-400 mt-1 break-all">{email}</p>
            </div>

            {/* Passos para confirmar */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Como confirmar o cadastro:
              </p>
              <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                <li className="flex items-start gap-2">
                  <span className="font-bold flex-shrink-0">1.</span>
                  Abra sua caixa de entrada do e-mail <strong>{email}</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold flex-shrink-0">2.</span>
                  Procure um e-mail com o assunto <strong>&quot;Confirme seu cadastro&quot;</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold flex-shrink-0">3.</span>
                  Clique no botão de confirmação dentro do e-mail
                </li>
              </ol>
            </div>

            {/* Aviso de spam */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-300">
                <p className="font-semibold flex items-center gap-1">
                  <Inbox className="w-4 h-4" /> Não encontrou o e-mail?
                </p>
                <p className="mt-1">
                  Verifique também a pasta de <strong>Spam</strong> ou <strong>Lixo Eletrônico</strong> — às vezes o e-mail de confirmação pode cair por lá.
                </p>
              </div>
            </div>

            <Link href="/login" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Já confirmei, ir para o login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4 transition-colors">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">FinançasPessoais</span>
        </div>

        <Card className="shadow-lg border-0 dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center dark:text-slate-100">Criar conta</CardTitle>
            <CardDescription className="text-center dark:text-slate-400">
              Comece a organizar suas finanças hoje mesmo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Criando...</> : 'Criar conta grátis'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Entrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

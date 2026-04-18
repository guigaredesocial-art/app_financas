'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface DeleteConfirmModalProps {
  open: boolean
  transactionId: string | null
  onClose: () => void
  onDelete: () => void
}

export default function DeleteConfirmModal({ open, transactionId, onClose, onDelete }: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!transactionId) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from('transactions').delete().eq('id', transactionId)
    setLoading(false)
    onDelete()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Excluir transação?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-slate-500 mt-2">
          Esta ação não pode ser desfeita. A transação será removida permanentemente.
        </p>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancelar</Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Trash2 className="w-4 h-4 mr-2" />Excluir</>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import ScheduleForm from '@/components/schedule-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen p-10 space-y-6">
      <header className="flex">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Agendar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Item</DialogTitle>
              <DialogDescription>
                Preencha as informações abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <ScheduleForm />
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <section className="max-w-6xl grid grid-cols-3 justify-items-center gap-28">
        {[1, 2, 3].map((num) => (
          <Card key={num} className="w-80 h-36"></Card>
        ))}
      </section>
    </main>
  )
}

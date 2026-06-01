import React, { useState } from 'react'
import { Barber, Service, Appointment } from '../types'
import { DEFAULT_TIMES as TIMES } from '../data'

/*
  Modal para criação de um novo agendamento.

  Funcionalidades principais:
  - Preenche automaticamente `Duração` e `Valor` ao selecionar um serviço existente.
  - Permite criar um novo serviço "na hora" (botão "Criar Novo Serviço"), que
    é adicionado à lista e usado no agendamento.
  - Ao salvar, invoca `onSave` com o objeto `Appointment` montado.

  Observação: validações mínimas são aplicadas (ex.: conflito de horário é
  verificado no componente `Agenda` antes de inserir o agendamento).
*/

type Props = {
  visible: boolean
  onClose: () => void
  onSave: (a: Appointment) => void
  onDelete?: (id:string)=>void
  barbers: Barber[]
  services: Service[]
  onCreateService: (s: Service) => void
  date: string
  initial?: Appointment | null
}

export default function NewAppointmentModal({ visible, onClose, onSave, onDelete, barbers, services, onCreateService, date, initial = null }: Props) {
  const [clientName, setClientName] = useState('')
  const [phone, setPhone] = useState('')
  const [barberId, setBarberId] = useState(barbers[0]?.id ?? 1)
  const [startTime, setStartTime] = useState(TIMES[0])
  const [serviceId, setServiceId] = useState(services[0]?.id ?? -1)
  const [duration, setDuration] = useState(30)
  const [price, setPrice] = useState(0)
  const [notes, setNotes] = useState('')
  const [creatingService, setCreatingService] = useState(false)
  const [newServiceName, setNewServiceName] = useState('')
  const [newServiceDuration, setNewServiceDuration] = useState(30)
  const [newServicePrice, setNewServicePrice] = useState(0)

  React.useEffect(() => {
    const s = services.find(s => s.id === serviceId)
    if (s) {
      setDuration(s.duration)
      setPrice(s.price)
    }
  }, [serviceId])

  React.useEffect(()=>{
    if (initial) {
      setClientName(initial.clientName)
      setPhone(initial.phone ?? '')
      setBarberId(initial.barberId)
      setStartTime(initial.startTime)
      setDuration(initial.duration)
      setPrice(initial.price)
      setNotes(initial.notes ?? '')
    }
  }, [initial])

  if (!visible) return null

  function handleSave() {
    const id = initial?.id ?? String(Math.floor(Math.random() * 1000000))
    const serviceName = creatingService ? newServiceName : (services.find(s => s.id === serviceId)?.name ?? '')
    const appt: Appointment = {
      id: String(id),
      barberId: Number(barberId),
      clientName,
      phone,
      serviceName,
      startTime,
      duration: Number(duration),
      price: Number(price),
      notes,
      date
    }

    if (creatingService) {
      const sid = Math.floor(Math.random() * 1000000)
      const s = { id: sid, name: newServiceName, duration: Number(newServiceDuration), price: Number(newServicePrice) }
      onCreateService(s)
      appt.serviceName = s.name
      appt.duration = s.duration
      appt.price = s.price
    }

    onSave(appt)
    onClose()
  }

  function handleDelete(){
    if (!initial) return
    if (confirm('Excluir este agendamento?')){
      onDelete?.(String(initial.id))
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-[720px] max-w-full">
        <h2 className="text-lg font-semibold mb-4">Novo Agendamento</h2>
        <div className="grid grid-cols-2 gap-3">
          <input className="border p-2" placeholder="Cliente" value={clientName} onChange={e=>setClientName(e.target.value)} />
          <input className="border p-2" placeholder="Telefone" value={phone} onChange={e=>setPhone(e.target.value)} />
          <select className="border p-2" value={barberId} onChange={e=>setBarberId(Number(e.target.value))}>
            {barbers.map(b=> <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <input className="border p-2" value={date} readOnly />
          <select className="border p-2" value={startTime} onChange={e=>setStartTime(e.target.value)}>
            {TIMES.map(t=> <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="flex gap-2">
            <select className="border p-2 flex-1" value={serviceId} onChange={e=>setServiceId(Number(e.target.value))}>
              {services.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <button className="border p-2" onClick={()=>setCreatingService(v=>!v)}>{creatingService ? 'Cancelar' : 'Criar Novo Serviço'}</button>
          </div>
          {creatingService && (
            <div className="col-span-2 grid grid-cols-3 gap-2">
              <input className="border p-2" placeholder="Nome" value={newServiceName} onChange={e=>setNewServiceName(e.target.value)} />
              <input className="border p-2" placeholder="Duração (min)" type="number" value={newServiceDuration} onChange={e=>setNewServiceDuration(Number(e.target.value))} />
              <input className="border p-2" placeholder="Valor" type="number" value={newServicePrice} onChange={e=>setNewServicePrice(Number(e.target.value))} />
            </div>
          )}
          {!creatingService && (
            <>
              <input className="border p-2" placeholder="Duração (min)" type="number" value={duration} onChange={e=>setDuration(Number(e.target.value))} />
              <input className="border p-2" placeholder="Valor" type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} />
              <input className="border p-2" placeholder="Observação" value={notes} onChange={e=>setNotes(e.target.value)} />
            </>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          {initial && <button className="px-4 py-2 text-red-600" onClick={handleDelete}>Excluir</button>}
          <button className="px-4 py-2" onClick={onClose}>Cancelar</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>Salvar Agendamento</button>
        </div>
      </div>
    </div>
  )
}

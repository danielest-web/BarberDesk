/*
  Tipos TypeScript usados pela tela "Agenda Geral".

  - `Barber`: representa um barbeiro com `id` e `name`.
  - `Service`: representa um serviço pré-definido (nome, duração em minutos, preço).
  - `Appointment`: representa um agendamento salvo em memória/localStorage.

  Observação: os horários são strings no formato "HH:MM" e a `date` usa o formato
  ISO `YYYY-MM-DD`. A duração (`duration`) é expressa em minutos e determina
  quantos blocos de 30 minutos o agendamento ocupará.
*/

export type Barber = {
  id: number
  name: string
}

export type Service = {
  id: number
  name: string
  duration: number // minutes
  price: number
}

export type Appointment = {
  id: string
  barberId: number
  clientName: string
  phone?: string
  serviceName: string
  startTime: string // "08:30"
  duration: number
  price: number
  notes?: string
  date: string // YYYY-MM-DD
}

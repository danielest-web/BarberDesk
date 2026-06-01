/*
  Dados iniciais (fixos) usados pela Agenda Geral:

  - `DEFAULT_BARBERS`: lista inicial de barbeiros (cada barbeiro vira uma coluna).
  - `TIMES`: horários disponíveis em blocos de 30 minutos.
  - `DEFAULT_SERVICES`: serviços pré-definidos com duração e preço.
  - `SAMPLE_APPOINTMENTS`: exemplo de agendamentos (vazio por padrão).

  Estes dados são carregados em memória e os serviços/agendamentos são
  persistidos em `localStorage` pelo componente principal `Agenda`.
*/

import { Barber, Service, Appointment } from './types'

export const DEFAULT_BARBERS: Barber[] = [
  { id: 1, name: 'João' },
  { id: 2, name: 'Carlos' },
  { id: 3, name: 'Pedro' }
]

// Horários padrão (blocos de 30 minutos) — podem ser estendidos pelo usuário
export const DEFAULT_TIMES = [
  '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30'
]

export const DEFAULT_SERVICES: Service[] = [
  { id: 1, name: 'Corte', duration: 30, price: 35 },
  { id: 2, name: 'Barba', duration: 30, price: 25 },
  { id: 3, name: 'Corte + Barba', duration: 60, price: 55 },
  { id: 4, name: 'Escova', duration: 60, price: 40 }
]

export const SAMPLE_APPOINTMENTS: Appointment[] = []

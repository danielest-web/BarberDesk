// Utilitários para conversões de horário e verificações de conflito
export function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function minutesToTime(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`
}

export function getAppointmentEndTime(start: string, duration: number) {
  return minutesToTime(timeToMinutes(start) + duration)
}

export function getDurationBlocks(duration: number) {
  return Math.max(1, Math.ceil(duration / 30))
}

export function hasScheduleConflict(existingAppointments: any[], newAppt: any) {
  const s1 = timeToMinutes(newAppt.startTime)
  const e1 = s1 + newAppt.duration
  return existingAppointments.some(a => a.date === newAppt.date && a.barberId === newAppt.barberId && (() => {
    const s2 = timeToMinutes(a.startTime)
    const e2 = s2 + a.duration
    return Math.max(s1, s2) < Math.min(e1, e2)
  })())
}

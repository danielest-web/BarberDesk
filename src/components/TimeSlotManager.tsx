import React, { useState } from 'react'

type Props = {
  extraTimes: string[]
  onAdd: (t:string)=>void
  onRemove: (t:string)=>void
}

export default function TimeSlotManager({ extraTimes, onAdd, onRemove }: Props){
  const [val, setVal] = useState('')
  function handleAdd(){
    if (!val) return
    if (extraTimes.includes(val)) { alert('Horário já existe'); return }
    onAdd(val)
    setVal('')
  }

  return (
    <div className="flex items-center gap-2">
      <input value={val} onChange={e=>setVal(e.target.value)} placeholder="Adicionar horário (HH:MM)" className="border p-2 rounded" />
      <button onClick={handleAdd} className="px-3 py-2 bg-gray-100 rounded">Adicionar</button>
      <div className="flex gap-2 items-center">
        {extraTimes.map(t=> (
          <div key={t} className="flex items-center gap-1 bg-gray-50 border px-2 py-1 rounded">
            <span className="text-sm">{t}</span>
            <button onClick={()=>onRemove(t)} className="text-red-500">x</button>
          </div>
        ))}
      </div>
    </div>
  )
}

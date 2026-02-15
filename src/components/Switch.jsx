import React from 'react'

const Switch = ({label, onChange}) => {
  return (
    <label className=' flex w-fit justify-between items-center gap-2 rounded-md'>
      <p className=' text-md'>{label}</p>
      <input type="checkbox" onChange={(e) => onChange(e.target.checked)}/>
    </label>
  )
}

export default Switch
import React from 'react'

const Seperator = ({className}) => {
  return (
    <div className={` h-0.5 w-full bg-gray-200 ${className}`}></div>
  )
}

export const SeperatorVertical = ({className}) => {
  return (
    <div className={` h-10/12 rounded-xl w-px bg-gray-200 ${className}`}></div>
  )
}

export default Seperator
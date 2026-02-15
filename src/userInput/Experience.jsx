import React, { Fragment } from 'react'
import Seperator from '../components/Seperator'

const Experience = ({ experiences, setExperiences }) => {

  const setterOuterKeys = (key, value, className) => {
    console.log(key, value, className)
    setExperiences((prev) => ({
      ...prev[key], value, className 
    }))
  }

  console.log(experiences)
  return (
    <Fragment>
      <h1 className='text-lg'>Experiences</h1>
      <Seperator className="mb-2" />

      <div className=" flex flex-col gap-2">

        {experiences.map((experience) => (
          Object.keys(experience).map((key) => {
            const item = experience[key]
            return (<div key={key} className=" space-y-1">
              <p className=' text-md'>{key}</p>
              <input value={item}
                onChange={(e) => setterOuterKeys(key, e.target.value, item.className)}
                type='text'
                className=' border border-gray-200 rounded-md w-full p-2 outline-blue-200 '
              />
            </div>)
          })
        ))
        }
      </div>
    </Fragment>
  )
}

export default Experience
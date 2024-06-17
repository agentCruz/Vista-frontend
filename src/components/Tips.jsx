import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export const Tips = (props) => {
  return (
    <section style={{ background: props.background }} className={`mb-[16px] px-[24px] py-[17px] rounded-[12px] `}>
        <h1>{props.title}</h1>
        <div className='flex items-center justify-between'>
            <h3>{props.subtext}</h3>
            <div className='bg-white text-[14px] p-4 rounded-full'>
                <FaArrowRight />
            </div>
        </div>
    </section>
  )
}

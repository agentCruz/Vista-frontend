import React from 'react'

export default function StyledInput(props) {
  return (
    <div >
        <input type={props.type} placeholder={props.placeholder} className='outline-none  py-[16px] px-6 w-full bg-[#F8F8F8] rounded-md' onChange={props.onChange} />
    </div>
  )
}

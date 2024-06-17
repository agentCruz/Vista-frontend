import React, { useEffect, useState } from 'react'
import Button from '../Button';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

export const Request = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [width, setWidth] = useState("117px");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(inputValue < 50);

    if (inputValue.length > 5) {
      let value = 117 + inputValue.length * 5; // Adjusted calculation for width
      setWidth(`${value}px`);
    } else {
      setWidth("117px");
    }
  }, [inputValue]);

  const onChange = (text) => {
    setInputValue(text.target.value);
  }

  return (
    <div className='text-center'>
      <section className='flex gap-4 py-3 items-center justify-center bg-[#F8F9FC]'>
        <div className='text-[#E2E7FE] w-fit px-4 py-2 border border-opacity-40 rounded-full'>
          ?
        </div>
        <div className='bg-[#EBEEFA] p-2 w-[170px] rounded-xl'>
          <p>{props.sender}</p>
        </div>
      </section>
      <section className='mt-12 py-6 bg-[#F8F9FC] '>
        <div className='flex justify-center items-center gap-2 text-[#E2E0F0]'>
          <h1 className='text-3xl'>₦</h1>
          <div style={{ width }} className="overflow-hidden">
            <Input 
              type='number' 
              className='outline-none text-[#7856FF] bg-[#F0F2FB] font-semibold text-2xl' 
              style={{ width }} 
              onChange={onChange} 
            />
          </div>
        </div>
        <p className='text-[#8A81B1E5] mt-4'>Minimum request: ₦50</p>
      </section>
      <div className='mt-12'>
        <Button disabled={disabled} text="Request" />
      </div>
    </div>
  )
}

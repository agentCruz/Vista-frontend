import React from 'react';
import { TicksSVG } from '../assets/NotificationSVG';
import { IoCloseOutline } from 'react-icons/io5';

export const Checks = ({ checked,text,failed }) => {
  
  return (
    <section className='flex items-center justify-center gap-[27px] py-[7px] checks relative'>
      <div className={`border-2 rounded-full w-fit min-h-[25px] min-w-[25px] flex items-center justify-center ${checked ? "bg-[#7856FFF2]" : ""} ${failed ? "bg-[#FF5656]":""} border-[#5977E559] transition-all duration-200`}>
        {failed ? 
        <div className='text-white text-[14px] font-semibold'>
          <IoCloseOutline /> 
        </div>:
        <TicksSVG stroke={checked ? '#FFFFFF' : '#5977E5'} opacity={checked ? '1' : '0.35'} />
      }
      </div>
      <div className='w-[155px]'>
        <p>{text}</p>
      </div>
    </section>
  );
};

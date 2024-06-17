import React from 'react';
import { cardSVG } from '../assets/NotificationSVG';
import { MdOutlineSettings } from 'react-icons/md';

const image=<MdOutlineSettings />
const items = [
  { id: 1, image: image, text: 'Get special discounts',subText:"Earn cash back discounts when you shop at your favourite stores." },
  { id: 2, image:image, text: 'Get special discounts',subText:"Earn cash back discounts when you shop at your favourite stores."  },
  { id: 3, image:image, text: 'Get special discounts',subText:"Earn cash back discounts when you shop at your favourite stores."  },
  // Add more items as needed
];

const VerticalScrollList = () => {
  return (
    <div className=" w-[100%] flex flex-col gap-0 h-[90px] justify-center relative">
    <div className='flex absolute z-[100] items-center justify-between w-[100%] py-4 shadow-md bg-[#fffF] bg-opacity-90 px-6 rounded-lg'>
     <section className="flex item-center gap-4">
        <div className='text-[#7856FF] bg-[#8161FF] bg-opacity-10 p-2 text-center h-fit rounded-full justify-center'>
         {items[0].image}
        </div>
        <div className='flex flex-col gap-[4px]'>
          <h1 className='text-[#192038] font-[600] text-[13px]'>{items[0].text}</h1>
          <p className='text-[11px] text-[#8F9BB3]'>{items[0].subText}</p>
        </div>
      </section>
    </div>

    <div className='flex z-[10] absolute bottom-[2px] items-center justify-between w-[90%] py-4 shadow-md bg-[#FDFDFF] bg-opacity-90 px-6 rounded-lg mx-[5%]'>
     <section className="flex item-center gap-4">
        <div className='text-[#7856FF] bg-[#8161FF] bg-opacity-10 p-2 text-center h-fit rounded-full justify-center'>
         {items[1].image}
        </div>
        <div className='flex flex-col gap-[4px]'>
          <h1 className='text-[#192038] font-[600] text-[13px]'>{items[1].text}</h1>
          <p className='text-[11px] text-[#8F9BB3]'>{items[1].subText}</p>
        </div>
      </section>
    </div>
    <div className='flex z-[1] absolute bottom-[-4px] items-center justify-between w-[80%] py-4 shadow-md bg-[#FDFDFF] bg-opacity-90 px-6 rounded-lg mx-[10%]'>
     <section className="flex item-center gap-4">
        <div className='text-[#7856FF] bg-[#8161FF] bg-opacity-10 p-2 text-center h-fit rounded-full justify-center'>
         {items[1].image}
        </div>
        <div className='flex flex-col gap-[4px]'>
          <h1 className='text-[#192038] font-[600] text-[13px]'>{items[1].text}</h1>
          <p className='text-[11px] text-[#8F9BB3]'>{items[1].subText}</p>
        </div>
      </section>
    </div>
    </div>
  );
};

export default VerticalScrollList;

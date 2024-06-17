import React from 'react'
import Button from './Button'

export const TransactionDetails=()=> {
  return (
    <section>
    <div className='bg-[#F8F9FC] flex items-center gap-4 justify-center py-4'>
      <div className='text-[#7856FF] font-[800] text-lg bg-[#8161FF] bg-opacity-10 p-2 text-center h-fit rounded-full'>
        MD
      </div>
      <h1 className='font-[600] text-[#192038]'>Meals Delight</h1>
      <p className='text-[#8F9BB3] font-extralight'>Restaurant</p>
     </div>
     {/* Money Spent */}
     <div className='mt-4 text-center bg-[#F8F9FC] py-[27px] rounded-[12px]'>
        <h1 className='text-[40px] font-semibold text-[#E52B36] opacity-90'>- ₦ 2,800</h1>
        <p className='text-[#8A81B1E5] opacity-90 font-semibold'>Transfer Complete</p>
     </div>
     {/* Items details */}
     <div className='mt-4 text-center bg-[#F8F9FC] p-[30px] rounded-[12px] flex flex-col gap-5'>
     {/* Item 1 */}
        <div className='flex items-center justify-between'>
          <h1 className='text-[#B5A3FF] text-[13px] font-[500] '>SendID</h1>
          <p className='text-[#10111180] font-[500]'>AJ13319253495E2</p>
        </div>
     {/* Item 2 */}
        <div className='flex items-center justify-between'>
          <h1 className='text-[#B5A3FF] text-[13px] font-[500] '>Date</h1>
          <p className='text-[#10111180] font-[500]'>4:53:51 PM - 23/04</p>
        </div>
     {/* Item 3 */}
        <div className='flex items-center justify-between'>
          <h1 className='text-[#B5A3FF] text-[13px] font-[500] '>Currency</h1>
          <p className='text-[#10111180] font-[500]'>NGN - Nigerian Naira</p>
        </div>
     {/* Item 4 */}
        <div className='flex items-center justify-between'>
          <h1 className='text-[#B5A3FF] text-[13px] font-[500] '>Fee</h1>
          <p className='text-[#10111180] font-[500]'>₦ 3.50</p>
        </div>
     {/* Item 4 */}
        <div className='flex items-center justify-between'>
          <h1 className='text-[#B5A3FF] text-[13px] font-[500] '>Total</h1>
          <p className='text-[#10111180] font-[500]'>₦ 2,803.5</p>
        </div>
     {/* Item 4 */}
        <div className='flex items-center justify-between'>
          <h1 className='text-[#B5A3FF] text-[13px] font-[500] '>Description</h1>
          <p className='text-[#10111180] font-[500]'>None</p>
        </div>
     </div> 
     <div className="mt-3">
      <Button text="Done"  />
     </div>
    </section>
  )
}

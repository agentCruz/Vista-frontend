import { Input, Switch } from 'antd'
import React from 'react'
import { BsLightningCharge } from 'react-icons/bs';
import { CiCircleQuestion, CiFaceSmile, CiHeadphones } from 'react-icons/ci';
import { GoBell } from 'react-icons/go';
import { IoCallOutline, IoLockClosedOutline, IoMailOutline } from 'react-icons/io5'
import { LuEye } from 'react-icons/lu';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useAuthState } from '../../stores/auth.store';

export const Account = () => {
    const { user } = useAuthState();
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
      };
  return (
    <section className='flex flex-col gap-[16px]'>
        <div className='flex items-center justify-start px-[16px] bg-[#F7F8F9] border-[#DADADA80] border-opacity-50 border h-[56px] rounded-[10px] gap-4'>
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 text-opacity-30 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
                <p>#</p>
            </div>   
            <p className='text-[14px] text-[#8391A1]'>{user ? user?.account : ''}</p>
        </div>
        {/* Number */}
        <div className='flex items-center justify-start px-[16px] border-[#DADADA80] border-opacity-50 border h-[56px] rounded-[10px] gap-4'>
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 text-opacity-30 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
            <IoCallOutline />
            </div>  
            <div className='w-auto'>
                <Input addonBefore="+234" type='number'  disabled={true} />
            </div> 
            <p className='underline text-[#5977E5] text-[11px] font-bold'>Edit</p>
        </div>
        {/* Email */}
        <div className='flex items-center justify-start px-[16px] overflow-clip bg-[#F7F8F9] border-[#DADADA80] border-opacity-50 border h-[56px] rounded-[10px] gap-4'>
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 text-opacity-30 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
                <IoMailOutline />
            </div>   
            <p className='text-[14px] text-[#8391A1] w-auto'>{user ? user.email : '' }</p>
        </div>
        {/* Password */}
        <div className='flex items-center justify-start px-[16px] overflow-clip bg-[#F7F8F9] border-[#DADADA80] border-opacity-50 border h-[56px] rounded-[10px] gap-4'>
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
                <IoLockClosedOutline />
            </div> 
            <div className='w-auto'>
             <Input type='password' value="Sean" disabled={true} />
            </div>  
            <p className='underline text-[#5977E5] text-[11px] font-bold whitespace-nowrap'>Change password</p>
        </div>
        {/* notifications */}
        <div className='flex items-center justify-between px-[16px] overflow-clip bg-[#F7F8F9] border-[#DADADA80] border-opacity-50 border h-[56px] rounded-[10px] gap-4'>
            <div className='flex items-center gap-[8px]'>      
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
                <GoBell />
            </div> 
            <div className='w-auto'>
             <p className='14px text-[#6F7780]'>Notifications</p>
            </div>  
            </div>
            <div>
             <Switch size='large' defaultChecked onChange={onChange} />
            </div>
        </div>

        <section className='mt-4 flex flex-col gap-[16px]'>
         {/* Tutorial */}
        <div className='flex items-center justify-between px-[16px] overflow-clip bg-[#F7F8F9] border-[#DADADA80] border-opacity-50 border h-[56px] rounded-[10px] gap-4'>
            <div className='flex items-center gap-[8px]'>      
            <div className='text-[#7856FF] min-w-[30px] font-semibold border-[#5977E51A] border-opacity-10 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
                <CiCircleQuestion />
            </div> 
            <div className='w-auto'>
             <p className='14px text-[#6F7780]'>Tutorial</p>
            </div>  
            </div>
        </div>
        {/* Quick Debit */}
        <div className='flex items-center justify-between px-[16px] overflow-clip bg-[#F7F8F9] border-[#DADADA80] border-opacity-50 border h-[56px] rounded-[10px] gap-4'>
            <div className='flex items-center gap-[8px]'>      
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
                <BsLightningCharge />
            </div> 
            <div className='w-auto'>
             <p className='14px text-[#6F7780]'>Quick Debit</p>
            </div>  
            </div>
            <div>
             <Switch size='large' defaultChecked onChange={onChange} />
            </div>
        </div>
        {/* Tap-To-hide balance */}
        <div className='flex items-center justify-between px-[16px] overflow-clip bg-[#F7F8F9] border-[#DADADA80] border-opacity-50 border h-[56px] rounded-[10px] gap-4'>
            <div className='flex items-center gap-[8px]'>      
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
             <LuEye />
            </div> 
            <div className='w-auto'>
             <p className='14px text-[#6F7780] capitalize'>Tap-To-hide balance</p>
            </div>  
            </div>
            <div>
             <Switch size='large' defaultChecked={false} onChange={onChange} />
            </div>
        </div>
        {/*Biometrics*/}
        <div className='flex items-center justify-between px-[16px] overflow-clip bg-[#F7F8F9] border-[#DADADA80] border-opacity-50 border h-[56px] rounded-[10px] gap-4'>
            <div className='flex items-center gap-[8px]'>      
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
                <CiFaceSmile />
            </div> 
            <div className='w-auto'>
             <p className='14px text-[#6F7780] capitalize'>Biometrics</p>
            </div>  
            </div>
            <div>
             <Switch size='large' defaultChecked onChange={onChange} />
            </div>
        </div>
        <section className='flex items-center gap-6'>
            {/* Contact US */}
        <div className='flex items-center border border-opacity-40 rounded-[12px] p-3 w-full justify-center gap-3 cursor-pointer'>
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
            <MdOutlineAlternateEmail />
            </div> 
            <p className='14px text-[#6F7780] capitalize'>Contact Us</p>
        </div>
        {/* Support */}
        <div className='flex items-center border border-opacity-40 rounded-[12px] p-3 w-full justify-center gap-3 cursor-pointer'>
            <div className='text-[#7856FF] min-w-[30px] border-[#5977E51A] border-opacity-10 border w-[30px] h-[30px] rounded-[8px] flex justify-center items-center'>
            <CiHeadphones />
            </div> 
            <p className='14px text-[#6F7780] capitalize'>Support</p>
        </div>
        </section>
        </section>

    </section>
  )
}

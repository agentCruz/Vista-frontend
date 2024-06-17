import React, { useState } from 'react'
import LogoText from "../assets/LogoTexts.svg"
import Logo from "../assets/Logo.svg"
import StyledInput from '../components/StyledInput'
import { Link, useNavigate } from 'react-router-dom'
import { network } from '../App'

export default function SignIn() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[username,setUsername]=useState("")
  const navigate=useNavigate()

  const onEmailChange=(e)=>{
    const formattedMail=e.target.value
    setEmail(formattedMail.toLocaleLowerCase())
  }
  const onPasswordChange=(e)=>{
    setPassword(e.target.value)
  }

  const onNameChange=(e)=>{
    setUsername(e.target.value)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(`http://${network}:5000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            const newUser = await response.json();
            console.log('New User Added:', newUser);
            navigate("/")
        } else {
            const errorData = await response.json();
            console.error('Failed to add user:', errorData.message);
        }
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
};

  return (
    <form className='p-6'>
      <div className='flex items-center gap-4'>
        <img src={Logo} alt="" />
        <img src={LogoText} alt="" />
      </div>
      <h1 className='mt-6 font-bold text-[#283079] text-[40px]'>Let’s get you started... </h1>
      {/* Inputs */}
      <div className='flex flex-col mt-12 gap-6'> 
        <StyledInput onChange={onNameChange} placeholder="Full Name" type="text" />
        <StyledInput placeholder="Phone Number" type="number"/>
        <StyledInput onChange={onEmailChange} placeholder="E-mail Adress" type="email"/>
        <StyledInput onChange={onPasswordChange} placeholder="Password" type="Password"/>
      </div>
      {/* Agreement */}
      <div className='flex items-center mt-1'>
        <input type="checkbox" className='mr-2' />
        <p className='text-sm'>I agree to the <Link to="#" className='text-[#7856FF] underline'>Terms and Conditions</Link></p>
      </div>
      {/* button */}
      <button onClick={handleSignUp} className='w-full bg-[#7856FF] text-[white] rounded-lg py-[16px] mt-12 font-semibold'>
      Sign up
      </button>
      {/* No account */}
      <div className='flex flex-col text-center gap-4 mt-12'>
        <p className='text-[#283079] font-[500]'>Already a member?</p>
        <button className='w-full text-[#7856FF] bg-[#F8F8F8] rounded-lg py-[16px] font-semibold'>
        Login
      </button>
      </div>
    </form>
  )
}

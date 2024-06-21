import React, { useEffect, useState } from "react";
import LogoText from "../assets/LogoTexts.svg";
import Logo from "../assets/Logo.svg";
import StyledInput from "../components/StyledInput";
import { useNavigate } from "react-router-dom";
import { network } from "../App";
import useAuth from "../hooks/auth.hook";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signIn } = useAuth();

  // useEffect(()=>{
  //   if(localStorage.getItem("accessToken")){
  //     navigate("/dashboard")
  //   }
  // })

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    signIn(email, password).then(() => navigate("/dashboard"))
      // const response = await fetch(`http://${network}:5000/login`, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ email, password }),
      // });

      // const data = await response.json();
      // if (response.ok) {
      //     localStorage.setItem('accessToken', data.accessToken);
      //     console.log(localStorage.getItem("accessToken"))
      //     navigate("/dashboard")
      // } else {
      //     // Handle specific error messages
      //     if (data.message === 'Cannot find user') {
      //         console.error('User not found');
      //     } else if (data.message === 'Invalid credentials') {
      //         console.error('Invalid credentials');
      //     } else {
      //         console.error('Unknown error:', data.message);
      //     }
      // }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const onEmailChange = (e) => {
    const formattedMail = e.target.value;
    setEmail(formattedMail.toLocaleLowerCase());
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log(e.target.value)
  };
  return (
    <main className="p-6 mx-auto max-w-[600px]">
      <div className="flex items-center gap-4">
        <img src={Logo} alt="" />
        <img src={LogoText} alt="" />
      </div>
      <h1 className="mt-6 font-bold text-[#283079] text-[40px]">
        Welcome back to Vista!{" "}
      </h1>
      {/* Inputs */}
      <div className="flex flex-col mt-12 gap-6">
        <StyledInput
          onChange={onEmailChange}
          placeholder="E-mail Adress"
          type="email"
        />
        <StyledInput
          onChange={onPasswordChange}
          placeholder="Password"
          type="password"
        />
      </div>
      {/* button */}
      <button
        onClick={handleLogin}
        className="w-full bg-[#7856FF] text-[white] rounded-lg py-[16px] mt-12 font-semibold"
      >
        Login
      </button>
      {/* No account */}
      <div className="flex flex-col text-center gap-4 mt-12">
        <p className="text-[#283079] font-[500]">Don’t have an account?</p>
        <button className="w-full text-[#7856FF] bg-[#F8F8F8] rounded-lg py-[16px] font-semibold" onClick={() => navigate("/sign-in")}>
          Sign up
        </button>
      </div>
      {/* ErrorMessage */}
      <div className=" text-red-500">{error}</div>
    </main>
  );
}

import React, { useContext, useState } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from '../context/StoreContext';

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Log-In")
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { url, setToken } = useContext(StoreContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData, [name]: value
    }))
  }

  const onLogin = async (e) => {
    e.preventDefault()

    let newUrl = url

    if (currState === 'Log-In') {
      newUrl += "/api/user/login"
      // toast.success("Log-In Successfully");
    } else {
      newUrl += "/api/user/signup"
      toast.success("User Created Successfully");
    }

    const response = await axios.post(`${newUrl}`, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setShowLogin(false)
      toast.success("Log-In Successfully");
    } else {
      toast.error("Invalid Password or E-Mail");
    }
  }

  return (
    <>
      <div className="login-popup absolute z-10 w-full mt-16 sm:mt-0 h-full bg-[#09122C90] grid">
        <form onSubmit={onLogin} className="login-popup-container place-self-center max-w-[23vw, 330px] max-w-[] bg-[#09122C] flex flex-col gap-6 px-6 py-7 mx-3 sm:mx-0 border rounded-lg text-sm animate-fadeIn">
          <div className="login-popup-title flex justify-between items-center text-xl">
            <h2 className='text-purple-600'>{currState}</h2>
            <RxCrossCircled onClick={() => setShowLogin(false)} className='cursor-pointer text-red-700 text-2xl' />
          </div>
          <div className="login-popup-input flex flex-col gap-3">
            {currState === "Sign-Up" ?
              <>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input name='firstname' onChange={handleChange} value={data.firstname} type="text" className='bg-transparent border-1 rounded p-2 outline-none border-gray-600' placeholder='First Name : e.g., John' required />
                  <input name='lastname' onChange={handleChange} value={data.lastname} type="text" className='bg-transparent border-1 rounded p-2 outline-none border-gray-600' placeholder='Last Name : e.g., Smith' required />
                </div>
                <input name='mobileNumber' onChange={handleChange} value={data.mobileNumber} type="number" className='bg-transparent border-1 rounded p-2 outline-none border-gray-600' placeholder='Mobile : e.g., +1234567890' required />
                <input name='email' onChange={handleChange} value={data.email} type="email" className='bg-transparent border-1 rounded p-2 outline-none border-gray-600' placeholder='E-Mail : e.g., john.smith@example.com' required />
                <input name='password' onChange={handleChange} value={data.password} type="password" className='bg-transparent border-1 rounded p-2 outline-none border-gray-600' placeholder='Password : e.g., ********' required />
                <input name='confirmPassword' onChange={handleChange} value={data.confirmPassword} type="password" className='bg-transparent border-1 rounded p-2 outline-none border-gray-600' placeholder='Confirm Password : e.g., ********' required />
              </> : <>
                <input name='email' onChange={handleChange} value={data.email} className='bg-transparent border-1 rounded p-2 outline-none border-gray-600' type="email" placeholder='Enter Your E-Mail' required />
                <input name='password' onChange={handleChange} value={data.password} className='bg-transparent border-1 rounded p-2 outline-none border-gray-600' type="password" placeholder='Enter Your Password' required />
              </>}
          </div>
          <button type='submit' className='text-black group hover:bg-purple-900 items-start font-medium border-none p-2 rounded-md bg-purple-700'>{currState === "Sign-Up" ? "Create Account" : "Log-In"}</button>
          <div className="login-popup-condition flex gap-2 -mt-3">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
          {/* Toggle Login / Sign-up */}
          <p className='-mt-2'>
            {currState === "Sign-Up" ? "Already Have An Account ?" : "Don't Have An Account ?"}
            <span className='text-purple-600 cursor-pointer font-medium' onClick={() => setCurrState(currState === "Sign-Up" ? "Log-In" : "Sign-Up")} >
              {currState === "Sign-Up" ? " Log-In" : " Sign-Up"}
            </span>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login

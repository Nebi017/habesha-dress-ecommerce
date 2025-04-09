import React, { useState } from 'react';

const Login = () => {
  const [currentstate, setCurrentstate] = useState('Login');
 const OnSubmitHandler = async(event)=>{
  event.preventeDefault();
 }
  return (
<form
    onSubmit={OnSubmitHandler}
    className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 border-2 border-gray-300 p-10 py-15 bg-blue-50 rounded-lg"
>
      <div className="inline-flex item-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentstate}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentstate === 'Sign Up' && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>

        {currentstate === 'Login' ? (
          <p
            onClick={() => setCurrentstate('Sign Up')}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentstate('Login')}
            className="cursor-pointer "
          >
            Login Here
          </p>
        )}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 w-full'>{currentstate==='Login'? 'Sign Up':'Login'} </button>
    </form>
  );
};

export default Login;

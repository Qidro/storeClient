import { log } from 'console';
import { emitWarning } from 'process';
import React, { useEffect, useState } from 'react';
import { setFlagsFromString } from 'v8';
import { authorization } from './Requests/requests';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { ToastContainer, toast  } from "react-toastify";
function Authorization() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginDirty, setLoginDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [loginError, setLoginError] = useState("Логин не может быть пустыми");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();
  useEffect( () => 
  {
    if(loginError || passwordError)
    {
      setFormValid(false);
    }
    else{
      setFormValid(true);
    }
  }, [loginError, passwordError] )  

  const loginHundler = (e:  React.FocusEvent<HTMLInputElement>) =>
  {
    const loginData = e.target.value;
    setLogin(e.target.value);
    if(loginData.length > 0)
    {
      setLoginError("");
    }
    else
    {
      setLoginError("Логин не может быть пустым");
    }
    // if(loginData.length < 3)
    // {
    //   setLoginError('Логин слишком маленький');
    // }
    // else
    // {
    //   setLoginError("");
    // }

  };
  
  const ClickReg = () => {
    navigate("/registration");
  };
  
  const PasswordHundler = (e:  React.FocusEvent<HTMLInputElement>) =>
  {
    setPassword(e.target.value);
    const passwordData = e.target.value; 
    //const passwordDataError = passwordError;
    if(passwordData.length > 0)
    {
      setPasswordError("");
    }
    else
    {
      setPasswordError("Пароль не может быть пустым");
    }
   // const lpasswordData = e.target.value;
    // if(lpasswordData.length < 6)
    // {
    //   setPasswordError('Пароль должен быть больше 5 символов');
    // }
    // else
    // {
    //   setPasswordError("");
    // }

  };


  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) =>
  {
    switch (e.target.name)
    {
      case 'login':
        setLoginDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  }

  const handleClick = async() => {
   const answerServer = await authorization(login, password);
   if(answerServer == "Пользователь не найден")
   {
     toast(answerServer);
      console.log("пользователь не найден");
   }
   else if(answerServer == "Неверный пароль")
   {
    toast(answerServer);
    console.log("неверный пароль");
   }
   else
   {
    console.log("все прошло успешно");
    //записываем токен в куки
      Cookies.set("token", answerServer);
      navigate("/");
   }
  };
    return (

  
   

    <div
  className="h-screen w-full flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: "url('/back.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
    <ToastContainer
      position="top-center"
      />
      <form className="w-100 h-80 bg-white rounded-lg p-6 shadow-md">

        <h1 className="text-center mb-4 font-semibold text-lg">
          Авторизация
        </h1>

        <div className="w-full flex flex-col gap-4">
          
          {(loginDirty && loginError) && <div style={{color:'red'}}>{loginError}</div>}
          <input
         onChange={loginHundler}
            onBlur={e=> blurHandler(e)}
            value = {login}
            name = 'login'
            type="text"
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Логин"
          />
        {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
          <input
            onChange={PasswordHundler}
            onBlur={e=> blurHandler(e)}
            value = {password}
            name = 'password'
            type="password"
            placeholder="Пароль"
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

        </div>
        {/* кнопка авторизации */}
        <button 
        type="button"
        disabled = {!formValid} 
        className={formValid ? 'mt-6 bg-blue-500 text-white w-full py-2 px-4 rounded-lg hover ': 'mt-6 bg-gray-500 text-white w-full py-2 px-4 rounded-lg hover' }
        onClick={handleClick}
        >Войти</button>
        {/* кнопка перехода на создание аккаунта */}
        <button 
         type="button"
        className=" font-medium mt-2 bg-white text-black w-full py-2 px-4 rounded-lg border border-black hover:bg-gray-100"
        onClick={ClickReg}
        >Зарегестрироваться</button>
      </form>
  </div>
    );

}

export default Authorization;
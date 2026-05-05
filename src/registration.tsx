import { log } from 'console';
import { emitWarning } from 'process';
import React, { useEffect, useState } from 'react';
import { setFlagsFromString } from 'v8';
import { registration } from './Requests/requests';
import { useNavigate } from "react-router-dom";
//import back from '/back.png';
import { ToastContainer, toast  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loginDirty, setLoginDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [loginError, setLoginError] = useState("Логин не может быть пустыми");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
    const [emailError, setEmailError] = useState("Почта не может быть пустым");
    const [formValid, setFormValid] = useState(false);
    //ошибка от сервера
    //const [serverError, setServerError] = useState("");
    const [messageRegistr, setMessageRegistr] = useState(false);

    

  useEffect( () => 
  {
    if(loginError || passwordError || emailError)
    {
      setFormValid(false);
    }
    else{
      setFormValid(true);
    }
  }, [loginError, passwordError, emailError] )  

  const loginHundler = (e:  React.FocusEvent<HTMLInputElement>) =>
  {
    const loginData = e.target.value;
    setLogin(e.target.value);
    if(loginData.length < 3)
    {
      setLoginError('Логин слишком маленький');
    }
    else
    {
      setLoginError("");
    }

  };

const emailHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailData = e.target.value;

  setEmail(emailData);

  if (!re.test(emailData) || emailData.length < 6) {
    setEmailError("Email не соответствует формату");
  } else {
    setEmailError("");
  }
};

  const PasswordHundler = (e:  React.FocusEvent<HTMLInputElement>) =>
  {
    setPassword(e.target.value);
    const lpasswordData = e.target.value;
    if(lpasswordData.length < 6)
    {
      setPasswordError('Пароль должен быть больше 5 символов');
    }
    else
    {
      setPasswordError("");
    }

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
      case 'email':
        setEmailDirty(true);
        break;
    }
  }

 const registrationClick = async() => {
    console.log("нажал кнопку")
     const registrationState = await registration(login, email, password);
     console.log("наше значение"+registrationState);
     if(registrationState==="Пользователь зарегестрирован")
     {
        // navigate("/");
        setMessageRegistr(true);
     }
      else if (typeof registrationState === "string") {
    toast(registrationState);
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
      
      { !messageRegistr ?
      <form className=  {(!loginError && !emailError || !passwordError && !emailError  || !loginError && !passwordError) || !loginDirty && !emailDirty 
        ? 'w-100 h-90 bg-white rounded-lg p-6 shadow-md': 'w-100 h-110 bg-white rounded-lg p-6 shadow-md' }>

        <h1 className="text-center mb-4 font-semibold text-lg">
          Регистрация
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

          {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
          <input
            onChange={emailHandler}
            onBlur={e=> blurHandler(e)}
            value = {email}
            name = 'email'
            type="email"
            placeholder="Почта"
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        
        <button 
         type="button"
        disabled = {!formValid} className={formValid ? 'mt-6 bg-blue-500 text-white w-full py-2 px-4 rounded-lg hover ': 'mt-6 bg-gray-500 text-white w-full py-2 px-4 rounded-lg hover' }
        onClick={registrationClick}
        >Зарегестрироваться</button>
      </form>
    :  
      <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm text-center">
  <p className="text-lg font-semibold text-blue-900 mb-2">
    Подтвердите ваш email
  </p>
  <p className="text-base text-blue-800 leading-relaxed">
    Мы отправили письмо на вашу почту. Перейдите в почтовый ящик и нажмите на ссылку подтверждения, чтобы завершить регистрацию.
  </p>
</div>
  }
  </div>
    );

}

export default Registration;
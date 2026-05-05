import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import App from './Home';
import Authorization from './authorization';
import Header from './Headers/Headers';
import Registration from './registration';
import Home from './Home';
import Сontacts from './contacts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConfirmEmail from './confirmEmail';
import VerifyEmail from './confirmEmail';
import ProtectedRoute from './ProtectedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Header
        logo="/logo.png"
        navData={[
          { label: "Главная", href: "/" },
          { label: "Группы", href: "/" },
          { label: "Создание заметки", href: "/about" },
          { label: "Контакты", href: "/contact" }
        ]}
      /> */}
      <Routes>
        {/* главная страница */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        {/* авторизация пользователя */}
        <Route path="/login" element={<Authorization />} />
        {/* регистрация пользователя */}
        <Route path="/registration" element={<Registration />} />
        {/* <Route path="/contact" element={<Сontacts />} /> */}
        {/* верификация через почту */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* контактная страница */}
        <Route path="/contact" element={<ProtectedRoute><Сontacts /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


import { Navigate } from 'react-router-dom';
import { JSX, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

useEffect(() => {

  const verify = async () => {
    const token = Cookies.get("token");
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJlbWFpbCI6ImRpbW9uLnhvdmFuQG1haWwucnUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTiIsImV4cCI6MTc3Nzk3NjI2MCwiaXNzIjoic2VydmVyLW5vZGVzIiwiYXVkIjoiY2xpZW50LW5vZGVzIn0.mQ7tpiggeXwVq3pxQxw4Z-fbjviflpxadSZt4Mt8YzY";
    try {
      const response = await fetch("https://localhost:7193/Authentication/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token
    }),
  });

  //const data = await response.text(); // или response.json()
      if (response.ok) {
         console.log("есть токен");
         setIsAuth(true);
      } else {
         console.log("нет токена");
         setIsAuth(false);
      }
    } catch {
      console.log("ошибка токена");
      setIsAuth(false);
    }
  };

  verify();
}, []);

  if (isAuth === null) {
    return <div></div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
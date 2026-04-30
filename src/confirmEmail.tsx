import { useEffect, useState, useRef } from "react";

type Status = "loading" | "success" | "error";

export default function VerifyEmail() {
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>("");
  const calledRef = useRef(false);
 useEffect(() => {
  if (calledRef.current) return;
  calledRef.current = true;

  const verify = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Токен отсутствует");
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7193/User/verify-email?token=${encodeURIComponent(token)}`,
        { method: "POST" }
      );

      const text = await response.text();

      if (response.ok) {
        setStatus("success");
        setMessage(text || "Email подтверждён");
      } else {
        setStatus("error");
        setMessage(text || "Ошибка подтверждения");
      }
    } catch {
      setStatus("error");
      setMessage("Ошибка соединения с сервером");
    }
  };

  verify();
}, []);

  if (status === "loading") {
    return <div className=" h-screen flex items-center justify-center">Подтверждение email...</div>;
  }

  if (status === "success") {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-center text-2xl">Проверка пройдена</h2>
        <p className="text-cente text-lg">{message}</p>
        <button className="text-center mt-2  bg-blue-500 text-white w-70 py-2 px-4 rounded-lg hover" type="button" 
        onClick={() => window.location.href = "/"}
        >Перейти на сайт</button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
  <h2 className="text-4xl font-bold mb-4">500 Ошибка</h2>
  <p className="text-lg text-gray-700">{message}</p>
  {/* <button className="text-center mt-2  bg-blue-500 text-white w-70 py-2 px-4 rounded-lg hover" type="button">Перейти на сайт</button> */}
     
</div>
  );
}
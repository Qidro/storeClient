




export const authorization = async () =>
{
    const response = await fetch("https://localhost:7193/WeatherForecast");
    console.log("наши данные:");
    console.log(response);
    //return response;
}

export const registration = async (login: string, email: string, password: string) => {
  const response = await fetch("https://localhost:7193/User", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      email,
      password,
    }),
  });

  const data = await response.text(); // или response.json()

  console.log("ответ сервера:", data);
  if (response.ok) {
        return data;       
      } else {
        return data;
      }

};

export interface ConfirmEmailRequest {
  userId: string;
  token: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
}

export async function confirmEmail(data: ConfirmEmailRequest): Promise<ApiResponse> {
  const response = await fetch("/User/verify-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Server error",
    };
  }

  return response.json();
}
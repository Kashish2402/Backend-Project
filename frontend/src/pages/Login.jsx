import React, { useState } from "react";
import Password from "../components/Password";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const submit=()=>{}

  return (
    <div className="w-full h-[100vh] flex items-center justify-center ">
      <div className="border w-[400px] flex items-center justify-center flex-col py-10 gap-5 rounded-xl">
        <div className="">
          <span className="text-5xl font-semibold text-purple-500">Lo</span>
          <span className="text-5xl font-semibold text-purple-400">g</span>
          <span className="text-5xl font-semibold text-purple-500">in</span>
        </div>

        <form onSubmit={submit} className="mt-6 px-5 w-full flex flex-col gap-5">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black w-full py-2 px-3 rounded-2xl border-b border-b-purple-700 active:shadow-lg active:shadow-purple-600 outline-none"
            placeholder="email or username"
          />

          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <div>
              <input type="checkbox" value={remember} />
              <span className="ml-1 text-[16px]">Remember me</span>
            </div>

            <div>
              <a
                href=""
                className="text-[16px] text-blue-600 font-medium tracking-tighter hover:underline"
              >
                Forgot Password ?
              </a>
            </div>
          </div>
          <button className="w-full bg-[linear-gradient(350deg,purple,blue)] my-5 py-2 rounded-3xl text-xl font-bold">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

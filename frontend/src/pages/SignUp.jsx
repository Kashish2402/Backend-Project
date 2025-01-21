import React, { useState } from "react";
import Password from "../components/Password";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarFile, setAvatarFile] = useState("");
  const [coverImageFile, setCoverImageFile] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[400px] md:w-[800px] p-2 border rounded-xl flex flex-col items-center justify-center gap-5">
        <div>
          <h1 className="text-purple-500 font-medium italic text-4xl my-5">
            Create your Account
          </h1>
        </div>

        <form
          className="w-full px-5 flex flex-col items-center gap-5 mt-6 "
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col items-center justify-between md:flex-row md:divide-x-2 md:divide-gray-800">
            <div className="flex flex-col w-full md:w-1/2 items-center gap-5 md:gap-10 md:pr-5">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black rounded-2xl w-full border-b border-b-purple-700 px-3 py-2"
                placeholder="username"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black rounded-2xl w-full border-b border-b-purple-700 px-3 py-2"
                placeholder="email"
              />

              <Password
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2 md:pl-7 items-center gap-5 mt-[20px] md:mt-0">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-black rounded-2xl w-full border-b border-b-purple-700  px-3 py-2"
                placeholder="full name"
              />

              <div>
                <label htmlFor="avatar" className="p-1 ">
                  Avatar:{" "}
                </label>
                <input
                  type="file"
                  value={avatarFile}
                  onChange={(e) => setAvatarFile(e.target.value)}
                  name="avatar"
                  id="avatar"
                  className="mt-3 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="cover" className="p-1">
                  Cover image:{" "}
                </label>
                <input
                  type="file"
                  value={coverImageFile}
                  onChange={(e) => setCoverImageFile(e.target.value)}
                  name="cover"
                  id="cover"
                  className="mt-3 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button className="my-5 w-full bg-[linear-gradient(350deg,purple,blue)] py-2 rounded-3xl text-lg font-bold ">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

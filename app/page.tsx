"use client";
import Loader from "@/components/ui/Loader";
import axios from "axios";
import { useState } from "react";

export const runtime = "edge";
export default function Home() {
  const [url, seturl] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!url) return;
    setIsLoading(true);
    const data = axios
      .get(`${backendUrl}/?url=${encodeURIComponent(url)}`)
      .then((res) => {
        setResponse(res.data.message.response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <main className="min-h-screen bg-gray-800">
      <h1 className="text-orange-400 text-xl md:text-3xl  lg:text-4xl flex justify-center font-semibold pt-20">
        Summarize Hacker News Comments ~
      </h1>

      <div className="px-4 pt-14 mx-auto flex items-center justify-center">
        <input
          type="text"
          value={url}
          onChange={(e) => seturl(e.target.value)}
          placeholder="https://news.ycombinator.com/item?id=40550556"
          className="shadow bg-gray-50 border-2 border-orange-400 text-black text-sm rounded-xl focus:border-orange-500 p-2.5 w-[300px] sm:w-[450px] md:w-[750px]"
          style={{ marginBottom: "10px" }}
        />
        <button
          onClick={handleClick}
          className="bg-orange-400 text-white p-2.5 px-7 rounded-xl mb-2 ml-2"
        >
          Send
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center mt-24">
          <Loader />
        </div>
      ) : (
        response && (
          <center>
            <h1 className="text-white mt-10 p-6 bg-gray-700 rounded-xl text-left  w-[330px] sm:w-[550px] md:w-[850px]">
              {response}
            </h1>
          </center>
        )
      )}
    </main>
  );
}

"use client";

import BackgroundImage from "@/components/bgImg";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

import { useState, useRef } from "react";

const MFA = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <main>
        <BackgroundImage />

        <div className="relative flex h-screen w-full items-center justify-center">
          <aside className="flex w-full max-w-md flex-col gap-8 rounded-xl bg-white px-10 py-8 shadow-lg shadow-black">
            <h1 className="text-center text-4xl font-extrabold tracking-[2px] text-[#EE3248]">
              Multi-Factor Authentication
            </h1>

            <div className="flex flex-col gap-8 bg-white pb-4 shadow-sm">
              <div className="flex flex-col">
                <h2 className="text-center font-medium">
                  Multi-Factor Authentication
                </h2>
                <p className="text-center text-xs">
                  Please enter the verification code sent to your registered
                  device
                </p>
              </div>

              <form className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="h-12 w-12 rounded-md border-2 border-gray-300 text-center text-xl focus:border-blue-500 focus:outline-none"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#EE3248] py-2 text-xs font-semibold text-white disabled:opacity-50">
                  VERIFY
                </button>

                <button className="w-full rounded-full border py-2 text-xs font-semibold text-gray-400 disabled:opacity-50">
                  {" "}
                  <Link href={"/"}> BACK TO LOGIN</Link>
                </button>
              </form>

              <p className="flex items-center justify-center gap-1 text-center text-xs text-gray-500">
                {" "}
                <LockKeyhole className="h-3 w-3" />
                Didn’t receive a code?{" "}
                <button className="ml-2 text-xs text-[#EE3248]">Resend</button>
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default MFA;

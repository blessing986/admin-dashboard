"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginData {
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await fetch(
        "https://api.decove.com/api/v1/auth/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      console.log(result);

      if (response.ok && result.token?.token) {
        dispatch(setAuth(result.token.token));
        router.push("/role/user");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            type="email"
            placeholder="Username"
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm font-normal placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
            {...register("username")}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="password"
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm font-normal placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 cursor-pointer accent-black"
          />
          <label htmlFor="remember" className="text-xs">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="my-2 w-full rounded-full bg-[#EE3248] py-2 text-xs text-white">
          Login
        </button>

        <Link className="mb-10 text-center text-xs" href="#">
          Forgot Password?
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loading, setAuth, loadingStops } from "../store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Slide, ToastContainer, toast } from "react-toastify";
import { LoaderIcon } from "lucide-react";
import { RootState } from "@/store";

interface LoginData {
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email format")
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
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
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const onSubmit = async (data: LoginData) => {
    dispatch(loading());

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
        toast.error(
          <div>
            <strong className="text-sm font-semibold">Network Response</strong>
            <p className="text-sm">
              {result.message || "Invalid login details"}
            </p>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          },
        );
        dispatch(loadingStops());
      }
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(loadingStops());
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            type="email"
            disabled={isLoading}
            placeholder="Username"
            className="flex h-10 w-full rounded-md border px-3 py-2 text-xs font-normal placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-xs text-[#EE3248]">
              {errors.username.message}
            </span>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border px-3 py-2 text-xs font-normal placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-xs text-[#EE3248]">
              {errors.password.message}
            </span>
          )}
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
          disabled={isLoading}
          className="my-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#EE3248] py-2 text-xs text-white disabled:opacity-50">
          {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
          Login
        </button>

        <Link className="mb-10 text-center text-xs" href="#">
          Forgot Password?
        </Link>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
};

export default LoginForm;

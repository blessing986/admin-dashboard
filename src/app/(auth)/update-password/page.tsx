"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  loading,
  loadingStops,
  togglePasswordVisibility,
} from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { Slide, ToastContainer, toast } from "react-toastify";
import { LoaderIcon, Eye, EyeClosed } from "lucide-react";
import { RootState } from "@/store";
import BackgroundImage from "@/components/bgImg";

interface UpdatePasswordData {
  email: string;
  password: string;
  resetToken: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  resetToken: Yup.string().required("Token is required"),
});

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isPasswordVisible = useSelector(
    (state: RootState) => state.auth.isPasswordVisible,
  );

  const onSubmit = async (data: UpdatePasswordData) => {
    dispatch(loading());

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UPDATE_PASSWORD}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(
          <div>
            <strong className="text-sm font-semibold">Success</strong>
            <p className="text-sm">
              {result.message || "Password changed successfully"}
            </p>
          </div>,
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          },
        );
        setTimeout(() => {
          router.push("/");
          dispatch(loadingStops());
        }, 1000);
      } else {
        toast.error(
          <div>
            <strong className="text-sm font-semibold">Network Response</strong>
            <p className="text-sm">{result.message || "Verification failed"}</p>
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
      <main>
        <BackgroundImage />

        <div className="relative flex h-screen w-full items-center justify-center">
          <aside className="flex w-full max-w-md flex-col gap-8 rounded-xl bg-white px-10 py-8 shadow-lg shadow-black">
            <h1 className="text-center text-4xl font-extrabold tracking-[2px] text-[#EE3248]">
              Change Password
            </h1>

            <div className="flex flex-col gap-8 bg-white pb-4 shadow-sm">
              <div className="flex flex-col">
                <h2 className="text-center font-medium">Change Password</h2>
                <p className="text-center text-xs">
                  For security reasons, you need to update your password
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3">
                <div>
                  <input
                    type="email"
                    disabled={isLoading}
                    placeholder="Email"
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-xs font-normal placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-xs text-[#EE3248]">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    disabled={isLoading}
                    placeholder="Reset Token"
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-xs font-normal placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
                    {...register("resetToken")}
                  />
                  {errors.resetToken && (
                    <span className="text-xs text-[#EE3248]">
                      {errors.resetToken.message}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    disabled={isLoading}
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-xs font-normal placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => dispatch(togglePasswordVisibility())}>
                    {isPasswordVisible ? (
                      <EyeClosed size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>

                  {errors.password && (
                    <span className="text-xs text-[#EE3248]">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="my-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#EE3248] py-2 text-xs text-white disabled:opacity-50">
                  {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
                  UPDATE PASSWORD
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>
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

export default UpdatePassword;

"use client";

import BackgroundImage from "@/components/bgImg";
import { LoaderIcon, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loading, loadingStops } from "@/store/authSlice";
import { RootState } from "@/store";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface ResetPasswordData {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const onSubmit = async (data: ResetPasswordData) => {
    dispatch(loading());

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RESET_PASSWORD_LINK}`,
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

      if (response.ok && result.message) {
        toast.success(
          <div>
            <strong className="text-sm font-semibold">Success</strong>
            <p className="text-sm">
              {result.message || "Check your email for your reset token"}
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
          router.push("/update-password");
          dispatch(loadingStops());
        }, 1000);
      } else {
        toast.error(
          <div>
            <strong className="text-sm font-semibold">Network Response</strong>
            <p className="text-sm">
              {result.message || "Invalid email address"}
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
      console.error("Invalid email address:", error);
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
              Reset Password
            </h1>

            <div className="flex flex-col gap-8 bg-white pb-4 shadow-sm">
              <div className="flex flex-col">
                <h2 className="text-center font-medium">Reset Your Password</h2>
                <p className="text-center text-xs">
                  Enter your registered email address to receive password reset
                  instructions
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Email Address"
                    disabled={isLoading}
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-xs font-normal placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:opacity-50"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-xs text-[#EE3248]">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#EE3248] py-2 text-xs font-semibold text-white disabled:opacity-50">
                  {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
                  SEND RESET LINK
                </button>

                <button
                  className="w-full rounded-full border py-2 text-xs font-semibold text-gray-400 disabled:opacity-50"
                  disabled={isLoading}>
                  {" "}
                  <Link href={"/"}> BACK TO LOGIN</Link>
                </button>
              </form>

              <p className="flex items-center justify-center gap-1 text-center text-xs text-gray-500">
                {" "}
                <LockKeyhole className="h-3 w-3" />
                Didn’t receive a link?{" "}
                <button className="ml-2 text-xs text-[#EE3248]">Resend</button>
              </p>
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

export default ResetPassword;

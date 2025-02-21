import Image from "next/image";
import illustration from "@/assets/login_image_illustration.png";
import bg from "@/assets/bg.jpg";
import LoginForm from "@/components/loginForm";

const Homepage = () => {
  const currentDate = new Date().getFullYear();

  return (
    <main className="">
      <Image
        src={bg}
        alt="BG Image"
        className="absolute h-full w-full object-cover brightness-[0.45]"
      />
      <div className="relative flex h-screen w-full items-center justify-center">
        <aside className="flex w-full max-w-md flex-col gap-8 rounded-xl bg-white px-16 py-8 shadow-lg shadow-black">
          <h1 className="text-center text-4xl font-extrabold tracking-[2px] text-[#EE3248]">
            Sign In
          </h1>

          <div className="flex flex-col gap-8 bg-white shadow-sm">
            <div className="flex w-full items-center justify-between bg-[#EE3248] bg-opacity-20">
              <div className="flex flex-col gap-2 p-4 text-[#EE3248]">
                <h2 className="text-sm font-medium">Welcome Back</h2>
                <h2 className="text-xs">Sign in to Continue</h2>
              </div>
              <div className="flex">
                <Image
                  src={illustration}
                  alt="illustration"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <LoginForm />
          </div>

          <div className="flex w-full flex-col items-center gap-1">
            <p className="text-center text-xs">
              Don’t have an account ?{" "}
              <span className="font-medium">Contact Admin</span>
            </p>
            <p className="text-center text-xs">
              &copy; {currentDate} Crafted and designed Blessing.net
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Homepage;

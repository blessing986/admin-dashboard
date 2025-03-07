import Navbar from "@/app/(dashboard)/components/navbar";
import Sidebar from "@/app/(dashboard)/components/sidebar";
import AuthWrapper from "@/components/AuthWrapper";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AuthWrapper>
        <div className="flex">
          <div className="w-[290px]">
            <Sidebar />
          </div>
          <div className="flex-[4] p-5">
            <Navbar />
            {children}
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default Layout;

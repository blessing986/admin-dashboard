import Navbar from "@/ui/dashboard/navbar/navbar";
import Sidebar from "@/ui/dashboard/sidebar/sidebar";
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
          <div className="flex-1 p-5">
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

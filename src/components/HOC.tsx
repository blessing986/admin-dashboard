"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { ComponentType } from "react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated,
    );
    const router = useRouter();

    if (!isAuthenticated) {
      router.push("/");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return Wrapper;
};

export default withAuth;

"use client";

import withAuth from "./HOC";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{withAuth(() => <>{children}</>)({})}</>;
}

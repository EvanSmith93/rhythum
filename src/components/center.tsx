import { ReactNode } from "react";

export default function Center({ children }: { children: ReactNode }) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: `calc(100vh - 14rem)` }}
    >
      {children}
    </div>
  );
}

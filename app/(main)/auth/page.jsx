"use client";
import Login from "@/app/components/auth/Login";
import Registration from "@/app/components/auth/Registration";
import { useState } from "react";

export default function page() {
  const [view, setView] = useState(1);
  return (
    <div>
      {view === 1 ? (
        <Login setView={setView} />
      ) : (
        <Registration setView={setView} />
      )}
    </div>
  );
}

import { Suspense } from "react";
import CallbackClient from "./CallbackClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticação",
};

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackClient />
    </Suspense>
  );
}

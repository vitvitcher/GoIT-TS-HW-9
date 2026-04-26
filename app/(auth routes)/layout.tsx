'use client'

import "../globals.css";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";





export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {

    router.refresh();
    startTransition(() => {
      setLoading(false);
    });
  }, [router]);
  return <>{loading ? <div>Loading...</div> : children}</>;
}

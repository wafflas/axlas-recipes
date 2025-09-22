"use client";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";

export default function Loading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  return <Spinner centerScreen size={320} />;
}

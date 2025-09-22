"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Spinner({
  size = 320,
  centerScreen = false,
  navigation = false,
  minMs = 1200,
}: {
  size?: number;
  centerScreen?: boolean;
  navigation?: boolean;
  minMs?: number;
}) {
  const pathname = usePathname();
  const [show, setShow] = useState(navigation ? false : true);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!navigation) return;
    setShow(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setShow(false), minMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname, navigation, minMs]);

  if (navigation && !show) return null;

  const wrapperClass = navigation
    ? "fixed inset-0 z-40 flex items-center justify-center"
    : centerScreen
      ? "fixed inset-0 z-50 flex items-center justify-center bg-transparent"
      : "w-full flex items-center justify-center p-10";

  return (
    <div
      className={wrapperClass}
      style={navigation ? { background: "#fbf7ea" } : undefined}
    >
      <div style={{ width: size, height: size }}>
        <DotLottieReact
          src="https://lottie.host/95be97d0-fe99-4eef-a7c9-31d57db5570d/RTa3fUllWg.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}

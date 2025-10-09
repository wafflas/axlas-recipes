import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-start">
      <Image
        src="/axlas-recipes-logo-removebg-preview.png"
        alt="Logo"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Logo;

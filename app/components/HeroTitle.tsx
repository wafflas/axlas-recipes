import React from "react";

const HeroTitle = ({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <div
      className={`max-w-6xl mx-auto flex flex-col justify-center items-center py-8 ${className}`}
    >
      {subtitle && (
        <p className="text-sm md:text-base text-black/60 mb-2 tracking-wider uppercase font-inter">
          {subtitle}
        </p>
      )}
      <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold text-black leading-none tracking-tight">
        {title}
      </h1>
    </div>
  );
};

export default HeroTitle;

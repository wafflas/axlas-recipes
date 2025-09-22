import React from 'react'

const HeroTitle = ({title}: {title: string}) => {
  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center">
        <h1 className="text-[6rem] font-bold text-black">{title}</h1>
    </div>
  )
}

export default HeroTitle
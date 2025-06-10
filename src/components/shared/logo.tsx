//React, NextJs imports
import { FC } from "react";
import Image from "next/image"

//Image import from my assets
import LogoImg from "../../../public/assets/icons/Logo-1.png"


interface LogoProps{
    width:string;
    height:string;
}

const Logo:FC<LogoProps>=({width, height})=>{
    return <div className="z-50" style={{width:width, height:height}}>
        <Image src={LogoImg} alt="Wivich Store" className="w-full h-full object-cover overflow-visible"/>
    </div>
}

export default Logo;
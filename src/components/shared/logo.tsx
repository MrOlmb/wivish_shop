// React, Next.js
import { FC } from "react";
import Image from "next/image";

// Logo image
import LogoImg from "../../../public/assets/icons/logo.png";

interface LogoProps {
  width: string;
  height: string;
}

const Logo: FC<LogoProps> = ({ width, height }) => {
  return (
    <div style={{ width: width, height: height }}>
      <Image
        src={LogoImg}
        alt="Wivish"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;

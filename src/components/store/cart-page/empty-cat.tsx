import CartImg from "@/public/assets/images/cart.avif";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
export default function EmptyCart() {
  return (
    <div className="bg-[#f5f5f5]  w-full mx-auto px-4 text-center">
      <div className="min-h-[calc(100vh-65px)] pb-14 flex flex-col justify-center items-center">
        <Image
          src={CartImg}
          alt="Cart image"
          width={300}
          height={300}
          className="w-64 h-64"
        />
        <span className="py-4 font-bold my-3">
          Aucun article pour le moment ? Continuez vos achats pour explorer davantage.
        </span>
        <Link href="/browse">
          <Button variant="pink" className="w-56">
            Explorer les articles
          </Button>
        </Link>
      </div>
    </div>
  );
}

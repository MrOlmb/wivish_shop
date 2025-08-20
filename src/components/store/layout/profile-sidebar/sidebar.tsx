"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const path = pathname.split("/profile/")[1];
  const path_trim = path ? path.split("/")[0] : null;
  
  const menu = [
    {
      title: "Aperçu",
      link: "/profile",
    },
    {
      title: "Commandes",
      link: "/profile/orders",
    },
    {
      title: "Paiement",
      link: "/profile/payment",
    },
    {
      title: "Adresse de livraison",
      link: "/profile/addresses",
    },
    {
      title: "Avis",
      link: "/profile/reviews",
    },
    {
      title: "Historique",
      link: "/profile/history/1",
    },
    {
      title: "Liste de souhaits",
      link: "/profile/wishlist/1",
    },
    {
      title: "Abonnements",
      link: "/profile/following/1",
    },
  ];
  
  return (
    <div>
      <div className="w-full p-4 text-xs text-[#999]">
        <span>
          <Link href="/">Accueil</Link>
          <span className="mx-2">&gt;</span>
        </span>
        <span>
          <Link href="/profile">Compte</Link>
          {pathname !== "/profile" && <span className="mx-2">&gt;</span>}
        </span>
        {path && (
          <span>
            <Link href={pathname} className="capitalize">
              {path_trim || path}
            </Link>
          </span>
        )}
      </div>
      <div className="bg-white">
        <div className="py-3 inline-block w-full lg:w-[296px] min-h-72">
          <div className="font-bold text-main-primary flex h-9 items-center px-4">
            <div className="whitespace-nowrap overflow-ellipsis overflow-hidden">
              Compte
            </div>
          </div>
          {/* Links */}
          {menu.map((item) => (
            <Link key={item.link} href={item.link}>
              <div
                className={cn(
                  "relative flex h-9 items-center text-sm px-4 cursor-pointer hover:bg-[#f5f5f5]",
                  {
                    "bg-[#f5f5f5] user-menu-item":
                      item.link &&
                      (pathname === item.link ||
                        (pathname.startsWith(item.link) &&
                          item.link !== "/profile")),
                  }
                )}
              >
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


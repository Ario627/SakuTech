"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { House, BookOpen, ChartLine, User } from "phosphor-react";

const NAV_ITEMS = [
    {href: "/", label: "Beranda", Icon: House},
    { href: "/learn", label: "Cerita", Icon: BookOpen },
    { href: "/learn", label: "Progress", Icon: ChartLine },
    { href: "/profile", label: "Profil", Icon: User },
]  as const;

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-107.5 bg-warm-bg border-t border-warm-border z-50">
            <ul className="flex items-center justify-around h-17 px-2">
                {NAV_ITEMS.map(({ href, label, Icon }) => {
                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href) && href === "/learn" ? pathname === "/learn" && label === "Cerita" : false) || (href === "/learn" && label === "Progress" ? false : false);

                const active = label === "Cerita"
                    ? pathname === "/learn"
                    : label === "Progress"
                    ? pathname.startsWith("/learn/") || pathname === "/profile"
                    : pathname === href;

                return (
                    <li key={label}>
                    <Link
                        href={href}
                        className={cn(
                        "flex flex-col items-center justify-center gap-0.5 min-w-12 min-h-12 transition-colors",
                        active
                            ? "text-rose-accent"
                            : "text-text-secondary hover:text-text-body"
                        )}
                    >
                        <Icon size={22} weight={active ? "fill" : "regular"} />
                        <span className={cn(
                        "text-[10px] tracking-wide",
                        active && "underline underline-offset-2"
                        )}>
                        {label}
                        </span>
                    </Link>
                    </li>
                );
                })}
            </ul>
        </nav>
    )
}
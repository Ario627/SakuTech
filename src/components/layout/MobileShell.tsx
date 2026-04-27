import { cn } from "@/lib/cn";
import { div } from "framer-motion/client";

type MobileShellProps = {
    children: React.ReactNode;
    className?: string;
    withNav?: boolean;
}

export function MobileShell({ children, className, withNav = false }: MobileShellProps) {
    return (
        <div className="min-h-dvh bg-warm-bg flex justify-center">
            <div
                className={cn(
                    "w-full max-w-107.5 relative flex flex-col", withNav && "pb-18", className,
                )}
            >
                {children}
            </div>
        </div>
    )
}
import  MobileShell  from "@/components/layout/MobileShell";
import  BottomNav  from "@/components/layout/BottomNav";

export default function WithNavLayout({
    children,
}: Readonly<{children: React.ReactNode}>) {
    return (
        <MobileShell>
            {children}
            <BottomNav />
        </MobileShell>
    )
}
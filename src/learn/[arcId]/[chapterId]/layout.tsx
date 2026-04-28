import { MobileShell } from "@/components/layout/MobileShell";

export default function ChapterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MobileShell withNav={false}>
      {children}
    </MobileShell>
  );
}
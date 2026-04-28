import { cn } from "@/lib/cn";

type UserAvatarProps = {
  name: string | null;
  avatarUrl: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_MAP = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
} as const;

export default function UserAvatar({ name, avatarUrl, size = "md", className }: UserAvatarProps) {
  const initials = (name ?? "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name ?? "Avatar"}
        className={cn("rounded-full object-cover border-2 border-warm-border", SIZE_MAP[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-alaska-avatar flex items-center justify-center text-white font-bold",
        SIZE_MAP[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
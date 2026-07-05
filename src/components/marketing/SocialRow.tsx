import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";

const socialLinks = [
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "X", Icon: XIcon },
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "Youtube", Icon: YoutubeIcon },
];

export function SocialRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map(({ label, Icon }) => (
        <a
          key={label}
          href="#"
          aria-label={label}
          className="flex size-6 items-center justify-center opacity-90 transition-opacity hover:opacity-100"
        >
          <Icon className="size-6" />
        </a>
      ))}
    </div>
  );
}

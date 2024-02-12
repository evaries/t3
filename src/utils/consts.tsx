import localFont from "@next/font/local";
import { SocialSelectItemsType } from "y/components/entities/SocialDialog";
import Facebook from "y/components/shared/icons/Facebook";
import Instagram from "y/components/shared/icons/Instagram";
import Linkedin from "y/components/shared/icons/Linkedin";
import Twitter from "y/components/shared/icons/Twitter";
import Youtube from "y/components/shared/icons/Youtube";

export const virgil = localFont({
  src: [
    {
      path: "../../public/fonts/Virgil.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/Virgil.woff2",
      weight: "700",
    },
  ],
  variable: "--font-virgil",
});

export const socialSelect = [
  { value: "twitter", icon: <Twitter /> },
  { value: "instagram", icon: <Instagram /> },
  { value: "facebook", icon: <Facebook /> },
  { value: "linkedin", icon: <Linkedin /> },
  { value: "youtube", icon: <Youtube /> },
] as const;

export const socialIcons: Record<SocialSelectItemsType, React.JSX.Element> = {
  twitter: <Twitter />,
  instagram: <Instagram />,
  facebook: <Facebook />,
  linkedin: <Linkedin />,
  youtube: <Youtube />,
};

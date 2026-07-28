import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandTwitter,
} from "@tabler/icons-react";
import type { ComponentType, SVGProps } from "react";

type TablerIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const socialIcons: Record<string, TablerIcon> = {
  Linkedin: IconBrandLinkedin,
  Instagram: IconBrandInstagram,
  Tiktok: IconBrandTiktok,
  Facebook: IconBrandFacebook,
  Twitter: IconBrandTwitter,
};

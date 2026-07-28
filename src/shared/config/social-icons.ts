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
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandFacebook,
  IconBrandTwitter,
};

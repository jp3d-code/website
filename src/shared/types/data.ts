export type Image = {
  name: string;
  alt: string;
  description: string;
};

export type MenuItem = {
  label: string;
  href: string;
  slug: string;
  visible: boolean;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type Banner = {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  phone: string;
  imageBig: string;
  imageSmall: string;
  socials: SocialLink[];
};

export type BrandToken =
  | { type: "text"; value: string }
  | { type: "highlight"; value: string; image: string };

export type HomeService = {
  title: string;
  hash: string;
  number: string;
  description: string;
};

export type Sponsor = {
  name: string;
  url: string;
  img: string;
  alt: string;
};

export type ExploreLink = {
  title: string;
  url: string;
};

export type ContactData = {
  smallTitle: string;
  bigTitle: string;
  location: string;
  phone: string;
  email: string;
  whatsapp?: string;
  mapSrc: string;
  socials: SocialLink[];
  copyright: string;
};

export type Testimonial = {
  name: string;
  role: string;
  phone: string;
  email: string;
  quote: string;
};

export type ContentSection = {
  title: string;
  image?: string;
  paragraphs: string[];
};

export type BrandPage = {
  sections: ContentSection[];
  description: string[];
  testimonial: Testimonial;
};

export type ProjectItem = {
  title: string;
  image: string;
  paragraphs: string[];
  description: string;
};

export type ProjectsPage = {
  items: ProjectItem[];
  description: string;
  testimonial: Testimonial;
};

export type ServiceItem = {
  title: string;
  image: string;
  paragraphs: string[];
};

export type ServicesPage = {
  items: ServiceItem[];
  description: string[];
  testimonial: Testimonial;
};

export type ProductItem = {
  name: string;
  image: string;
  price: string;
};

export type ProductCategory = {
  title: string;
  items: ProductItem[];
};

export type ProductsPage = {
  catalogPdf?: string;
  categories: ProductCategory[];
};

export type AboutItem = {
  title: string;
  image?: string;
  video?: string;
  paragraphs: string[];
};

export type AboutPage = {
  items: AboutItem[];
  description: string[];
  testimonial: Testimonial;
};

export type HomeData = {
  banner: Banner;
  brandTokens: BrandToken[];
  services: HomeService[];
  movingWords: string[];
  sponsors: Sponsor[];
  exploreLinks: ExploreLink[];
};

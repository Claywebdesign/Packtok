import { StaticImageData } from "next/image";

export type CategoryItem = {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  image: StaticImageData | string;
  isServiceCard?: boolean;
};

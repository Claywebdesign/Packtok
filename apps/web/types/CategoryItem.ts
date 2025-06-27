import { StaticImageData } from "next/image";

export type CategoryItem = {
  title: string;
  subtitle: string;
  description: string;
  image: StaticImageData | string;
};

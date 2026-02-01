export type Product = {
  slug: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "transformer-tank",
    image: "/media/Premium Industrial Product - Heat Exchanger 1_1.jpg",
  },
  { slug: "wavewall", image: "/media/Premium Industrial Product - Hexagonal Grate.jpg" },
  {
    slug: "accessories",
    image: "/media/Premium Industrial Product - Metal Plates Stack.jpg",
  },
  {
    slug: "oil-purification",
    image: "/media/Premium Industrial Product - Filtration Unit 1_1.jpg",
  },
  {
    slug: "vacuum-drying-oven",
    image: "/media/Premium Industrial Product - Sheet Metal Profiles 1_1.jpg",
  },
  {
    slug: "vacuum-oil-filling-room",
    image: "/media/Premium Industrial Product - Cylindrical Vessel.jpg",
  },
  { slug: "coil-winding-machine", image: "/media/Enhanced Industrial Manufacturing - 4_3 (1).jpg" }
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

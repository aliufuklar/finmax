export type Product = {
  slug: string;
  image: string;
};

export const products: Product[] = [
  { slug: "transformer-tank", image: "/media/process-shipment.jpg" },
  { slug: "wavewall", image: "/media/process-wavewall.jpg" },
  { slug: "accessories", image: "/media/process-welding.jpg" },
  { slug: "oil-purification", image: "/media/capacity-production.jpg" },
  { slug: "vacuum-drying-oven", image: "/media/process-vacuum.jpg" },
  { slug: "vacuum-oil-filling-room", image: "/media/process-vacuum.jpg" },
  { slug: "coil-winding-machine", image: "/media/capacity-production.jpg" }
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

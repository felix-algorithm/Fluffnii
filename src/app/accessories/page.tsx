import type { Metadata } from "next";
import AccessoriesShop from "./AccessoriesShop";

export const metadata: Metadata = {
  title: "Accessories & 3D Gear | FluffNii Studio",
  description:
    "3D-printed cooling fans, oversized fursuit glasses, horns, magnetic tongues, and ear jewelry built for fursuiters.",
};

export default function AccessoriesPage() {
  return <AccessoriesShop />;
}

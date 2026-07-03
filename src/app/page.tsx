import { Hero } from "@/components/sections/Hero";
import { SplitPanels } from "@/components/sections/SplitPanels";
import { ProductShelf } from "@/components/sections/ProductShelf";
import { WhiteLabelBand } from "@/components/sections/WhiteLabelBand";
import { Statement } from "@/components/sections/Statement";
import { AboutStrip } from "@/components/sections/AboutStrip";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <SplitPanels />
      <ProductShelf />
      <WhiteLabelBand />
      <Statement />
      <AboutStrip />
      <FinalCta />
    </>
  );
}

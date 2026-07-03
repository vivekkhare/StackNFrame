"use client";

import dynamic from "next/dynamic";
import { HeroFallback } from "./HeroFallback";

/** Code-splits three.js away from every route's initial bundle. */
export const HeroSceneLazy = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

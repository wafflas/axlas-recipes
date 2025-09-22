"use client";
import { NextStudio } from "next-sanity/studio";
import studioConfig from "../../../sanity.config";
import type { ComponentType } from "react";

export default function StudioPage() {
  const Studio = NextStudio as unknown as ComponentType<{ config: unknown }>;
  return <Studio config={studioConfig as unknown} />;
}

import { ContentColorProp, EmphasisProp, SizeProp } from "@/styles/types";
import { PropsWithChildren } from "react";

export type TypographyProps = PropsWithChildren<{
  size?: SizeProp;
  emphasis?: EmphasisProp;
  color?: ContentColorProp;
  colorOverride?: string;
}>;

import React from "react";

import { Avatar } from "@/components/atoms";

import { CompanyAvatarProps } from "./types";

export const CompanyAvatar = (props: CompanyAvatarProps) => (
  <Avatar shape="rounded-square" {...props} />
);

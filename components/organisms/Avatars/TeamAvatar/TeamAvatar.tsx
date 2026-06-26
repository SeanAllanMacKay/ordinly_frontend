import React from "react";

import { Avatar } from "@/components/atoms";

import { TeamAvatarProps } from "./types";

export const TeamAvatar = (props: TeamAvatarProps) => (
  <Avatar shape="circle" {...props} />
);

import React from "react";

import { Avatar } from "@/components/atoms";

import { UserAvatarProps } from "./types";

export const UserAvatar = (props: UserAvatarProps) => (
  <Avatar shape="circle" {...props} />
);

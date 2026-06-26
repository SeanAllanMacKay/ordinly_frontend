import React from "react";

import { Avatar } from "@/components/atoms";

import { ClientAvatarProps } from "./types";

export const ClientAvatar = (props: ClientAvatarProps) => (
  <Avatar shape="rounded-square" {...props} />
);

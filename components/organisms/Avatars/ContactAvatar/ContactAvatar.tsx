import React from "react";

import { Avatar } from "@/components/atoms";

import { ContactAvatarProps } from "./types";

export const ContactAvatar = (props: ContactAvatarProps) => (
  <Avatar shape="circle" {...props} />
);

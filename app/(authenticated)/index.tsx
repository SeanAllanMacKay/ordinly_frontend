import React from "react";
import { Redirect } from "expo-router";
import { routes } from "@/constants/routes";

export default function AuthenticatedRoot() {
  return <Redirect href={routes.manage.personal.root()} />;
}

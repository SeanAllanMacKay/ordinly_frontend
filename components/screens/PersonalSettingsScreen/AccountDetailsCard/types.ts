import { ImageType } from "@/components";

export type EditAccountDetailsFormValues = {
  profilePicture: ImageType;
  name: string;
  email: string;
};

export type EditAccountDetailsScreenProps = {
  onClose: () => void;
};

export type VerifyAccountScreenProps = {
  code?: string;
  onRedirect: (hasUser: boolean) => void;
};

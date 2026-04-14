export type EnrichedTextInputProps = {
  label?: string;
  initialValue?: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  isSkeleton?: boolean;
  isLoading?: boolean;
  index?: number;
};

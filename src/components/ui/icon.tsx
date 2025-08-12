import { LoaderCircle } from "lucide-react";
import { cn } from "~/lib/utils";

const Icons = {
  loader: LoaderCircle
}

export type IconName = keyof typeof Icons;

export type IconProps = {
  name: IconName;
  className?: string;
  spin?: boolean;
}

export const Icon = ({ name, className, spin }: IconProps) => {
  const IconClass = Icons[name];
  return <IconClass className={
    cn({
      'animate-spin': spin,
    }, className)
  } />;
};
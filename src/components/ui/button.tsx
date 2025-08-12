import { cn } from "~/lib/utils";
import { Icon, type IconProps } from "./icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  icon?: IconProps
}

export const Button = ({ children, className, icon, ...props }: ButtonProps) => {
  return (
    <button className={cn('bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2', className)} {...props}>
      {icon && <Icon name={icon.name} spin={icon.spin} />}
      {children}
    </button>
  )
};
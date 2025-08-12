import { cn } from '~/lib/utils';

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('mx-auto w-full p-4', className)}>
    {children}
  </div>
);
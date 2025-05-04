import { cn } from '@renderer/utils';
import { ComponentProps } from 'react';

export const RootLayout = ({ children, className, ...rest }: ComponentProps<'main'>) => {
  return (
    <main className={cn('flex flex-row h-screen', className)} {...rest}>{children}</main>
  )
}

export const Sidebar = ({ className, children, ...rest }: ComponentProps<'aside'>) => {
  return (
    <aside className={cn('w-[250px] mt-10 h-[100vh + 10px] overflow-auto', className)} {...rest}>
      {children}
    </aside>
  );
};

export const Content = ({ className, children, ref, ...rest }: ComponentProps<'div'>) => {
  return (
    <div className={cn('flex-1 overflow-auto', className)} ref={ref} {...rest}> {children}</div>
  )
}
Content.displayName = 'Content'

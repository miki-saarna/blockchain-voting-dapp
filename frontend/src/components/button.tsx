import { JSX, ReactNode } from 'react';

export default function Button({ children, className, link, ...props }: any): JSX.Element {
  return (
    <>
      {link
        ? <a href={link} {...props} className={`py-1.5 px-2.5 rounded-md text-sm ${className}`}>{children}</a>
        : (<button {...props} className={`py-1.5 px-2.5 rounded-md text-sm ${className}`}>{children}</button>)
      }
    </>
  )
}

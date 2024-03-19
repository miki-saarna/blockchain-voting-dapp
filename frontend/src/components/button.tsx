import { JSX, ReactNode } from 'react';

export default function Button({ children, color, className, style, link, target, rel }: { children: ReactNode, color: string, className?: string, style?: { [key: string]: string }, link?: string, target?: string, rel?: string }): JSX.Element {
  return (
    <>
      {link
        ? <a href={link} target={target} rel={rel} className={`py-1.5 px-2.5 rounded-md text-white text-sm ${color} ${className}`} style={style}>{children}</a>
        : (<button className={`py-1.5 px-2.5 rounded-md text-white text-sm ${color} ${className}`} style={style}>{children}</button>)
      }
    </>
  )
}

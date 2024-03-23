import { forwardRef, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({className, ...props}, ref) => {
  return (
    <input
      ref={ref}
      placeholder="Add a new candidate"
      type="text"
      className={`py-1.5 px-2.5 border border-sage-light focus:outline-sage rounded-md ${className}`}
      {...props}
    />
  )
})

export default TextInput

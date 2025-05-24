import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type BaseInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'>;

export interface InputProps extends BaseInputProps {
  /** Optional custom className for styling */
  className?: string;
  /** Icon component from Lucide or custom icon component */
  icon?: LucideIcon | React.FC<{ className?: string }>;
  /** Position of the icon */
  iconPosition?: 'left' | 'right';
  /** Size variant of the input */
  size?: 'sm' | 'md' | 'lg';
  /** Optional error state */
  error?: boolean;
  /** Optional error message */
  errorMessage?: string;
}

const inputSizes = {
  sm: 'h-8 px-2 text-sm',
  md: 'h-10 px-3 text-base',
  lg: 'h-12 px-4 text-lg',
} as const;

const baseInputStyles = [
  "flex w-full rounded-md border border-primary",
  "bg-background text-primary",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "transition-colors duration-200"
] as const;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  type = 'text',
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  error,
  errorMessage,
  ...props
}, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRef(ref, inputRef);

  const handleIconClick = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const renderIcon = React.useCallback(() => {
    if (!Icon) return null;

    return (
      <div
        onClick={handleIconClick}
        className={cn(
          "absolute inset-y-0 flex items-center",
          iconPosition === 'left' ? 'left-3' : 'right-3',
          "cursor-pointer"
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4 flex-none",
            error ? 'text-destructive' : 'text-muted-foreground'
          )}
          aria-hidden="true"
        />
      </div>
    );
  }, [Icon, iconPosition, error, handleIconClick]);

  return (
    <div className="relative w-full">
      {iconPosition === 'left' && renderIcon()}
      <input
        type={type}
        ref={mergedRef}
        className={cn(
          baseInputStyles,
          inputSizes[size],
          Icon && iconPosition === 'left' && 'pl-10',
          Icon && iconPosition === 'right' && 'pr-10',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        aria-invalid={error}
        aria-errormessage={errorMessage}
        {...props}
      />
      {iconPosition === 'right' && renderIcon()}
      {error && errorMessage && (
        <p className="mt-1 text-sm text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

// Utility hook for merging refs
function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]) {
  return React.useCallback((element: T) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref && typeof ref === 'object') {
        (ref as React.MutableRefObject<T>).current = element;
      }
    });
  }, [refs]);
}

// For better debugging
Input.displayName = "Input";

export { Input };

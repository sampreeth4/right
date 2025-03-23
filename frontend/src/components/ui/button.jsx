import { cn } from "../../lib/utils";

const Button = ({ children, className, ...props }) => {
  return (
    <button className={`bg-primary text-white rounded-md px-4 py-2 hover:bg-primary-dark transition ${className}`} {...props}>
      {children}
    </button>
  );
};

export { Button };

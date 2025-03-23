const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`border rounded-md p-2 mb-4 w-full ${className}`}
      {...props}
    />
  );
};

export { Textarea }; 
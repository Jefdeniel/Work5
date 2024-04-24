interface Props {
  children?: React.ReactNode;
}

const ErrorText = ({ children, ...rest }: Props) => {
  return (
    <small className="text-red-600" {...rest}>
      {children}
    </small>
  );
};

export default ErrorText;

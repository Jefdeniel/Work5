interface Props {
  children?: React.ReactNode;
}

const ErrorText = ({ children, ...rest }: Props) => {
  return (
    <small className="text-danger" {...rest}>
      {children}
    </small>
  );
};

export default ErrorText;

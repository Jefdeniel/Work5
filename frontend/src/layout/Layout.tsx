interface Props {
  title: string;
}

const Layout = ({ title }: Props) => {
  return (
    <div className="d-flex flex-row p-0" style={{ minHeight: '100%' }}>
      layout
      {title}
    </div>
  );
};

export default Layout;

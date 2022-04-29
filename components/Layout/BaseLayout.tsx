import HeaderHome from "../Common/Header/HeaderHome";

export default function Layout({ children }) {
  return (
    <>
      <HeaderHome />
      <main>{children}</main>
    </>
  );
}

import { useRouter } from "next/router";
import en from "../../utility/lang/en";
import vi from "../../utility/lang/vi";

const useTrans = () => {
  const { locale } = useRouter();
  const trans = locale === "" ? vi : locale === "vi" ? vi : en;
  return trans;
};

export default useTrans;

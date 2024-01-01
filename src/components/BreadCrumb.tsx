import Link from "next/link";
import { HiHome } from "react-icons/hi2";

const BreadCrumb = () => {
  return (
    <div>
      <Link href="/">
        <HiHome className="text-master-pink h-5 w-5 inline" />
      </Link>
      <span className="px-4">/</span>
      <span>Path</span>
    </div>
  );
};

export default BreadCrumb;

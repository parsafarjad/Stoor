import Link from "next/link";
import { HeartHandshake } from "lucide-react";
function Footer() {
  return (
    <div className="flex flex-col justify-center items-center sm:justify-between sm:items-center sm:flex-row w-full bg-zinc-900 text-white p-4">
      <h2 className="flex items-center gap-2">
        <HeartHandshake />
        توسعه و طراحی توسط پارسا فرجاد
      </h2>
      <Link href={"https://parsafarjad.ir"}>www.parsafarjad.ir</Link>
    </div>
  );
}

export default Footer;

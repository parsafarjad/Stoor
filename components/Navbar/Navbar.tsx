import Link from "next/link";
import { Users, LayoutDashboard } from "lucide-react";
function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white p-4">
      <ul className="flex w-full space-x-6">
        <li>
          <Link href="/dashboard" className="flex items-center gap-1">
            <LayoutDashboard className="w-5 stroke-[1.5px]" />
            داشبورد
          </Link>
        </li>
        <li>
          <Link href="/users" className="flex items-center gap-1">
            <Users className="w-5 stroke-[1.5px]" />
            کاربران
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

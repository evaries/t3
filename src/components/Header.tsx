import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { virgil } from "y/utils/consts.tsx";
import Login from "./entities/Login";
import Logout from "./entities/Logout";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { status } = useSession();

  return (
    <header className="sticky top-0 bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <div className="uppercase">logo</div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            href={`/#features`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Features
          </Link>
          <Link
            href={`/#how`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            How it works
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {status === "unauthenticated" ? <Login /> : <Logout />}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel
          className={`${virgil.variable} fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 font-sans sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
        >
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <div className="uppercase">logo</div>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col"
            >
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Features
              </a>
              <a
                href="#how"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                How it works
              </a>
            </div>
            <div className="py-6">
              {status === "unauthenticated" ? <Login /> : <Logout />}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

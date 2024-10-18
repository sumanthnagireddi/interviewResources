import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8 backdrop-blur-sm lg:left-72 xl:left-80 dark:backdrop-blur bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]">
      <div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
      <div className="hidden lg:block lg:max-w-md lg:flex-auto">
        <button
          type="button"
          className="hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none lg:flex dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
            ></path>
          </svg>
          Find something...
          <kbd className="ml-auto text-2xs text-zinc-400 dark:text-zinc-500">
            <kbd className="font-sans">Ctrl </kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        </button>
      </div>
      <div className="flex items-center  lg:hidden">
        <Sheet>
          <SheetTrigger>
            <span
              className="flex h-6 w-6  items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
              aria-label="Toggle navigation"
            >
              <svg
                viewBox="0 0 10 9"
                fill="none"
                strokeLinecap="round"
                aria-hidden="true"
                className="w-2.5 stroke-zinc-900 dark:stroke-white"
              >
                <path d="M.5 1h9M.5 8h9M.5 4.5h9"></path>
              </svg>
            </span>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>
          
                  <span className=" hidden lg:flex items-center">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-6 md:pl-2"
                    >
                      <path
                        className="fill-emerald-400"
                        d="M16 8a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5v13.927a1 1 0 0 0 1.623.782l3.684-2.93a4 4 0 0 1 2.49-.87H11a5 5 0 0 0 5-5V8Z"
                      ></path>
                    </svg>
                    <span className="font-semibold text-lg fill-zinc-900">
                      Sumanth Nagireddi
                    </span>
                  </span>
              </SheetTitle>
              <Sidebar />
              <SheetDescription></SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div aria-label="Home">
          <span className="flex items-center">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 pl-2">
              <path
                className="fill-emerald-400"
                d="M16 8a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5v13.927a1 1 0 0 0 1.623.782l3.684-2.93a4 4 0 0 1 2.49-.87H11a5 5 0 0 0 5-5V8Z"
              ></path>
            </svg>
            <span className="font-semibold text-base  md:text-lg fill-zinc-900">
              Sumanth Nagireddi
            </span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            <li>
              <span className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                Resources
              </span>
            </li>
            <li>
              <span className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                About Me
              </span>
            </li>
            <li>
              <span className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                Contact
              </span>
            </li>
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
        <div className="flex gap-4">
          <div className="contents lg:hidden">
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 ui-not-focus-visible:outline-none lg:hidden dark:hover:bg-white/5"
              aria-label="Find something..."
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="h-5 w-5 stroke-zinc-900 dark:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
                ></path>
              </svg>
            </button>
          </div>
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
            aria-label="Switch to dark theme"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="h-5 w-5 stroke-zinc-900 dark:hidden"
            >
              <path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
              <path
                strokeLinecap="round"
                d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707"
              ></path>
            </svg>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="hidden h-5 w-5 stroke-white dark:block"
            >
              <path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z"></path>
            </svg>
          </button>
        </div>
        <div className="hidden min-[416px]:contents">
          <Link to={"admin"}>
            <span className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300">
              Sign in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

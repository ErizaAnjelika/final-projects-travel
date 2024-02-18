import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900 ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src="/img/logo2.png" className="h-16" alt="FlowBite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                TravelGo
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:underline me-4 md:me-6">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/Activity" className="hover:underline me-4 md:me-6">
                  Aktivitas
                </Link>
              </li>
              <li>
                <Link href="/Promo" className="hover:underline me-4 md:me-6">
                  Promo
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              TravelGo™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

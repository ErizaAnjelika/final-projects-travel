import React from "react";

const Footer2 = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            TravelGo™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer2;

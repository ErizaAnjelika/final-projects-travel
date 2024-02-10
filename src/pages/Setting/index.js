import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Footer2 from "@/component/Footer/Footer2";
const Setting = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
          {
            headers: {
              "Content-Type": "application/json",
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto md:p-0 lg:p-0 p-5">
      <nav
        className="flex py-5 bg-white border-b border-gray-200"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-md font-medium text-gray-900 hover:text-blue-600  dark:hover:text-gray-500"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Beranda
            </Link>
          </li>

          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-900 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2 dark:text-gray-600">
                Pengaturan Akun
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div
        key={data.id}
        className="grid md:grid-cols-2 sm:grid-cols-1 mt-5 mb-10"
      >
        <div className="w-full">
          <img
            className="w-64 h-w-64 m-auto rounded-full"
            src={data.profilePictureUrl}
            alt={data.name}
          />
        </div>
        <div className="px-5">
          <div className="mb-3">
            <h2 className="text-lg font-semibold capitalize">{data.name} </h2>
            <p className="text-sm ml-3">{data.description}</p>
          </div>
          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <span className="bg-blue-100  text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                {data.role}
              </span>
            </div>
          </div>
          <div className="mt-2.5 mb-3">
            <p className="text-sm flex items-center text-gray-800 ">
              {data.email}
            </p>
          </div>
          <div className="mt-2.5 mb-3">
            <p className="text-sm flex items-center text-gray-800 ">
              {data.phoneNumber}
            </p>
          </div>
          <div className="flex gap-3 mt-3">
            <Link
              href={`/Setting/${data.id}/editRole`}
              type="button"
              className="flex mt-4 border border-blue-400 text-gray-800  focus:outline-none hover:bg-blue-200 hover:border-0 hover:text-gray-900  font-medium rounded-lg text-sm px-2 py-2 "
            >
              {" "}
              <svg
                className="w-5 h-5 text-blue-800 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                />
              </svg>
              <span className="ml-1">Edit Role</span>
            </Link>
            <Link
              href={`/Setting/${data.id}/editProfile`}
              type="button"
              className="flex mt-4 border border-blue-400 text-gray-800  focus:outline-none hover:bg-blue-200 hover:border-0 hover:text-gray-900  font-medium rounded-lg text-sm px-2 py-2 "
            >
              {" "}
              <svg
                className="w-5 h-5 text-blue-800 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                />
              </svg>
              <span className="ml-1">Edit Profile</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default Setting;

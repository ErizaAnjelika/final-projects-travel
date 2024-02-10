import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/component/NavBar";
import Link from "next/link";
import Footer2 from "@/component/Footer/Footer2";
const DetailActivityPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setData(response.data.data);
      } catch (err) {
        console.error(err.response);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto md:p-0 lg:p-0 p-5">
      <nav
        className="flex py-5  bg-white border-b border-gray-200"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-blue-600  dark:hover:text-gray-500"
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
          <li className="inline-flex items-center">
            <Link
              href="/Activity"
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-blue-600  dark:hover:text-gray-500"
            >
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
              Aktivitas
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
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-600">
                Detail Aktifitas
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 mt-5 mb-10">
        <div className="h-auto">
          <img src={data.imageUrls} alt={data.title} />
          <h1 className="text-2xl text-center font-sans font-bold mt-3">
            {data.title}
          </h1>
        </div>
        <div className="md:p-5 lg:p-5 pt-4">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Deskripsi: </h2>
            <p className="text-sm ml-3">{data.description}</p>
          </div>

          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {[...Array(data.rating)].map((_, index) => (
                <svg
                  key={index}
                  className="w-3 h-3 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <span className="bg-blue-100  text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                {data.total_reviews} Review
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2.5 mb-5">
            <div>
              <p className="flex-row text-md font-bold text-gray-900 dark:text-white">
                {data.price !== undefined
                  ? data.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : "Harga tidak tersedia"}
              </p>
              <p className="text-xs text-gray-900 dark:text-white">
                Harga Diskon{" "}
                {data.price_discount !== undefined
                  ? data.price_discount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : "Harga tidak tersedia"}
              </p>
            </div>
          </div>
          <div className="space-x-1 rtl:space-x-reverse mb-3">
            <h2 className="text-lg font-semibold mb-3">Fasilitas:</h2>
            <ul>
              <li>
                {" "}
                <span className="bg-blue-100  text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                  {data.facilities}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Detail Alamat:</h2>
            <div className="ml-3">
              <p className="text-md mb-3">{data.address}</p>
              <a
                href={`https://www.google.com/maps/place/${encodeURIComponent(
                  data.city
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex"
              >
                <svg
                  className="w-6 h-6 text-red-500 flex"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="bg-blue-100  text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                  {data.city}, {data.province}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default DetailActivityPage;

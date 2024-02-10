import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import Footer2 from "@/component/Footer/Footer2";
const DetailPromoPage = () => {
  const { id } = useParams();
  const [promo, setPromo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setPromo(response.data.data);
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
              href="/Promo"
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
              Promo
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
                Detail Promo
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 mt-5">
        <div>
          <img src={promo.imageUrl} alt={promo.title} />
        </div>
        <div className="md:p-5 lg:p-5 pt-5">
          <h1 className="text-2xl font-sans font-bold mb-3">{promo.title}</h1>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Deskripsi : </h2>
            <p className="text-sm ml-3">{promo.description}</p>
          </div>

          <div className="flex items-center justify-between mt-2.5 mb-5">
            <div>
              <p className="flex-row text-md font-bold text-gray-900 dark:text-white">
                {promo.promo_discount_price !== undefined
                  ? promo.promo_discount_price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : "Harga tidak tersedia"}
              </p>
              <p className="text-xs text-gray-900 dark:text-white">
                Min. klaim{" "}
                {promo.minimum_claim_price !== undefined
                  ? promo.minimum_claim_price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : "Harga tidak tersedia"}
              </p>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <span className="bg-blue-100  text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                Kode: {promo.promo_code}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Ketentuan :</h2>
            <p className="text-sm ml-3">{promo.terms_condition}</p>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default DetailPromoPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import Footer from "@/component/Footer";
import NavBar from "@/component/NavBar";
import { useAuth } from "../../hooks/useAuth";

const Promo = () => {
  const user = useAuth();
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
    const fetchPromo = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
          {
            headers: {
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setPromo(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPromo([]);
      }
    };
    fetchPromo();
  }, []);

  const deletePromo = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Banner yang di hapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Tidak, Batalkan",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .delete(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/" +
              id,
            config
          )
          .then((res) => {
            console.log("res", res.data);
            Swal.fire("Berhasil", "Promo Berhasil di Hapus.", "success");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err.response);
            Swal.fire("Gagal", "Gagal Menghapus Promo", "error");
          });
      }
    });
  };
  return (
    <div className="container mx-auto md:p-0 lg:p-0 p-5">
      <NavBar />
      <nav
        className="flex py-5 mt-20 bg-white border-b border-gray-200"
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
                Promo
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="text-left mt-5 mb-5 flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 font-sans">
          Nikmati Promo Menarik
        </h1>
        <div>
          <Link
            href="/Promo/create"
            type="button"
            className="flex border border-green-400 text-gray-800 focus:outline-none hover:bg-green-200 hover:border-0 hover:text-gray-900  font-medium rounded-lg text-sm px-2 py-1 "
          >
            <svg
              className="w-6 h-6 text-green-800 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">Tambah</span>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3 sm:grid-cols-1 lg:grid-cols-4 mb-20">
        {promo.map((item) => (
          <div key={item.id}>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden h-full transform hover:shadow-2xl">
              <a href="#">
                <img
                  className="p-2 rounded-t-lg"
                  src={item.imageUrl}
                  alt={item.name}
                />
              </a>
              <div className="px-3 pb-3">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>

                <div className="flex items-center justify-between mt-2.5 mb-5">
                  <div>
                    <p className="flex-row text-md font-bold text-gray-900 dark:text-white">
                      {item.promo_discount_price !== undefined
                        ? item.promo_discount_price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        : "Harga tidak tersedia"}
                    </p>
                    <p className="text-xs text-gray-900 dark:text-white">
                      Min. klaim{" "}
                      {item.minimum_claim_price !== undefined
                        ? item.minimum_claim_price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        : "Harga tidak tersedia"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <span className="bg-blue-100  text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                      Kode: {item.promo_code}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <Link
                    href={`/Promo/${item.id}`}
                    type="button"
                    className="flex mt-4 border border-gray-400 text-gray-800 focus:outline-none hover:bg-gray-200 hover:border-0 hover:text-gray-900  font-medium rounded-lg text-sm px-1 py-1 "
                  >
                    <svg
                      className="w-5 h-5 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth={2}
                        d="M9 8h10M9 12h10M9 16h10M5 8h0m0 4h0m0 4h0"
                      />
                    </svg>
                    <span className="ml-1">Detail</span>
                  </Link>
                  <Link
                    href={`/Promo/${item.id}/edit`}
                    type="button"
                    className="flex mt-4 border border-blue-400 text-gray-800  focus:outline-none hover:bg-blue-200 hover:border-0 hover:text-gray-900  font-medium rounded-lg text-sm px-1 py-1 "
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
                    <span className="ml-1">Edit</span>
                  </Link>
                  <button
                    onClick={() => deletePromo(item.id)}
                    className="flex mt-4 hover:border-0 border border-red-400 text-gray-800 focus:outline-none hover:bg-red-200 hover:text-gray-900  font-medium rounded-lg text-sm px-1 py-1 "
                  >
                    {" "}
                    <svg
                      className="w-5 h-5 text-red-600 "
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
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                    <span className="ml-1">Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Promo;

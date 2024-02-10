import styles from "./styles.module.css";
import axios from "axios";
import Hero from "@/component/Hero";
import NavBar from "@/component/NavBar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/component/Footer";
import { useRouter } from "next/router";

// export async function getStaticSideProps() {
//   const res = await axios.get(
//     "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/" + id,
//     {
//       headers: {
//         apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     }
//   );
// }

export default function Home() {
  const [banner, setBanner] = useState([]);
  const [promo, setPromo] = useState([]);
  const [category, setCategory] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
          {
            headers: {
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setBanner(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setBanner([]);
      }
    };

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

    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            headers: {
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setCategory(response.data.data);
        // Set activities untuk menampilkan data dari tab "Semua"
        handleTabClick("all");
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategory([]);
      }
    };

    fetchCategory();
    fetchPromo();
    fetchBanner();
  }, []);

  const router = useRouter();
  // const fetchCategorybyId = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/" +
  //         id,
  //       {
  //         headers: {
  //           apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
  //         },
  //       }
  //     );
  //     setActiveCategory(id);
  //     setActivities(response.data.data);
  //     router.push("/activity/" + id);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const handleDetailClick = () => {
  //   // Panggil fungsi fetchCategorybyId dengan ID yang sesuai
  //   fetchCategorybyId(id);
  // };

  // const handleTabClick = (categoryId) => {
  //   axios
  //     .get(
  //       `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${categoryId}`,
  //       {
  //         headers: {
  //           apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data); // Tambahkan log ini untuk melihat data yang diterima
  //       setActivities(response.data.data);
  //       setActiveCategory(categoryId);
  //     })
  //     .catch((error) => console.error("Terjadi kesalahan:", error));
  // };

  const handleTabClick = (categoryId) => {
    // Jika ID kategori adalah "all", Anda dapat memprosesnya di server sebagai permintaan untuk semua data
    const apiEndpoint =
      categoryId === "all"
        ? "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities"
        : `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${categoryId}`;

    axios
      .get(apiEndpoint, {
        headers: {
          apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((response) => {
        setActivities(response.data.data);
        setActiveCategory(categoryId);
      })
      .catch((error) => console.error("Terjadi kesalahan:", error));
  };

  return (
    <div>
      <NavBar />
      <Hero />
      {/* className="relative -top-12 z-10 overflow-hidden rounded rounded-t-3xl bg-white" */}
      <div className="container mx-auto md:p-0 lg:p-0 p-5">
        {/* banner */}
        <div>
          <div className="text-left flex justify-between mt-10 mb-8">
            <h1 className="md:text-xl text-xl font-bold lg:text-gray-900 sm:text-gray-800 font-sans">
              Jelajahi Tempat Impianmu
            </h1>
            <div className="flex">
              <Link
                href="/Banner"
                type="button"
                className="flex text-gray-800 focus:outline-none hover:bg-blue-200 hover:border-0 hover:text-blue-900 font-medium rounded-lg text-sm px-2 py-2"
              >
                <span className="lg:ml-1 md:ml-1">Selengkapnya</span>
                <svg
                  className="w-6 h-6 text-gray-800"
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
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3 sm:grid-cols-1 lg:grid-cols-4">
            {banner.slice(0, 4).map((item) => (
              <div key={item.id} className={styles.card}>
                <div className="max-w-sm bg-white  rounded-lg shadow-md ">
                  <Link href="/Banner">
                    <div className="relative">
                      <div className="group w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
                        <h1 className="absolute top-32 inset-0 z-10 flex items-start justify-start pl-3 text-xl font-bold text-gray-100 opacity-100 bg-black bg-opacity-50 rounded-md">
                          {item.name}
                        </h1>
                        <img
                          className="rounded-lg w-full h-full object-cover transition-transform transform group-hover:scale-110"
                          src={item.imageUrl}
                          alt={item.name}
                        />
                        {/* <div className="absolute inset-0 bg-gray-800 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity"></div> */}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* features */}
        <div>
          <div className="grid lg:grid-cols-3 w-full md:grid-cols-1 sm:grid-cols-1 mt-10 border rounded-lg overflow-hidden shadow h-full transform hover:shadow-2xl">
            <div className="text-center m-5 pl-4 pr-4">
              <img src="/img/map.png" alt="map" />
              <h1 className="text-2xl font-bold text-gray-800 font-sans">
                Petualangan
              </h1>
              <p>Nikmati pengalaman seru dan tak terlupakan.</p>
            </div>
            <div className="text-center m-5 pl-4 pr-4">
              <img src="/img/guide.png" alt="guide" />
              <h1 className="text-2xl font-bold text-gray-800 font-sans">
                Panduan Perjalanan
              </h1>
              <p>Tips dan panduan untuk perjalanan Anda.</p>
            </div>
            <div className="text-center m-5 pl-4 pr-4">
              <img
                src="/img/travel.png"
                alt="travel"
                style={{ width: "170px" }}
              />
              <h1 className="text-2xl font-bold text-gray-800 font-sans">
                Paket Liburan
              </h1>
              <p>Temukan paket liburan yang sesuai dengan keinginan Anda.</p>
            </div>
          </div>
        </div>

        {/* promo */}
        <div>
          <div className="text-left mt-10 mb-8 flex justify-between ">
            <h1 className="md:text-xl text-xl font-bold text-gray-800 font-sans">
              Nikmati Promo Menarik
            </h1>
            <div>
              <Link
                href="/Promo"
                type="button"
                className="flex  text-gray-800 focus:outline-none hover:bg-blue-200 hover:border-0 hover:text-blue-900 font-medium rounded-lg text-sm px-2 py-2 "
              >
                <span className="lg:ml-1 md:ml-1">Selengkapnya</span>
                <svg
                  className="w-6 h-6 text-gray-800"
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
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            {/* <Link
              href="/Promo"
              className="inline-flex items-center text-sm font-medium text-center text-white "
            >
              <svg
                className="w-6 h-6 text-gray-800 hover:text-gray-600"
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
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </Link> */}
          </div>
          <div className="grid md:grid-cols-3 gap-3 sm:grid-cols-1 lg:grid-cols-4 ">
            {promo.slice(0, 4).map((item) => (
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
                            ? item.promo_discount_price.toLocaleString(
                                "id-ID",
                                {
                                  style: "currency",
                                  currency: "IDR",
                                }
                              )
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

                    <div className="flex items-center justify-between">
                      <Link
                        href={`/Promo/${item.id}`}
                        type="button"
                        className="flex  border border-gray-400 text-gray-800 focus:outline-none hover:bg-gray-200 hover:border-0 hover:text-gray-900  font-medium rounded-lg text-sm px-2 py-1 "
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aktivity */}
        <div>
          <div>
            <div className="text-left mt-10 flex justify-between">
              <h1 className="text-xl font-bold text-gray-800 font-sans">
                Tempat Wisata Menarik
              </h1>
              <div>
                <Link
                  href="/Activity"
                  type="button"
                  className="flex text-gray-800 focus:outline-none hover:bg-blue-200 hover:border-0 hover:text-blue-900 font-medium rounded-lg text-sm px-2 py-2 "
                >
                  <span className="lg:ml-1 md:ml-1">Selengkapnya</span>
                  <svg
                    className="w-6 h-6 text-gray-800"
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
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          {/* kategori tabs */}
          <div className="mb-4 flex justify-between">
            <ul
              className="flex flex-wrap  -mb-px text-sm font-medium text-center"
              id="default-tab"
              data-tabs-toggle="#default-tab-content"
              role="tablist"
            >
              <li className="me-2">
                {/* Tambahkan tombol untuk menampilkan semua activity */}
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeCategory === "all"
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => handleTabClick("all")}
                >
                  Semua
                </button>
              </li>
              {category.map((item) => (
                <li key={item.id} className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                      activeCategory === item.id
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    onClick={() => handleTabClick(item.id)}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li className="me-2">
                <Link
                  href={"/Category"}
                  className={`inline-block p-4 border-b-2 rounded-t-lg`}
                >
                  Selengkapnya{" "}
                </Link>
              </li>
            </ul>
          </div>
          {/*Aktifitas*/}
          <div
            id="default-tab-content"
            className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-3 mb-20"
          >
            {activities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="group">
                <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow h-full transform hover:shadow-2xl">
                  <a className="cursor-pointer">
                    <img
                      className="rounded-t-lg h-44 w-full"
                      src={activity.imageUrls}
                      alt={activity.name}
                    />
                  </a>

                  <div className="px-3 pb-5 mt-2">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900  uppercase">
                      {activity.title}
                    </h5>

                    <div className="mt-2.5 mb-4">
                      <a
                        href={`https://www.google.com/maps/place/${encodeURIComponent(
                          activity.city
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
                        <span className=" text-blue-800 text-sm font-semibold  dark:bg-blue-200 dark:text-blue-800">
                          {activity.city}, {activity.province}
                        </span>
                      </a>
                    </div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {[...Array(activity.rating)].map((_, index) => (
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
                      <span className="bg-blue-100  text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                        {activity.total_reviews} Review
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="line-through">
                        <span className="text-sm  font-semibold text-gray-500">
                          {activity.price !== undefined
                            ? activity.price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })
                            : "Harga tidak tersedia"}
                        </span>
                      </p>
                      <p>
                        <span className="text-md font-bold text-gray-900">
                          {activity.price_discount !== undefined
                            ? activity.price_discount.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })
                            : "Harga tidak tersedia"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/Activity/${activity.id}`}
                        type="button"
                        className="flex mt-4 border border-gray-400 text-gray-800 focus:outline-none hover:bg-gray-200 hover:border-0 hover:text-gray-900 font-medium rounded-lg text-sm px-2 py-1 w-24"
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

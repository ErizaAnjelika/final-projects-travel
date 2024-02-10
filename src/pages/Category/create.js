import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

const Create = () => {
  const [category, setCategory] = useState({
    name: "",
    imageUrl: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, imageUrl } = category;

    // Memeriksa apakah ada data yang kosong
    if (!name.trim() || !imageUrl.trim()) {
      Swal.fire("Error", "Harap isi semua kolom", "error");
      return; // Menghentikan eksekusi fungsi jika ada data yang kosong
    }

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-type": "application/json",
        apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
        category,
        config
      )
      .then((res) => {
        console.log("res", res.data);
        Swal.fire("Berhasil", "Kategori Berhasil dibuat", "success");
        router.push("/Category");
      })
      .catch((err) => {
        Swal.fire("Gagal", err.response.data.message, "error");
        console.log(err.response);
      });
  };

  return (
    <div className="md:container md:mx-auto sm:mx-auto">
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
                className="w-5 h-5 me-2.5"
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
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-4 h-4 text-gray-900 mx-1"
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
              <Link
                href="/Category"
                className="ms-1 text-md font-medium text-gray-900 hover:text-blue-600 md:ms-2 dark:text-gray-700 dark:hover:text-gray-500"
              >
                Kategori
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-4 h-4 text-gray-900 mx-1"
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
                Tambah Kategori
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="mt-5 mb-5">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Form Tambah Kategori
        </h5>
      </div>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nama Banner
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Eropa, Jawa Timur"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gambar URL
            </label>
            <input
              type="text"
              name="imageUrl"
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Http://image.com"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Kirim
            </button>
            <Link
              href="/Banner"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Batal
            </Link>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nama Kategori
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Gambar Kategori
            </label>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <Link
            href="/Category"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cancel
          </Link>
        </div>
      </form> */}
    </div>
  );
};

export default Create;

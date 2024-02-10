import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Footer2 from "@/component/Footer/Footer2";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  console.log("form", form);

  const handleSubmit = () => {
    const {
      title,
      description,
      imageUrl,
      terms_condition,
      promo_code,
      promo_discount_price,
      minimum_claim_price,
    } = form;

    // Memeriksa apakah ada data yang kosong
    if (
      !title.trim() ||
      !description.trim() ||
      !imageUrl.trim() ||
      !terms_condition.trim() ||
      !promo_code.trim() ||
      !promo_discount_price.trim() ||
      !minimum_claim_price.trim()
    ) {
      Swal.fire("Error", "Harap isi semua kolom", "error");
      return; // Menghentikan eksekusi fungsi jika ada data yang kosong
    }
    const token = localStorage.getItem("token");

    form.promo_discount_price = parseFloat(form.promo_discount_price);
    form.minimum_claim_price = parseFloat(form.minimum_claim_price);

    const config = {
      headers: {
        "Content-type": "application/json",
        apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
        form,
        config
      )
      .then((res) => {
        console.log("res", res.data);
        Swal.fire("Berhasil", "Promo Berhasil dibuat", "success");
        router.push("/Promo");
      })
      .catch((err) => {
        Swal.fire("Gagal", err.response.data.message, "error");
        console.log(err.response);
      });
  };
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
                href="/Promo"
                className="ms-1 text-md font-medium text-gray-900 hover:text-blue-600 md:ms-2 dark:text-gray-700 dark:hover:text-gray-500"
              >
                Promo
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
                Tambah Promo
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="mt-5 mb-5">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Form Tambah Promo
        </h5>
      </div>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Judul Promo
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Judul Promo"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Deskripsi Promo
            </label>
            <textarea
              type="text"
              name="description"
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Deskripsi Promo"
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
          <div className="grid md:grid-cols-2 md:gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ketentuan
              </label>
              <input
                type="text"
                name="terms_condition"
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ketentuan"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kode Promo
              </label>
              <input
                type="text"
                name="promo_code"
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kode Promo"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Potongan Harga
              </label>
              <input
                type="number"
                name="promo_discount_price"
                id="promo_discount_price"
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rp 100.000"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Minimum Klaim
              </label>
              <input
                type="number"
                name="minimum_claim_price"
                id="minimum_claim_price"
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rp 100.000"
                required
              />
            </div>
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
              href="/Promo"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Batal
            </Link>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default Create;

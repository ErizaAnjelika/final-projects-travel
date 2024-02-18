import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Footer2 from "@/component/Footer/Footer2";

const Create = () => {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
  });

  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is for file (image), set the form's imageUrl to the selected file
    if (name === "imageUrl" && files && files[0]) {
      setForm({
        ...form,
        [name]: files[0],
      });

      // Buat URL sementara untuk preview gambar
      const imageUrlObject = URL.createObjectURL(files[0]);
      setPreviewImageUrl(imageUrlObject);
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, imageUrl } = form;

    if (!name.trim() || !imageUrl) {
      Swal.fire("Error", "Harap isi semua kolom", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", imageUrl);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        config
      );

      const bannerData = {
        name: name,
        imageUrl: response.data.url,
      };

      const createResponse = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
        bannerData,
        config
      );

      Swal.fire("Berhasil", "Banner berhasil dibuat", "success");
      // You may redirect or handle the response as needed
      router.push("/Banner");
    } catch (error) {
      console.error("Error:", error.response.data.message);
      Swal.fire("Gagal", error.response.data.message, "error");
    }
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
                href="/Banner"
                className="ms-1 text-md font-medium text-gray-900 hover:text-blue-600 md:ms-2 dark:text-gray-700 dark:hover:text-gray-500"
              >
                Banner
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
                Tambah Banner
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="mt-5 mb-5">
        <h5 className="text-md md:text-xl lg:text-2xl font-medium text-gray-900 dark:text-white">
          Form Tambah Banner
        </h5>
      </div>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-10">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nama Banner
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nama Banner"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gambar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="imageUrl"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {previewImageUrl && (
              <img
                className="mt-2"
                src={previewImageUrl}
                alt="Preview"
                style={{ maxWidth: "300px" }}
              />
            )}
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
      <Footer2 />
    </div>
  );
};

export default Create;

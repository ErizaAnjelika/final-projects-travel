import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Footer2 from "@/component/Footer/Footer2";

const Edit = () => {
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        setUpdateData({
          ...updateData,
          name: response.data.data.name,
          imageUrl: response.data.data.imageUrl,
        });

        setPreviousImageUrl(response.data.data.imageUrl);
      } catch (err) {
        console.error(err.response);
      }
    };

    fetchData();
  }, [id]);

  const [updateData, setUpdateData] = useState({
    id: id,
    name: "",
    imageUrl: "",
  });

  const [previousImageUrl, setPreviousImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is for file (image), set the form's imageUrl to the selected file
    if (name === "imageUrl" && files && files[0]) {
      setUpdateData({
        ...updateData,
        [name]: files[0],
      });
    } else {
      setUpdateData({
        ...updateData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, imageUrl } = updateData;

    if (!name.trim()) {
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

      // Only upload image if a new image is selected
      if (imageUrl instanceof File) {
        const response = await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image`,
          formData,
          config
        );

        const bannerData = {
          name: name,
          imageUrl: response.data.url,
        };

        const updateResponse = await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`,
          bannerData,
          config
        );
      } else {
        // If no new image selected, proceed with updating other data
        const bannerData = {
          name: name,
          imageUrl: previousImageUrl,
        };

        const updateResponse = await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`,
          bannerData,
          config
        );
      }

      Swal.fire("Berhasil", "Banner berhasil diperbarui", "success");
      // You may redirect or handle the response as needed
      router.push("/Banner");
    } catch (error) {
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
                Edit Banner
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="mt-5 mb-5">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Form Edit Banner
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
              value={updateData.name}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nama Banner"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gambar
            </label>
            <div>
              {previousImageUrl && ( // Jika ada URL gambar sebelumnya, tampilkan gambar tersebut
                <img
                  src={previousImageUrl}
                  alt="Previous Image"
                  className="w-24 h-24 mb-2"
                />
              )}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Pilih Gambar Baru (Opsional)
              </label>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="imageUrl"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <Footer2 />
    </div>
  );
};

export default Edit;

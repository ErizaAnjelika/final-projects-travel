import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import Footer2 from "@/component/Footer/Footer2";

const Edit = () => {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        setCategories(response.data.data);

        // Fetch activity details after fetching categories
        const activityResponse = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        setUpdate({
          ...update,
          categoryId: activityResponse.data.data.categoryId,
          title: activityResponse.data.data.title,
          description: activityResponse.data.data.description,
          imageUrls: activityResponse.data.data.imageUrls,
          price: activityResponse.data.data.price,
          price_discount: activityResponse.data.data.price_discount,
          rating: activityResponse.data.data.rating,
          total_reviews: activityResponse.data.data.total_reviews,
          facilities: activityResponse.data.data.facilities,
          address: activityResponse.data.data.address,
          province: activityResponse.data.data.province,
          city: activityResponse.data.data.city,
          location_maps: activityResponse.data.data.location_maps,
        });

        setPreviousImageUrl(activityResponse.data.data.imageUrls);
        console.log(activityResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState({
    id: id,
    categoryId: "",
    title: "",
    description: "",
    imageUrls: [],
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
  });
  const [previousImageUrl, setPreviousImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Menangani input yang harus numerik atau array
    if (name === "imageUrls" && files) {
      // Jika input adalah array, pisahkan nilai dengan koma dan hapus spasi
      // const arrayValue = value.split(",").map((item) => item.trim());
      // Update state
      setUpdate({
        ...update,
        [name]: [...update.imageUrls, ...files],
      });

      // setUpdate({
      //   ...update,
      //   [name]: files, // Memperbarui dengan file yang dipilih
      // });
    } else if (
      name === "price" ||
      name === "price_discount" ||
      name === "rating" ||
      name === "total_reviews"
    ) {
      // Memastikan bahwa nilai yang dimasukkan adalah numerik
      const numericValue = value === "" ? "" : parseFloat(value);

      setUpdate({
        ...update,
        [name]: numericValue,
      });
    } else {
      // Untuk input lainnya, langsung update state
      setUpdate({
        ...update,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      categoryId,
      title,
      description,
      imageUrls,
      price,
      price_discount,
      rating,
      total_reviews,
      facilities,
      address,
      province,
      city,
      location_maps,
    } = update;

    try {
      const formData = new FormData();
      formData.append("image", imageUrls);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      };

      if (imageUrls instanceof File) {
        const response = await axios.post(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
          formData,
          config
        );

        const data = {
          categoryId: categoryId,
          title: title,
          description: description,
          imageUrls: [response.data.url],
          price: price,
          price_discount: price_discount,
          rating: rating,
          total_reviews: total_reviews,
          facilities: facilities,
          address: address,
          province: province,
          city: city,
          location_maps: location_maps,
        };

        const updateResponse = await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`,
          data,
          config
        );
      } else {
        const data = {
          categoryId: categoryId,
          title: title,
          description: description,
          imageUrls: previousImageUrl,
          price: price,
          price_discount: price_discount,
          rating: rating,
          total_reviews: total_reviews,
          facilities: facilities,
          address: address,
          province: province,
          city: city,
          location_maps: location_maps,
        };
        const updateData = await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`,
          data,
          config
        );
      }

      Swal.fire("Success", "Aktivitas Berhasil diupdate", "success");
      router.push("/Activity");
    } catch (error) {
      console.error("Error:", error);
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
          <li>
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
              <Link
                href="/Activity"
                className="ms-1 text-sm font-medium text-gray-900 hover:text-blue-600 md:ms-2 dark:text-gray-700 dark:hover:text-gray-500"
              >
                Aktivitas
              </Link>
            </div>
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
                Edit Aktivitas
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="mt-5 mb-5">
        <h5 className="text-md md:text-xl lg:text-2xl font-medium text-gray-900 dark:text-white">
          Form Edit Aktivitas
        </h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="max-w-md">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Pilih Kategori
            </label>
            <select
              name="categoryId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={update.categoryId}
              onChange={handleChange}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Judul
            </label>
            <input
              type="text"
              name="title"
              value={update.title}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Judul..."
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Deskripsi
            </label>
            <textarea
              name="description"
              value={update.description}
              onChange={handleChange}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Deskripsi..."
              defaultValue={""}
            />
          </div>
          <div className="mb-5">
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
              name="imageUrls"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* <input
              type="text"
              value={update.imageUrls.join(",")}
              name="imageUrls"
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://example.com/img.png"
            /> */}
          </div>
        </div>
        <div className="max-w-md">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Harga
              </label>
              <input
                type="number"
                name="price"
                value={update.price}
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rp. 100.000"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Harga Diskon
              </label>
              <input
                type="number"
                name="price_discount"
                value={update.price_discount}
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rp 50.000"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={update.rating}
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="3.5"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Total Review
              </label>
              <input
                type="number"
                name="total_reviews"
                value={update.total_reviews}
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="3.5"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Provinsi
              </label>
              <input
                type="text"
                name="province"
                value={update.province}
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Jawa Barat"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kota
              </label>
              <input
                type="text"
                name="city"
                value={update.city}
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Bandung"
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Fasilitas
            </label>
            <input
              type="text"
              name="facilities"
              value={update.facilities}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Wifi, AC, TV"
            />
          </div>{" "}
        </div>
        <div className="max-w-md">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Alamat
            </label>
            <textarea
              type="text"
              name="address"
              value={update.address}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Jl. Setiabudi"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Lokasi Peta
            </label>
            <textarea
              type="text"
              name="location_maps"
              value={update.location_maps}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Google Maps"
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
              href="/Activity"
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

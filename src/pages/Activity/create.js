import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Footer2 from "@/component/Footer/Footer2";

const Create = () => {
  const [form, setForm] = useState({
    categoryId: "", // Menghapus nilai default
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            headers: {
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  const [previewImageUrl, setPreviewImageUrl] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageUrls" && files) {
      setForm({
        ...form,
        [name]: [...form.imageUrls, ...files],
      });
      const imageUrlObject = URL.createObjectURL(files[0]);
      setPreviewImageUrl(imageUrlObject);
    } else if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.name === value);
      setForm({
        ...form,
        categoryId: selectedCategory ? selectedCategory.id : "",
        category: value,
      });
    } else {
      setForm({
        ...form,
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
    } = form;

    // Validasi bahwa imageUrls tidak boleh kosong
    if (imageUrls.length === 0) {
      Swal.fire("Error", "Harap pilih gambar terlebih dahulu", "error");
      return;
    }

    // Validasi bahwa price harus berupa angka
    if (isNaN(price)) {
      Swal.fire("Error", "Harga harus berupa angka", "error");
      return;
    }

    // Lanjutkan dengan pengiriman data jika tidak ada kesalahan
    try {
      const formData = new FormData();
      formData.append("image", imageUrls[0]);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        config
      );

      const categoryData = {
        categoryId: categoryId,
        title: title,
        description: description,
        imageUrls: [response.data.url], // Pastikan imageUrls berupa array
        price: parseFloat(price),
        price_discount: parseFloat(price_discount),
        rating: parseFloat(rating),
        total_reviews: parseInt(total_reviews),
        facilities: facilities,
        address: address,
        province: province,
        city: city,
        location_maps: location_maps,
      };

      const createResponse = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
        categoryData,
        config
      );

      Swal.fire("Success", "Aktifitas berhasil dibuat", "success");
      router.push("/Activity");
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
                Tambah Aktivitas
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="mt-5 mb-5">
        <h5 className="text-md md:text-xl lg:text-2xl font-medium text-gray-900 dark:text-white">
          Form Tambah Aktivitas
        </h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Pilih Kategori
            </label>
            <select
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
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
              value={form.title}
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
              value={form.description}
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
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="imageUrls"
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
            {/* <input
              type="text"
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
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Harga
              </label>
              <input
                type="number"
                name="price"
                // value={form.price}
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
                // value={form.price_discount}
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
                // value={form.rating}
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
                // value={form.total_reviews}
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
                value={form.province}
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
                value={form.city}
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
              Aktifitas
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
              value={form.address}
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
              value={form.location_maps}
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
          {/* <button
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button> */}
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default Create;

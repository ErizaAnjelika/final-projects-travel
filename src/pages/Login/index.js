import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "@/reducer/loginSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Login = () => {
  // untuk membuka icon mata
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const status = useSelector((state) => state.login.status);
  const error = useSelector((state) => state.login.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const handleInputChange = () => {
    // Reset formErrors saat input berubah
    setFormErrors({});
  };

  const handelLogin = () => {
    // Validasi input
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "email tidak valid";
    }
    if (!password) {
      errors.password = "kata sandi harus diisi";
    } else if (password.length < 8) {
      errors.password = "kata sandi harus lebih dari 8 karakter";
    }

    // Jika ada error, setFormErrors dan hentikan login
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    dispatch(fetchLogin({ email, password }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (status === "succeeded") {
      Swal.fire({
        title: "Berhasil",
        text: "Login Berhasil",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/");
      });
    } else if (status === "failed") {
      Swal.fire({
        title: "Gagal",
        text: `Login Gagal! ${error}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [status, error]);

  return (
    <div className="md:p-0 lg:p-0 p-5">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full md:max-w-lg md:max-h-lg max-w-sm p-4 bg-white border border-gray-200 rounded-lg  sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 shadow-xl">
          <div className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Masuk Ke Halaman
            </h5>
            <div>
              <label
                for="email-address-icon"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputChange();
                  }}
                  id="email-address-icon"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ps-10 p-2.5 ${
                    formErrors.email ? "border-red-500" : ""
                  }`}
                  placeholder="email@gmail"
                  required
                />
              </div>
              {formErrors.email && (
                <p className="text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label
                for="email-address-icon"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kata Sandi
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-2">
                  <span
                    className="cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <svg
                        class="w-5 h-5 text-gray-500 dark:text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        class="w-5 h-5 text-gray-500 dark:text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 14"
                      >
                        <g
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                        </g>
                      </svg>
                    )}
                  </span>
                </div>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInputChange();
                  }}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ps-10 ${
                    formErrors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Kata Sandi"
                  required
                />
              </div>
              {formErrors.password && (
                <p className="text-red-500">{formErrors.password}</p>
              )}
            </div>

            <div>
              <button
                onClick={handelLogin}
                type="submit"
                disabled={status === "loading"}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {status === "loading" ? "Memuat....." : "Masuk"}
              </button>
              <div className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-300">
                Belum Punya Akun?{" "}
                <Link
                  href="/Register"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

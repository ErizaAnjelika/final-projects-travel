import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchRegister } from "@/reducer/registerslice";
import Swal from "sweetalert2";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.register.status);
  const error = useSelector((state) => state.register.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const handleInputChange = () => {
    // Reset formErrors saat input berubah
    setFormErrors({});
  };

  const handelRegister = () => {
    // Validasi input
    const errors = {};
    if (!name) {
      errors.name = "Nama harus di isi";
    }
    if (!email) {
      errors.email = "Email harus di isi";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Alamat email tidak valid";
    }

    if (!password) {
      errors.password = "Kata sandi harus di isi";
    } else if (password.length < 8) {
      errors.password = "Kata sandi harus lebih dari 8 karakter";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[.@#$%^&*!])[A-Za-z\d.@#$%^&*!]/.test(password)
    ) {
      errors.password =
        "Kata sandi harus berisi huruf kapital, angka, dan simbol";
    }

    if (!passwordRepeat) {
      errors.passwordRepeat = "Tolong input ulang kata sandi";
    } else if (passwordRepeat !== password) {
      errors.passwordRepeat = "Kata sandi tidak sama";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Nomor telepon harus diisi";
    } else if (!/^[0]\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Nomor telepon harus berupa angka dimulai dengan 0";
    }

    if (!profilePictureUrl) {
      errors.profilePictureUrl = "Profile picture harus diisi";
    }

    // Jika ada error, setFormErrors dan hentikan login
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    dispatch(
      fetchRegister({
        name,
        email,
        password,
        passwordRepeat,
        role,
        profilePictureUrl,
        phoneNumber,
      })
    );
  };

  useEffect(() => {
    if (status === "succeeded") {
      Swal.fire({
        title: "Berhasil",
        text: "Daftar Berhasil",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/Login");
      });
    } else if (status === "failed") {
      Swal.fire({
        title: "Gagal",
        text: `Daftar Gagal! ${error}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [status, error]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordConfirm = () => {
    setPasswordConfirm(!passwordConfirm);
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="md:p-0 lg:p-0 p-5 my-8">
      <div className="flex justify-center items-center h-2/6">
        <div className="w-full md:max-w-xl md:max-h-xl max-w-sm p-4 bg-white border border-gray-200 rounded-lg  sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 shadow-xl">
          <div className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Daftar Dulu sekarang
            </h5>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="email-address-icon"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-800 dark:text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 14 18"
                    >
                      <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      handleInputChange();
                    }}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ps-10 p-2.5 ${
                      formErrors.name ? "border-red-500" : ""
                    }`}
                    placeholder="Nama anda"
                    required
                  />
                </div>
                {formErrors.name && (
                  <p className="text-red-500">{formErrors.name}</p>
                )}
              </div>
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
                      className="w-5 h-5 text-gray-800 dark:text-gray-800"
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
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleInputChange();
                    }}
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
                        class="w-5 h-5 text-gray-800 dark:text-gray-800"
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
                        class="w-5 h-5 text-gray-800 dark:text-gray-800"
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
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ps-10 p-2.5 ${
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
              <label
                for="email-address-icon"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Konfirmasi Kata Sandi
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-2">
                  <span
                    className="cursor-pointer"
                    onClick={togglePasswordConfirm}
                  >
                    {passwordConfirm ? (
                      <svg
                        class="w-5 h-5 text-gray-800 dark:text-gray-800"
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
                        class="w-5 h-5 text-gray-800 dark:text-gray-800"
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
                  type={passwordConfirm ? "text" : "password"}
                  value={passwordRepeat}
                  onChange={(e) => {
                    setPasswordRepeat(e.target.value);
                    handleInputChange();
                  }}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ps-10 p-2.5 ${
                    formErrors.passwordRepeat ? "border-red-500" : ""
                  }`}
                  placeholder="Konfirmasi Kata Sandi"
                  required
                />
              </div>
              {formErrors.passwordRepeat && (
                <p className="text-red-500">{formErrors.passwordRepeat}</p>
              )}
            </div>

            <div>
              <label
                for="email-address-icon"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nomor Telepon
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-2">
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 19 18"
                  >
                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    handleInputChange();
                  }}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ps-10 p-2.5 ${
                    formErrors.phonsetPhoneNumber ? "border-red-500" : ""
                  }`}
                  placeholder="Nomor Telepon"
                  required
                />
              </div>
              {formErrors.phoneNumber && (
                <p className="text-red-500">{formErrors.phoneNumber}</p>
              )}
            </div>

            {/* photo url */}
            <div>
              <label
                for="email-address-icon"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Foto url
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-2">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.4 9.6a1 1 0 0 0-1.8 0l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .9-1.4l-2-4a1 1 0 0 0-1.7-.2l-.5.7-1.3-2.5ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={profilePictureUrl}
                  onChange={(e) => setProfilePictureUrl(e.target.value)}
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ps-10 p-2.5"
                  placeholder="www.avatar.com"
                  required
                />
              </div>
              {formErrors.profilePictureUrl && (
                <p className="text-red-500">{formErrors.profilePictureUrl}</p>
              )}
            </div>

            <div>
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pilih Role
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white p-2.5"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <button
                onClick={handelRegister}
                type="submit"
                disabled={status === "loading"}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {status === "loading" ? "Memuat....." : "Daftar"}
              </button>
              <div className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-300">
                Sudah Punya akun?{" "}
                <Link
                  href="/Login"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Masuk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

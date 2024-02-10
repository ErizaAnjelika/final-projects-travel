import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "@/reducer/loginSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
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
        title: "Success",
        text: "Login Success",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/");
      });
    } else if (status === "failed") {
      Swal.fire({
        title: "Error",
        text: `Login failed! ${error}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [status, error]);

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
    <div className={styles.login}>
      <div className={styles.loginwrapper}>
        <div className="grid grid-cols-2">
          <div className={styles.loginright}>
            <Slider {...settings}>
              <div className={styles.slide}>
                <img src="/img/airport.jpg" alt="Human" />
                <div className={styles.overlayBackground}></div>
                <div className={styles.textOverlay}>
                  <h2>Explore the Horizon</h2>
                </div>
              </div>
              <div className={styles.slide}>
                <img src="/img/plane.jpg" alt="Human" />
                <div className={styles.overlayBackground}></div>
                <div className={styles.textOverlay}>
                  <h2>Elevate Your Journey</h2>
                </div>
              </div>
              <div className={styles.slide}>
                <img src="/img/planing.jpg" alt="Plane" />
                <div className={styles.overlayBackground}></div>
                <div className={styles.textOverlay}>
                  <h2>Plan for Success</h2>
                </div>
              </div>
            </Slider>
          </div>
          <div className={styles.loginleft}>
            <div className={styles.title}>
              <h1>Sing In</h1>
            </div>

            <div className={styles.form}>
              <form>
                <div className={styles.input}>
                  <label for="email-address-icon" className="block">
                    Your Email
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
                      className={`block w-full ps-10 p-2.5 ${
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

                <div className={styles.input}>
                  <label for="email-address-icon" className="block">
                    Password
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-2">
                      <span
                        className={styles.passwordIcon}
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
                      className={`block w-full ps-10 p-2.5 ${
                        formErrors.password ? "border-red-500" : ""
                      }`}
                      placeholder="Your Password"
                      required
                    />
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500">{formErrors.password}</p>
                  )}
                </div>

                <div className={styles.or}>
                  <p>or</p>
                </div>
                <div className={styles.loginwith}>
                  <div className={styles.line}>
                    <img src="/google.png" alt="google" />
                    <button> Continue with Google</button>
                  </div>
                  <div className={styles.line}>
                    <img src="/facebook.png" alt="google" />
                    <button>Continue with Facebook</button>
                  </div>
                </div>

                <div className={styles.input}>
                  <button
                    onClick={handelLogin}
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Logging in..." : "Sign in"}
                  </button>
                </div>
              </form>

              <div className={styles.input}>
                <Link href="/Register">Don't have an account ? Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

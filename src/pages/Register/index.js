import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchRegister } from "@/reducer/registerslice";
import Swal from "sweetalert2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[.@#$%^&*!])[A-Za-z\d.@#$%^&*!]/.test(password)
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one digit, and one special character";
    }

    if (!passwordRepeat) {
      errors.passwordRepeat = "Please confirm your password";
    } else if (passwordRepeat !== password) {
      errors.passwordRepeat = "Passwords do not match";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^[0]\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number starting with 0";
    }

    if (!profilePictureUrl) {
      errors.profilePictureUrl = "Profile picture is required";
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
        title: "Success",
        text: "Register Success",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/Login");
      });
    } else if (status === "failed") {
      Swal.fire({
        title: "Error",
        text: `Register failed! ${error}`,
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
    <div>
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
                <h2>Sing Up</h2>
              </div>

              <div className={styles.form}>
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={styles.input}>
                      <label for="email-address-icon" className="block">
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
                          className={`block w-full ps-10 p-2.5 ${
                            formErrors.name ? "border-red-500" : ""
                          }`}
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      {formErrors.name && (
                        <p className="text-red-500">{formErrors.name}</p>
                      )}
                    </div>

                    <div className={styles.input}>
                      <label for="email-address-icon" className="block">
                        Your Email
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

                  <div className={styles.input}>
                    <label for="email-address-icon" className="block">
                      Confirm Password
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-2">
                        <span
                          className={styles.passwordIcon}
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
                        className={`block w-full ps-10 p-2.5 ${
                          formErrors.passwordRepeat ? "border-red-500" : ""
                        }`}
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                    {formErrors.passwordRepeat && (
                      <p className="text-red-500">
                        {formErrors.passwordRepeat}
                      </p>
                    )}
                  </div>

                  <div className={styles.input}>
                    <label for="email-address-icon" className="block">
                      Phone Number
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
                        className={`block w-full ps-10 p-2.5 ${
                          formErrors.phonsetPhoneNumber ? "border-red-500" : ""
                        }`}
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                    {formErrors.phoneNumber && (
                      <p className="text-red-500">{formErrors.phoneNumber}</p>
                    )}
                  </div>

                  {/* photo url */}
                  <div className={styles.input}>
                    <label for="email-address-icon" className="block">
                      Photo url
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
                        className="block w-full ps-10 p-2.5"
                        placeholder="Photo Url or Avatar Url"
                        required
                      />
                    </div>
                    {formErrors.profilePictureUrl && (
                      <p className="text-red-500">{formErrors.profilePictureUrl}</p>
                    )}
                  </div>

                  <div className={styles.input}>
                    <label for="countries" className="block">
                      Select Role
                    </label>
                    <select
                      id="countries"
                      className=" block w-full p-2.5"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option>User</option>
                      <option>Admin</option>
                    </select>
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
                    <button type="submit" onClick={handelRegister}>
                      Sign Up
                    </button>
                  </div>
                </div>
                <div className={styles.input}>
                  <Link href="/Login">Already have an account ? Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

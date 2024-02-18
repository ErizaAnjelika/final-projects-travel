import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Navbar, Dropdown } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { logoutUser } from "@/reducer/loginSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    Swal.fire({
      title: "Konfirmasi Keluar?",
      text: "Apakah anda Yakin Untuk Keluar?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Tidak, Batalkan",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch action
        dispatch(logoutUser());
        router.push("/Login");
      }
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Navbar
        className="bg-white fixed w-full z-20 top-0 start-0 border-b flex flex-wrap items-center justify-between"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff)",
        }}
      >
        <Navbar.Brand href="https://flowbite.com/">
          <div className="flex items-center rtl:space-x-reverse">
            <img
              src="/img/logo2.png"
              className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 "
              alt="Flowbite Logo"
            />
            <span
              className="self-center text-xl md:text-2xl lg:text-3xl font-semibold whitespace-nowrap text-gray-800 font-serif text-shadow-md"
              style={{ textShadow: "0px 2px 1px #facb5fff" }}
            >
              TravelGo
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href={"/"}>
            <div
              className="block py-0.5 px-0.5 md:py-2 md:px-1 lg:py-2 lg:px-3 text-gray-900 rounded hover:border-b-2 border-gray-900 font-bold "
              aria-current="page"
            >
              Beranda
            </div>
          </Navbar.Link>
          <Navbar.Link href={"/Activity"}>
            <div
              className="block py-0.5 px-0.5 md:py-2 md:px-1 lg:py-2 lg:px-3  text-gray-900 rounded hover:border-b-2 border-gray-900 font-bold"
              aria-current="page"
            >
              Aktivitas
            </div>
          </Navbar.Link>
          <Navbar.Link href={"/Promo"}>
            <div
              className="block py-0.5 px-0.5 md:py-2 md:px-1 lg:py-2 lg:px-3  text-gray-900 rounded hover:border-b-2 border-gray-900 font-bold"
              aria-current="page"
            >
              Promo
            </div>
          </Navbar.Link>
          {user ? (
            <Navbar.Link>
              <Dropdown
                label={user.name}
                style={{
                  background: "transparent",
                  border: "1px solid gray",
                  color: "#23aeff",
                }}
              >
                <div className="text-center">
                  <img
                    className="w-10 h-10 p-1 mt-2 mb-2 m-auto rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={user.profilePictureUrl}
                    alt="Bordered avatar"
                  />
                  <h1 className="text-sm">{user.name}</h1>
                  <p>{user.role}</p>
                </div>
                <div className="flex justify-evenly mt-5">
                  <Dropdown.Item>
                    <Link href="/Setting">Pengaturan</Link>{" "}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button onClick={handleLogout}>Keluar</button>
                  </Dropdown.Item>
                </div>
              </Dropdown>
            </Navbar.Link>
          ) : (
            <>
              <Navbar.Link href="/Login">
                <div
                  className="block py-0.5 px-0.5 md:py-1 md:px-2 lg:py-2 lg:px-3  text-gray-700 rounded border border-gray-300 md:bg-gray-300 hover:bg-gray-900 hover:text-white"
                  aria-current="page"
                >
                  Login
                </div>
              </Navbar.Link>
              {/* <Navbar.Link href="/Register">
                <div
                  className="block py-0.5 px-0.5 md:py-1 md:px-2 lg:py-2 lg:px-3  text-gray-700 rounded border border-gray-300 md:bg-gray-300 hover:bg-gray-900 hover:text-white"
                  aria-current="page"
                >
                  Register
                </div>
              </Navbar.Link> */}
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;

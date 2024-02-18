import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      // Jika belum login, arahkan pengguna ke halaman login
      router.push("/Login");
    } else {
      // Lakukan permintaan ke server untuk mendapatkan data pengguna setelah login
      axios
        .get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
          {
            headers: {
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ) // Anda perlu menyesuaikan endpoint ini dengan endpoint yang benar di aplikasi Anda
        .then((response) => {
          const userData = response.data.data; // Ambil data pengguna dari respon server
        const userRole = userData.role; // Ambil peran pengguna dari data pengguna
        setUser({ ...userData, role: userRole }); // Tetapkan pengguna ke state, termasuk peran
        console.log("User:", userRole);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser({ role: "user" }); // Atau set peran pengguna ke default jika terjadi kesalahan
        });
    }
  }, [router]);

  const handleUnauthorizedAccess = () => {
    Swal.fire({
      icon: "error",
      title: "Akses Ditolak",
      text: "Anda tidak memiliki izin untuk mengakses halaman ini.",
    });
  };
  const canAccessPage = (allowedRoles) => {
    allowedRoles = allowedRoles || ["admin"];
    if (!user || !user.role) {
      handleUnauthorizedAccess();
      return false;
    }

    if (!allowedRoles.includes(user.role)) {
      handleUnauthorizedAccess();
      return false;
    }

    return true;
  };

  return { user, canAccessPage };
};

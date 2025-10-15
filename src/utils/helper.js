import { toast } from "react-toastify";

export const safeDate = (dateStr) => {
  return dateStr ? new Date(dateStr) : new Date("2025-12-31T00:00:00");
};

export const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatDate = (dateString, options) => {
  const fallbackDate = new Date("2026-12-31");

  // kalau kosong/null, langsung pakai fallback
  if (!dateString) return fallbackDate.toLocaleDateString("id-ID", options);

  const date = new Date(dateString);

  // kalau invalid, juga pakai fallback
  if (isNaN(date)) return fallbackDate.toLocaleDateString("id-ID", options);

  return date.toLocaleDateString("id-ID", options);
};

export const handleCopy = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Nomor berhasil disalin", {
        autoClose: 1500, // 2 detik
        position: "top-center",
      });
    })
    .catch((err) => {
      console.error("Gagal menyalin: ", err);
    });
};

// Helper untuk format tanggal ke gaya Indonesia (contoh: 12 Jan 2025)
export const formatDate2 = (dateString, type = "short") => {
  if (!dateString) return "01 Jan 2025";

  const options = type === "long" ? { day: "2-digit", month: "long", year: "numeric" } : { day: "2-digit", month: "short", year: "numeric" };

  return new Date(dateString).toLocaleDateString("id-ID", options);
};

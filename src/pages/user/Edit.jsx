import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { alertError, alertSuccess } from "../../lib/alert";

const EditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nickname_mp: "",
    nickname_mw: "",
    fullname_mp: "",
    fullname_mw: "",
    fullname_bmp: "",
    fullname_imp: "",
    fullname_bmw: "",
    fullname_imw: "",
    date_akad: "",
    date_resepsi: "",
    venue_akad: "",
    address_venue_akad: "",
    lgm_venue_akad: "",
    venue_resepsi: "",
    address_venue_resepsi: "",
    lgm_venue_resepsi: "",
    date_bertemu: "",
    story_bertemu: "",
    date_komitmen: "",
    story_komitmen: "",
    date_lamaran: "",
    story_lamaran: "",
    date_wedding: "",
    story_wedding: "",
    name_tujuan: "",
    alamat_tujuan: "",
    rek1: "",
    no_rek1: "",
    name_rek1: "",
    rek2: "",
    no_rek2: "",
    name_rek2: "",
    no_tlp: "",
    theme_id: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const { user } = useAuth();

  const [fotoMp, setFotoMp] = useState(null);
  const [fotoMw, setFotoMw] = useState(null);
  const [galleries, setGalleries] = useState([]);

  const validateForm = () => {
    const newErrors = {};

    // 🧠 Field wajib isi
    const required = [
      "theme_id",
      "no_tlp",
      "fullname_mp",
      "nickname_mp",
      "fullname_bmp",
      "fullname_imp",
      "fullname_mw",
      "nickname_mw",
      "fullname_bmw",
      "fullname_imw",
      "date_akad",
      "venue_akad",
      "address_venue_akad",
      "date_resepsi",
      "venue_resepsi",
      "address_venue_resepsi",
    ];

    required.forEach((key) => {
      const value = form[key];

      if (value === null || value === undefined || (typeof value === "string" && value.trim() === "") || (typeof value !== "string" && !value)) {
        newErrors[key] = "Field wajib diisi.";
      }
    });

    if (fotoMp && fotoMp.size > 1024 * 1024) {
      newErrors.foto_mp = "Ukuran foto maksimal 1MB.";
    }

    if (fotoMw && fotoMw.size > 1024 * 1024) {
      newErrors.foto_mw = "Ukuran foto maksimal 1MB.";
    }

    if (galleries && Array.from(galleries).length > 0) {
      Array.from(galleries).forEach((file, index) => {
        if (file.size > 1024 * 1024) {
          newErrors[`galleries_${index}`] = `Ukuran foto galeri ke-${index + 1} maksimal 1MB.`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "foto_mp") {
      setFotoMp(files[0]);
    } else if (name === "foto_mw") {
      setFotoMw(files[0]);
    } else if (name === "galleries") {
      setGalleries(files);
    }
  };

  const previewMp = useMemo(() => fotoMp && URL.createObjectURL(fotoMp), [fotoMp]);
  const previewMw = useMemo(() => fotoMw && URL.createObjectURL(fotoMw), [fotoMw]);
  const previewGalleries = useMemo(() => (galleries?.length ? Array.from(galleries).map((f) => URL.createObjectURL(f)) : []), [galleries]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        await alertError("Periksa kembali data yang anda inputkan!");
        return;
      }
      setLoadButton(true);
      const token = localStorage.getItem("token");

      try {
        const formData = new FormData();

        // masukkan semua field biasa
        Object.entries(form).forEach(([key, value]) => {
          if (!["foto_mp", "foto_mw", "galleries"].includes(key)) {
            formData.append(key, value ?? "");
          }
        });

        // masukkan file baru (kalau ada)
        if (fotoMp) formData.append("foto_mp", fotoMp);
        if (fotoMw) formData.append("foto_mw", fotoMw);
        if (galleries?.length) {
          Array.from(galleries).forEach((file) => {
            formData.append("galleries[]", file);
          });
        }

        // spoof method PUT biar file tetap bisa dikirim via POST
        formData.append("_method", "PUT");

        await axios.post(`https://www.brewokode.site/api/wedd/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alertSuccess("Data berhasil diperbarui!");
        navigate("/");
      } catch (error) {
        console.error(error);
        alertError("Gagal memperbarui data!");
      } finally {
        setLoadButton(false);
      }
    },
    [form, fotoMp, fotoMw, galleries, id, navigate]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`https://www.brewokode.site/api/wedd/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetched = data.data;

        const formatDateTime = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          const offset = date.getTimezoneOffset();
          const localDate = new Date(date.getTime() - offset * 60000);
          return localDate.toISOString().slice(0, 16);
        };

        setForm({
          ...fetched,
          galleries: Array.isArray(fetched.galleries) ? fetched.galleries : fetched.galleries ? JSON.parse(fetched.galleries) : [],
          date_akad: formatDateTime(fetched.date_akad),
          date_resepsi: formatDateTime(fetched.date_resepsi),
          date_bertemu: fetched.date_bertemu?.split("T")[0] || "",
          date_komitmen: fetched.date_komitmen?.split("T")[0] || "",
          date_lamaran: fetched.date_lamaran?.split("T")[0] || "",
          date_wedding: fetched.date_wedding?.split("T")[0] || "",
        });
      } catch (error) {
        console.error("Error fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    return () => {
      if (previewMp) URL.revokeObjectURL(previewMp);
      if (previewMw) URL.revokeObjectURL(previewMw);
      previewGalleries.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewMp, previewMw, previewGalleries]);

  useEffect(() => {
    !user && navigate("/login");
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className="bg-gray-200/80 lg:px-4 md:px-2 px-2 py-5 rounded-lg shadow-ku font-noto">
      <h1 className="text-pink-950 text-xl font-bold ml-3 font-one">Edit Undangan</h1>
      <div className="overflow-x-auto ">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="lg:ml-1 md:ml-1 ml-1 lg:w-[99%] md:w-[99%] w-[98%] mb-2 mt-3 lg:px-5 px-3 py-4 rounded-lg shadow-ku bg-white ">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Tema</label>
                <select
                  id="theme_id"
                  name="theme_id"
                  value={form.theme_id}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 border rounded shadow-sm focus:ring-pink-400 focus:border-pink-400 outline-none text-sm ${errors.theme_id ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">-- Pilih Tema --</option>
                  <option value="1">Tema 1</option>
                </select>
                {errors.theme_id && <span className="text-red-500 text-xs">{errors.theme_id}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                <input
                  type="number"
                  name="no_tlp"
                  value={form.no_tlp}
                  onChange={handleChange}
                  placeholder="Nomer Hand Phone"
                  className={`w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.no_tlp ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.no_tlp && <span className="text-red-500 text-xs">{errors.no_tlp}</span>}
              </div>
            </div>
          </div>
          {/* Mempelai */}
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-2">
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] lg:px-5 px-3 pt-6 pb-8 rounded-lg shadow-ku mx-auto ">
              <h1 className="text-pink-950 text-base font-bold font-one">Mempelai Pria</h1>
              <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap mempelai Pria <span className="text-red-600 text-[14px]">*</span>
                </label>
                <input
                  type="text"
                  name="fullname_mp"
                  value={form.fullname_mp}
                  onChange={handleChange}
                  placeholder="Nama Lengkap Mempelai Pria"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.fullname_mp ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fullname_mp && <span className="text-red-500 text-xs">{errors.fullname_mp}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Panggilan mempelai Pria <span className="text-red-600 text-[14px]">*</span>
                </label>
                <input
                  type="text"
                  name="nickname_mp"
                  value={form.nickname_mp}
                  onChange={handleChange}
                  placeholder="Nama Panggilan Mempelai Pria"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.nickname_mp ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.nickname_mp && <span className="text-red-500 text-xs">{errors.nickname_mp}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Bapak Mempelai Pria <span className="text-red-600 text-[14px]">*</span>
                </label>
                <input
                  type="text"
                  name="fullname_bmp"
                  value={form.fullname_bmp}
                  onChange={handleChange}
                  placeholder="Nama Bapak Mempelai Pria"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.fullname_bmp ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fullname_bmp && <span className="text-red-500 text-xs">{errors.fullname_bmp}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Ibu Mempelai Pria <span className="text-red-600 text-[14px]">*</span>
                </label>
                <input
                  type="text"
                  name="fullname_imp"
                  value={form.fullname_imp}
                  onChange={handleChange}
                  placeholder="Nama Ibu Mempelai Pria"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.fullname_imp ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fullname_imp && <span className="text-red-500 text-xs">{errors.fullname_imp}</span>}
              </div>
            </div>
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] lg:px-5 px-3 pt-6 pb-8 rounded shadow-ku mx-auto">
              <h1 className="text-pink-950 text-base font-bold font-one">Mempelai Wanita</h1>
              <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap mempelai Wanita <span className="text-red-600 text-[14px]">*</span>
                </label>
                <input
                  type="text"
                  name="fullname_mw"
                  value={form.fullname_mw}
                  onChange={handleChange}
                  placeholder="Nama Lengkap mempelai Wanita"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.fullname_mw ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fullname_mw && <span className="text-red-500 text-xs">{errors.fullname_mw}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Panggilan mempelai Wanita <span className="text-red-600 text-[14px]">*</span>
                </label>
                <input
                  type="text"
                  name="nickname_mw"
                  value={form.nickname_mw}
                  onChange={handleChange}
                  placeholder="Nama panggilan mempelai Wanita"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.nickname_mw ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.nickname_mw && <span className="text-red-500 text-xs">{errors.nickname_mw}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Bapak Mempelai Wanita <span className="text-red-600 text-[14px]">*</span>
                </label>
                <input
                  type="text"
                  name="fullname_bmw"
                  value={form.fullname_bmw}
                  onChange={handleChange}
                  placeholder="Nama Bapak Mempelai Wanita"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.fullname_bmw ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fullname_bmw && <span className="text-red-500 text-xs">{errors.fullname_bmw}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Ibu Mempelai Wanita <span className="text-red-600 text-[14px]">*</span>
                </label>
                <input
                  type="text"
                  name="fullname_imw"
                  value={form.fullname_imw}
                  onChange={handleChange}
                  placeholder="Nama Ibu Mempelai Wanita"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.fullname_imw ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fullname_imw && <span className="text-red-500 text-xs">{errors.fullname_imw}</span>}
              </div>
            </div>
          </div>
          {/* Acara dan Love Story */}
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-2">
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] lg:px-5 px-3 pt-6 pb-8 rounded shadow-ku mx-auto">
              <h1 className="text-pink-950 text-base font-bold font-one">Acara</h1>
              <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Akad</label>
                <input
                  type="datetime-local"
                  name="date_akad"
                  value={form.date_akad}
                  onChange={handleChange}
                  placeholder="Tanggal Akad"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.date_akad ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.date_akad && <span className="text-red-500 text-xs">{errors.date_akad}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Resepsi</label>
                <input
                  type="datetime-local"
                  name="date_resepsi"
                  value={form.date_resepsi}
                  onChange={handleChange}
                  placeholder="Tanggal Resepsi"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.date_resepsi ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.date_resepsi && <span className="text-red-500 text-xs">{errors.date_resepsi}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue Akad</label>
                <input
                  type="text"
                  name="venue_akad"
                  value={form.venue_akad}
                  onChange={handleChange}
                  placeholder="Venue Akad"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.venue_akad ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.venue_akad && <span className="text-red-500 text-xs">{errors.venue_akad}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Venue Akad</label>
                <input
                  type="text"
                  name="address_venue_akad"
                  value={form.address_venue_akad}
                  onChange={handleChange}
                  placeholder="Ex: Jl. Hidup Jokowi"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.address_venue_akad ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.address_venue_akad && <span className="text-red-500 text-xs">{errors.address_venue_akad}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Google Map Venue Akad</label>
                <input
                  type="text"
                  name="lgm_venue_akad"
                  value={form.lgm_venue_akad}
                  onChange={handleChange}
                  placeholder="Link Google Map Venue Akad"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.lgm_venue_akad ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue Resepsi</label>
                <input
                  type="text"
                  name="venue_resepsi"
                  value={form.venue_resepsi}
                  onChange={handleChange}
                  placeholder="Nama Lengkap mempelai Pria"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.venue_resepsi ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.venue_resepsi && <span className="text-red-500 text-xs">{errors.venue_resepsi}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Venue Resepsi</label>
                <input
                  type="text"
                  name="address_venue_resepsi"
                  value={form.address_venue_resepsi}
                  onChange={handleChange}
                  placeholder="Ex: Jl. Fufu Fafa"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.address_venue_resepsi ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.address_venue_resepsi && <span className="text-red-500 text-xs">{errors.address_venue_resepsi}</span>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Google Map Venue Resepsi</label>
                <input
                  type="text"
                  name="lgm_venue_resepsi"
                  value={form.lgm_venue_resepsi}
                  onChange={handleChange}
                  placeholder="Link Google Map Venue Resepsi"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.lgm_venue_resepsi ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
            </div>
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] lg:px-5 px-3 pt-6 pb-8 rounded shadow-ku mx-auto">
              <h1 className="text-pink-950 text-base font-bold font-one">Love Story</h1>
              <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Awal Bertemu</label>
                <input
                  type="date"
                  name="date_bertemu"
                  value={form.date_bertemu}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.date_bertemu ? "border-red-500" : "border-gray-300"}`}
                />
                <textarea
                  name="story_bertemu"
                  value={form.story_bertemu}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm  ${errors.story_bertemu ? "border-red-500" : "border-gray-300"}`}
                  rows={3}
                  placeholder="Love Story"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Komitmen</label>
                <input
                  type="date"
                  name="date_komitmen"
                  value={form.date_komitmen}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.date_komitmen ? "border-red-500" : "border-gray-300"}`}
                />
                <textarea
                  name="story_komitmen"
                  value={form.story_komitmen}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.story_komitmen ? "border-red-500" : "border-gray-300"}`}
                  rows={3}
                  placeholder="Love Story"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Lamaran</label>
                <input
                  type="date"
                  name="date_lamaran"
                  value={form.date_lamaran}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.date_lamaran ? "border-red-500" : "border-gray-300"}`}
                />
                <textarea
                  name="story_lamaran"
                  value={form.story_lamaran}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.story_lamaran ? "border-red-500" : "border-gray-300"}`}
                  rows={3}
                  placeholder="Love Story"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">The Weeding</label>
                <input
                  type="date"
                  name="date_wedding"
                  value={form.date_wedding}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.date_wedding ? "border-red-500" : "border-gray-300"}`}
                />
                <textarea
                  name="story_wedding"
                  value={form.story_wedding}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.story_wedding ? "border-red-500" : "border-gray-300"}`}
                  rows={3}
                  placeholder="Love Story"
                ></textarea>
              </div>
            </div>
          </div>
          {/* Gallery & Gift */}
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-2 ">
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] lg:px-5 px-3 pt-6 pb-8 rounded shadow-ku mx-auto">
              <h1 className="text-pink-950 text-base font-bold font-one">Gallery</h1>
              <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto mempelai Pria <span className="text-[11px] text-red-700">(*Format jpg, jpeg, png, webp, max 1MB)</span>
                </label>
                <input
                  type="file"
                  name="foto_mp"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm cursor-pointer focus:ring-pink-400 focus:border-pink-400 outline-none text-sm"
                />
                {errors.foto_mp && <span className="text-red-500 text-xs">{errors.foto_mp}</span>}
                {(previewMp || form.foto_mp) && <img src={previewMp || `https://www.brewokode.site/storage/${form.foto_mp}`} alt="Mempelai Pria" className="w-32 h-32 object-cover mt-2" />}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto mempelai Wanita <span className="text-[11px] text-red-700">(*Format jpg, jpeg, png, webp, max 1MB)</span>
                </label>
                <input
                  type="file"
                  name="foto_mw"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm cursor-pointer focus:ring-pink-400 focus:border-pink-400 outline-none text-sm"
                />
                {errors.foto_mw && <span className="text-red-500 text-xs">{errors.foto_mw}</span>}
                {(previewMw || form.foto_mw) && <img src={previewMw || `https://www.brewokode.site/storage/${form.foto_mw}`} alt="Mempelai Wanita" className="w-32 h-32 object-cover mt-2" />}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gallery Foto <span className="text-[11px] text-red-700">(*Format jpg, jpeg, png, webp, max 1MB)</span>
                </label>
                <input
                  type="file"
                  name="galleries"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-3 py-1.5 border cursor-pointer border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400 outline-none text-sm"
                />
                {Array.from(galleries || []).map((file, i) =>
                  errors[`galleries_${i}`] ? (
                    <span key={i} className="text-red-500 text-xs block">
                      {errors[`galleries_${i}`]}
                    </span>
                  ) : null
                )}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {previewGalleries.length > 0
                    ? previewGalleries.map((src, i) => <img key={i} src={src} className="w-32 h-32 object-cover rounded" />)
                    : form.galleries?.map((path, i) => <img key={i} src={`https://www.brewokode.site/storage/${path}`} className="w-32 h-32 object-cover rounded" />)}
                </div>
              </div>
            </div>
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] lg:px-5 px-3 pt-6 pb-8 rounded-lg shadow-ku mx-auto">
              {/* Gift */}
              <h1 className="text-pink-950 text-base font-bold font-one">Gift</h1>
              <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Tujuan</label>
                <input
                  type="text"
                  name="name_tujuan"
                  value={form.name_tujuan}
                  onChange={handleChange}
                  placeholder="Nama Tujuan"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.name_tujuan ? "border-red-500" : "border-gray-300"}`}
                />
                <textarea
                  type="text"
                  name="alamat_tujuan"
                  value={form.alamat_tujuan}
                  onChange={handleChange}
                  placeholder="Alamat Tujuan"
                  className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm ${errors.alamat_tujuan ? "border-red-500" : "border-gray-300"}`}
                  rows={3}
                ></textarea>
              </div>
              {/* Cashless */}
              <h1 className="text-pink-950 text-base font-bold font-one">Cashless</h1>
              <div>
                <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Bank 1</label>
                  <select
                    id="bank"
                    name="rek1"
                    value={form.rek1}
                    onChange={handleChange}
                    className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.rek1 ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">-- Pilih Bank 1--</option>
                    <option value="bca">BCA</option>
                    <option value="bni">BNI</option>
                    <option value="bri">BRI</option>
                    <option value="mandiri">Mandiri</option>
                    <option value="cimb">CIMB Niaga</option>
                    <option value="bsi">Bank Syariah Indonesia (BSI)</option>
                  </select>
                  <input
                    type="number"
                    name="no_rek1"
                    value={form.no_rek1}
                    onChange={handleChange}
                    placeholder="Nomor Rekening"
                    className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.no_rek1 ? "border-red-500" : "border-gray-300"}`}
                  />
                  <input
                    type="text"
                    name="name_rek1"
                    value={form.name_rek1}
                    onChange={handleChange}
                    placeholder="Nama Pemilik Rekening"
                    className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.name_rek1 ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
              </div>
              <div>
                <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Bank 2</label>
                  <select
                    id="bank"
                    name="rek2"
                    value={form.rek2}
                    onChange={handleChange}
                    className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.rek2 ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">-- Pilih Bank 2--</option>
                    <option value="bca">BCA</option>
                    <option value="bni">BNI</option>
                    <option value="bri">BRI</option>
                    <option value="mandiri">Mandiri</option>
                    <option value="cimb">CIMB Niaga</option>
                    <option value="bsi">Bank Syariah Indonesia (BSI)</option>
                  </select>
                  <input
                    type="number"
                    name="no_rek2"
                    value={form.no_rek2}
                    onChange={handleChange}
                    placeholder="Nomor Rekening"
                    className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm mb-2 ${errors.no_rek2 ? "border-red-500" : "border-gray-300"}`}
                  />
                  <input
                    type="text"
                    name="name_rek2"
                    value={form.name_rek2}
                    onChange={handleChange}
                    placeholder="Nama Pemilik Rekening"
                    className={`w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm  ${errors.name_rek2 ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <button type="submit" className="w-full mt-4 bg-pink-950 text-white py-2 px-4 rounded font-semibold hover:bg-pink-900 cursor-pointer transition">
            {loadButton ? "Memproses Data...." : "Update Undangan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdmin;

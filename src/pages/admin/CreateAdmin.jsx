import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertError, alertSuccess } from "../../lib/alert";
import UserSelect from "../../components/others/UserSelect";

const CreateAdmin = () => {
  const navigate = useNavigate();
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
    user_id: "",
    theme_id: "",
  });
  const [errors, setErrors] = useState({});
  // Files
  const [fotoMp, setFotoMp] = useState(null);
  const [fotoMw, setFotoMw] = useState(null);
  const [galleries, setGalleries] = useState([]);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "foto_mp") setFotoMp(files[0]);
    if (name === "foto_mw") setFotoMw(files[0]);
    if (name === "galleries") setGalleries(files);
  };

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get("https://www.brewokode.site/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
      alertError("Gagal fetch users!");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 🧠 Field wajib isi
    const required = [
      "theme_id",
      "user_id",
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
      if (!form[key]?.trim()) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      await alertError("Periksa kembali data yang anda inputkan!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (fotoMp) formData.append("foto_mp", fotoMp);
    if (fotoMw) formData.append("foto_mw", fotoMw);

    if (galleries.length > 0) {
      Array.from(galleries).forEach((file) => formData.append("galleries[]", file));
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("https://www.brewokode.site/api/admin/wedd", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      await alertSuccess("Data Berhasil Disimpan");
      navigate("/hasbi/list");
    } catch (error) {
      alertError("Terjadi kesalahan!");
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error", error.response?.data || error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="bg-gray-200/80 lg:px-4 md:px-2 px-1 py-5 rounded shadow-ku font-noto">
      <h1 className="text-pink-950 text-2xl font-bold ml-3 font-one">Buat Undangan</h1>
      <div className="overflow-x-auto">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="lg:ml-1 md:ml-1 ml-1 lg:w-[99%] md:w-[99%] w-[98%] mb-2 mt-3 lg:px-5 md:px-3 px-3 py-4 rounded shadow-ku bg-white ">
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-5 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pilih Tema <span className="text-red-600 text-[14px]">*</span>
                </label>
                <select
                  id="theme_id"
                  name="theme_id"
                  value={form.theme_id}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 cursor-pointer border rounded shadow-sm focus:ring-pink-400 focus:border-pink-400 outline-none text-sm ${errors.theme_id ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">-- Pilih Tema --</option>
                  <option value="1">Tema 1</option>
                </select>
                {errors.theme_id && <span className="text-red-500 text-xs">{errors.theme_id}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama User <span className="text-red-600 text-[14px]">*</span>
                </label>
                <UserSelect users={users} form={form} setForm={setForm} errors={errors} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor WhatsApp <span className="text-red-600 text-[14px]">*</span>
                </label>
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
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-1">
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] lg:px-6 px-3 pt-6 pb-8 rounded shadow-ku mx-auto ">
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
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] lg:px-6 px-3 pt-6 pb-8 rounded shadow-ku mx-auto">
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
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-1">
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] lg:px-6 px-3 pt-6 pb-8 rounded shadow-ku mx-auto">
              <h1 className="text-pink-950 text-base font-bold font-one">Acara</h1>
              <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Akad <span className="text-red-600 text-[14px]">*</span>
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Resepsi <span className="text-red-600 text-[14px]">*</span>
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Akad <span className="text-red-600 text-[14px]">*</span>
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat Venue Akad <span className="text-red-600 text-[14px]">*</span>
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Resepsi <span className="text-red-600 text-[14px]">*</span>
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat Venue Resepsi <span className="text-red-600 text-[14px]">*</span>
                </label>
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
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] px-3 lg:px-6 pt-6 pb-8 rounded shadow-ku mx-auto">
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
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-1">
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] px-3 lg:px-6 pt-6 pb-8 rounded shadow-ku mx-auto">
              <h1 className="text-pink-950 text-base font-bold font-one">Gallery</h1>
              <div className="bg-gray-950/40 h-[2px] rounded-4xl w-full mb-3"></div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto mempelai Pria <span className="text-[11px] text-red-700">(*Format jpg, jpeg, png, webp, max 1MB)</span>
                </label>
                <input type="file" name="foto_mp" onChange={handleFileChange} className={`w-full px-3 cursor-pointer py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm `} />
                {errors.foto_mp && <span className="text-red-500 text-xs">{errors.foto_mp}</span>}
                {fotoMp && <img src={URL.createObjectURL(fotoMp)} alt="Preview Mempelai Pria" className="w-26 h-26 object-cover rounded mt-2" />}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto mempelai Wanita <span className="text-[11px] text-red-700">(*Format jpg, jpeg, png, webp, max 1MB)</span>
                </label>
                <input type="file" name="foto_mw" onChange={handleFileChange} className="w-full cursor-pointer px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm" />
                {errors.foto_mw && <span className="text-red-500 text-xs">{errors.foto_mw}</span>}
                {fotoMw && <img src={URL.createObjectURL(fotoMw)} alt="Preview Mempelai Pria" className="w-26 h-26 object-cover rounded mt-2" />}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gallery Foto <span className="text-[11px] text-red-700">(*Format jpg, jpeg, png, webp, max 1MB)</span>
                </label>
                <input
                  type="file"
                  name="galleries"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:ring-pink-400 focus:border-pink-400  outline-none text-sm"
                  multiple
                />
                {Object.entries(errors)
                  .filter(([key]) => key.startsWith("galleries_"))
                  .map(([key, msg]) => (
                    <span key={key} className="text-red-500 text-sm block">
                      {msg}
                    </span>
                  ))}
                {galleries.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {Array.from(galleries).map((file, index) => (
                      <img key={index} src={URL.createObjectURL(file)} alt={`Gallery ${index}`} className="w-20 h-20 object-cover rounded" />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white lg:w-[99%] md:w-[99%] w-[98%] px-3 lg:px-6 pt-6 pb-8 rounded shadow-ku mx-auto">
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
          <button type="submit" className="mt-4 w-full bg-pink-950 text-white py-2 px-4 rounded font-semibold hover:bg-pink-900 cursor-pointer transition">
            {loading ? "Memproses Data...." : "Simpan Undangan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;

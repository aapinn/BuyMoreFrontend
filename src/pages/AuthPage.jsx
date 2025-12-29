import { useState } from "react";
import { loginUser, registerUser, saveUser, verifyCode } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    code: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setIsVerifying(false);
    setForm({ username: "", email: "", password: "", code: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start spinner
    try {
      if (isLogin) {
        const response = await loginUser({ email: form.email, password: form.password });

        Swal.fire({
          icon: "success",
          title: `Welcome, ${response.data.user.username}! 👋`,
          timer: 1500,
          showConfirmButton: false
        });

        saveUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/");

      } else if (!isVerifying) {
        // register dulu
        await registerUser({ username: form.username, email: form.email, password: form.password });
        setIsVerifying(true);

      } else {
        // submit kode verifikasi
        await verifyCode({ email: form.email, code: form.code });

        Swal.fire({
          icon: "success",
          title: "Email berhasil diverifikasi!",
          text: "Sekarang kamu bisa login",
        });

        setIsVerifying(false);
        setIsLogin(true);
        setForm({ username: "", email: form.email, password: "", code: "" });
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Terjadi kesalahan!";
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: msg,
      });
    } finally {
      setLoading(false); // stop spinner
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f5efe6]">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-95 text-center">
        <h2 className="text-2xl font-bold mb-1 text-amber-600">
          {isLogin ? "BuyMore" : isVerifying ? "Verifikasi Email" : "Create Account"}
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          {isLogin
            ? "Enter your account details"
            : isVerifying
            ? "Masukkan kode verifikasi 6 digit yang dikirim ke email"
            : "Register to start shopping"}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && !isVerifying && (
            <input
              className="w-full p-3 border rounded-xl"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          )}

          <input
            className="w-full p-3 border rounded-xl"
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={isVerifying}
          />

          {!isVerifying && (
            <input
              className="w-full p-3 border rounded-xl"
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          )}

          {isVerifying && (
            <input
              className="w-full p-3 border rounded-xl text-center"
              type="text"
              maxLength={6}
              placeholder="Kode 6 digit"
              name="code"
              value={form.code}
              onChange={handleChange}
              required
            />
          )}

          <button
            type="submit"
            className="w-full p-3 bg-[#f2a965] font-semibold rounded-xl cursor-pointer hover:opacity-80 transition flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {isLogin ? "Sign In" : isVerifying ? "Verify" : "Register"}
          </button>
        </form>

        <div className="mt-6 text-gray-600 text-sm">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <span className="text-blue-600 cursor-pointer" onClick={toggleMode}>
                Register Now
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span className="text-blue-600 cursor-pointer" onClick={toggleMode}>
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon, AppleIcon, EyeIcon } from "@/components/icons"
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const isActive = email.length > 0 && password.length > 0;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post("http://localhost:3000/user/login", { email, password });
      console.log(response);
      console.log(response.data);
      
      navigate("/dashboard")

      setLoading(false)
    }
    catch (error) {
      
      const errMsg = error.response.data.message;

      console.log(errMsg); // backend message
      setError(errMsg)
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm  { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <ToastContainer/>

      {/* ── CARD ── */}
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl p-2"
      >

        {/* ── LEFT PANEL ── */}
        <div className="flex flex-col justify-center p-10 md:px-30 font-dm " >

          {/* Heading */}
          <h1 className="font-syne text-2xl font-bold text-white tracking-tight mb-1">Welcome!</h1>
          <p className="text-xs text-white/30 mb-7">Log in to NexStep to continue to.</p>

          {/* OAuth */}
          <button className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 text-sm mb-2.5 transition-all hover:bg-white/[0.08] hover:border-white/20">
            <GoogleIcon /> Log in with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 text-sm transition-all hover:bg-white/[0.08] hover:border-white/20">
            <AppleIcon /> Log in with Apple
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5 text-white/20 text-xs tracking-widest">
            <span className="flex-1 h-px bg-white/10" />
            OR
            <span className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={submitHandler}>

            {/* Email */}
            <div className="mb-3.5">
              <label className="block text-xs text-white/40 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-lg bg-white/4 border border-white/8 text-white/70 text-sm placeholder-white/20 outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/6"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs text-white/40">Password</label>

              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full py-2.5 px-3.5 pr-10 rounded-lg bg-white/4 border border-white/8 text-white/70 text-sm placeholder-white/20 outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/6"
                />
                <button type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  <EyeIcon show={showPass} />
                </button>
              </div>
              <button type="button" className="text-xs text-white/30 hover:text-violet-400 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={()=>{setLoading(true)}}
              type="submit"
              className={`w-full py-2.5 rounded-xl text-sm font-medium font-dm transition-all duration-200 ${isActive ? "text-white hover:-translate-y-0.5 bg-linear-to-br from-[#1561a0] to-[#0667c2]" : "text-white/25 cursor-default bg-neutral-950"
                }`}
              style={{
                boxShadow: isActive ? "0 8px 24px rgba(43, 111, 179,0.3)" : "none",
              }}
            >
              { loading ? "..." : "Login"}
            </button>

          </form>

          <p className="text-red-500 text-center mt-1 text-[12px] font-extralight"> {error} </p>

          {/* Sign Up */}
          <p className="text-center text-xs text-white/30 mt-5">
            Don't have an account?{" "}
            <Link to={'/register'} className="text-white/60 underline underline-offset-2 hover:text-violet-400 transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="hidden md:flex relative  flex-col items-end  overflow-hidden rounded-2xl "

        >
          <img
            className="w-full h-[96vh]  object-cover"
            src="https://img1.wsimg.com/isteam/getty/2216210177/:/" alt="" />

          {/* Hero Text */}
          <div className="absolute left-9 right-9 z-10" style={{ top: "35%", transform: "translateY(-75%)" }}>
            <h2
              className="font-syne font-bold text-white leading-tight mb-5"
              style={{ fontSize: "31px", letterSpacing: "-1px" }}
            >
              Helped 75K+ Careers{" "}
              <span className="text-white/45"> Move Forward.</span>
            </h2>
            <button
              className="inline-flex items-center gap-2 bg-linear-to-br from-[#1a67a7] to-[#0979e2] shadow-[0_4px_20px_rgba(43, 111, 179,0.45)] px-5 py-2.5 rounded-xl text-white text-sm font-medium font-dm transition-all hover:-translate-y-0.5"
            >
              <span
                className="flex items-center justify-center w-4 h-4 rounded text-xs"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                ▼
              </span>
              Find Your Match
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
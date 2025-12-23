import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/auth.api";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import type { RootState } from "../app/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

 const { loading, error } = useAppSelector(
  (state: RootState) => state.auth
);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser(form))
      .unwrap()
      .then(() => {
        navigate("/dashboard"); // ✅ success
      })
      .catch(() => {
        // ❌ error already in redux state
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex md:grid md:grid-cols-2">
      {/* LEFT BRAND */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <h1 className="text-4xl font-bold mb-4">AI Task Manager</h1>
        <p className="text-lg opacity-90">Plan smarter. Work faster.</p>
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg">

          <h2 className="text-xl sm:text-2xl font-semibold text-center">
            Welcome Back 👋
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full h-11 px-4 border rounded-lg"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full h-11 px-4 border rounded-lg"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-indigo-600 text-white rounded-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && (
              <p className="text-sm text-red-600 text-center">
                {error}
              </p>
            )}
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?
            <Link to="/signup" className="text-indigo-600 ml-1">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;

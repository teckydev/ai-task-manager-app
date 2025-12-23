import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import  {registerUser}  from "../services/auth.api";
import type { RootState } from "../app/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
const Register = () => {
 const dispatch = useAppDispatch(); 
  const navigate = useNavigate();
  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [form, setForm] = useState({
    name: "",
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

  dispatch(registerUser(form))
    .unwrap()
    .then(() => {
      navigate("/"); // go to login
    })
    .catch(() => {
      // error is already handled in redux state
    });
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg">

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
          Create Account ✨
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 sm:space-y-5"
        >
          <input
            name="name"
            placeholder="Your name"
            onChange={handleChange}
            className="w-full h-11 px-4 border rounded-lg"
          />

          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full h-11 px-4 border rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="w-full h-11 px-4 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-indigo-600 text-white rounded-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?
          <Link to="/" className="text-indigo-600 ml-1 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;

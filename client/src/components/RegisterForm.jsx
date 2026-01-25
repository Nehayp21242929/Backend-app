import { useState } from "react";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const RegisterForm = ({ onSuccess }) => {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    username: "",
    password: ""
  });

  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (avatar) data.append("avatar", avatar);

    try {
      const res = await registerUser(data);
      setUser(res.data.data.user);   // ✅ FIXED
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input name="fullname" required placeholder="Full name"
        onChange={handleChange}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"/>

      <input name="username" required placeholder="Username"
        onChange={handleChange}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"/>

      <input name="email" required placeholder="Email"
        onChange={handleChange}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"/>

      <input name="password" type="password" required placeholder="Password"
        onChange={handleChange}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"/>

      <input type="file" onChange={(e) => setAvatar(e.target.files[0])}
        className="w-full text-sm text-gray-300"/>

      <button className="w-full bg-green-600 p-2 rounded text-white hover:bg-green-500">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;

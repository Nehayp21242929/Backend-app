import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-5 text-gray-900 dark:text-white">
          {isLogin ? "Login to MediaFun" : "Create your MediaFun account"}
        </h2>

        {isLogin ? (
          <LoginForm onSuccess={() => navigate("/")} />
        ) : (
          <RegisterForm onSuccess={() => navigate("/")} />
        )}

        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer ml-1 font-medium"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Auth;

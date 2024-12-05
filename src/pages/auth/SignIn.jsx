import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "@/services/authService"; // Import the AuthService
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, data } = await AuthService.signInWithEmail(email, password);
    setLoading(false);
  
    if (error) {
      toast.error(error.message); // Display error toast
    } else {
      console.log("Sign In Successful!", data);
      toast.success("Sign In Successful!");
      
      // Check if user data is available
      const user = data?.user;
      console.log("User:", user); // Log the user data to ensure it's not null or undefined
  
      if (user) {
        // Proceed with navigation after user data is retrieved
        setTimeout(() => {
          navigate("/dashboard/home");
        }, 500);
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Sign in to your account to continue.
        </p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded-md ${
              loading
                ? "bg-gray-400"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/auth/sign-up"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SignIn;

// "use client";

// import { useState } from "react";
// import { Button, Input } from "@heroui/react"; // Hero UI Components
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//     const router = useRouter();
    
//     // State variables for input fields
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");

//     // Handle signup logic
//     const handleSignup = async () => {
//         setLoading(true);
//         setErrorMessage("");

//         try {
//             const response = await fetch("/api/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ username, email, password }),
//             });

//             const result = await response.json();
//             if (!response.ok) throw new Error(result.message);

           
//             router.push("/");  // Redirect to login page
//         } catch (error) {
//             setErrorMessage(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>

//                 {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

//                 <div className="space-y-4">
//                     <Input 
//                         value={username} 
//                         onChange={(e) => setUsername(e.target.value)}
//                         label="Username"
//                     />

//                     <Input 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)}
//                         label="Email"
//                         type="email"
//                     />

//                     <Input 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)}
//                         label="Password"
//                         type="password"
//                     />

//                     <Button 
//                         onClick={handleSignup} 
//                         disabled={loading} 
//                         className="w-full"
//                     >
//                         {loading ? "Signing up..." : "Sign Up"}
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeroSignupForm() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!username) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';

    // Email format validation
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Password length validation
    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Password match validation
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setIsLoading(true);
            setErrors("");
    
            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password }),
                });
    
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
    
               
                router.push("/");  // Redirect to login page
            } catch (error) {
                setErrors(error.message);
            } finally {
                setIsLoading(false);
            }
  };

  return (
    <div className="min-h-screen bg-[#edf0fe] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white mb-2">Create an account</h2>
              <p className="text-white/80">Enter your details to get started</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 space-y-6">
            {errors.form && (
              <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-3"
                    required
                  />
                </div>
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-3"
                    required
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-3"
                    required
                  />
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-3"
                    required
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? 'Signing up...' : 'Sign up'}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
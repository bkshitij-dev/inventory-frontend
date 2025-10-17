import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { ApiResponse } from "../types/ApiResponse";
import { AuthResponse, login } from "../services/authService";

import InputField from '../components/InputField'; 

import useFormValidation from '../hooks/useFormValidation';

import { constants } from '../constants';

const Login: React.FC = () => {

    const initialValues = {
        usernameOrEmail: '',
        password: '',
    };

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const navigate = useNavigate();

    const validationRules = {
        usernameOrEmail: (value: string) => {
            if (value.trim() === '') {
                return 'Email address is required.';
            } else if (!constants.EMAIL_REGEX.test(value)) {
                return 'Please enter a valid email address.';
            }
            return null; // No error
        },
        password: (value: string) => {
            if (value.trim() === '') {
                return 'Password is required.';
            }
            return null; // No error
        },
    };

    const {
        values,
        errors,
        handleChange,
        validateForm,
        setErrors, // Expose setErrors to set general form errors
    } = useFormValidation(initialValues, validationRules);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            setErrors((prevErrors) => ({ ...prevErrors, form: undefined }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, form: 'Please correct the errors in the form.' }));
            return;
        }

        setLoading(true);
        setServerError(null);

        try {
            const res: ApiResponse<AuthResponse> = await login(values);
            localStorage.setItem("accessToken", res.data!.accessToken);
            navigate("/dashboard");
        } catch (err: any) {
            setServerError(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Login Card/Container */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

          {errors.form && ( // Access general form error from errors object
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{errors.form}</span>
                </div>
            )}

          <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <InputField
                label="Email Address"
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="email"
                placeholder="you@example.com"
                value={values.usernameOrEmail}
                onChange={handleChange}
                error={errors.usernameOrEmail}
            />

          {/* Password Input */}
          <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                showPasswordToggle={true}
            />

          {/* Login Button */}
          <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Logging in..." : "Log In"}
          </button>

          {serverError && (
            <p className="text-sm text-red-600 text-center mt-2">
              {serverError}
            </p>
          )}
          </form>

          {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-600 hover:underline">
            Forgot password?
          </Link>
        </div>

          {/* Link to Registration */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Register here</Link>
            </p>
          </div>
      </div>
    </div>
  );
};

export default Login;
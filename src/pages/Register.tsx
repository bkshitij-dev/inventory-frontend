import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { register } from "../services/authService";

import InputField from '../components/InputField';

import useFormValidation from '../hooks/useFormValidation';

import {
  MIN_USERNAME_LENGTH,
  EMAIL_REGEX,
  HAS_UPPERCASE_REGEX,
  HAS_LOWERCASE_REGEX,
  HAS_NUMBER_REGEX,
  HAS_SPECIAL_CHAR_REGEX,
  MIN_PASSWORD_LENGTH,
} from '../constants';

const Register: React.FC = () => {

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const validationRules = {
    username: (value: string) => {
      if (value.trim() === '') {
        return 'Username is required.';
      } else if (value.length < MIN_USERNAME_LENGTH) {
        return `Username must be at least ${MIN_USERNAME_LENGTH} characters long.`;
      }
      return null;
    },
    email: (value: string) => {
      if (value.trim() === '') {
        return 'Email address is required.';
      } else if (!EMAIL_REGEX.test(value)) {
        return 'Please enter a valid email address.';
      }
      return null;
    },
    password: (value: string) => {
      if (value.trim() === '') {
        return 'Password is required.';
      } else if (value.length < MIN_PASSWORD_LENGTH) {
        return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
      } else if (!HAS_UPPERCASE_REGEX.test(value)) {
        return 'Password must contain at least one uppercase letter.';
      } else if (!HAS_LOWERCASE_REGEX.test(value)) {
        return 'Password must contain at least one lowercase letter.';
      } else if (!HAS_NUMBER_REGEX.test(value)) {
        return 'Password must contain at least one number.';
      } else if (!HAS_SPECIAL_CHAR_REGEX.test(value)) {
        return 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).';
      }
      return null;
    },
    confirmPassword: (value: string, allValues: typeof initialValues) => {
      if (value.trim() === '') {
        return 'Confirm password is required.';
      } else if (value !== allValues.password) {
        return 'Passwords do not match.';
      }
      return null;
    },
  };

  const {
    values,
    errors,
    handleChange,
    validateForm,
    setErrors, // Expose setErrors to set general form errors
    resetForm, // Expose resetForm to clear fields on success
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
      await register(values);
      setSuccess(true);
      setTimeout(() => navigate("/verify-email-sent", { state: { email: values.email } }), 500);
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Registration Card/Container */ }
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>

        {/* General form error/success display */ }
        { errors.form && (
          <div
            className={ `px-4 py-3 rounded relative mb-4 ${errors.form.includes('successful') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}` }
            role="alert"
          >
            <span className="block sm:inline">{ errors.form }</span>
          </div>
        ) }

        <form className="space-y-6" onSubmit={ handleSubmit }>
          {/* Username Input */ }
          <InputField
            label="Username"
            id="username"
            name="username"
            type="text"
            placeholder="your-username"
            value={ values.username }
            onChange={ handleChange }
            error={ errors.username }
          />

          {/* Email Input */ }
          <InputField
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={ values.email }
            onChange={ handleChange }
            error={ errors.email }
          />

          {/* Password Input */ }
          <InputField
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={ values.password }
            onChange={ handleChange }
            error={ errors.password }
            showPasswordToggle={ true }
          />

          {/* Confirm Password Input */ }
          <InputField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={ values.confirmPassword }
            onChange={ handleChange }
            error={ errors.confirmPassword }
            showPasswordToggle={ true }
          />

          {/* Register Button */ }
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            { loading && <Loader2 className="w-5 h-5 animate-spin" /> }
            { loading ? "Creating account..." : "Register" }
          </button>

          { serverError && (
            <p className="text-sm text-red-600 text-center mt-2">
              { serverError }
            </p>
          ) }

          { success && (
            <p className="text-sm text-green-600 text-center mt-2">
              Account created successfully! Redirecting to login...
            </p>
          ) }
        </form>

        {/* Link to Login */ }
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{ ' ' }
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
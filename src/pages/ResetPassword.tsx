import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { sendResetPassword } from "../services/authService";

import InputField from '../components/InputField';
import useFormValidation from '../hooks/useFormValidation';

import * as validation from '../utils/validation';

const ResetPassword: React.FC = () => {

    const initialValues = {
        password: '',
        confirmPassword: '',
    };
    
    const [message, setMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const validationRules = {
        password: (value: string) => validation.validatePasword(value),
        confirmPassword: (value: string, allValues: typeof initialValues) => validation.validateConfirmPassword(value, allValues),
    };

    const {
        values,
        errors,
        handleChange,
        validateForm,
        setErrors,
        resetForm,
    } = useFormValidation(initialValues, validationRules);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) {
            setError("Invalid or missing reset token.");
            return;
        }

        const isValid = validateForm();
    
        if (isValid) {
            setErrors((prevErrors) => ({ ...prevErrors, form: undefined }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, form: 'Please correct the errors in the form.' }));
            return;
        }
    
        setLoading(true);
        setError(null);

        try {
            setLoading(true);
            const res = await sendResetPassword(token, values.password);
            setMessage(res.message);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

                {message && <p className="text-green-600 text-center">{message}</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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

                    {/* Reset Button */ }
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        { loading && <Loader2 className="w-5 h-5 animate-spin" /> }
                        { loading ? "Resetting..." : "Reset Password" }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
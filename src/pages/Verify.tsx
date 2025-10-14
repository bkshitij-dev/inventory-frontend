import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyUser, resendVerificationEmailUsingToken } from "../services/authService";
import { Loader2 } from "lucide-react";

const Verify: React.FC = () => {

    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [resendLoading, setResendLoading] = useState(false);

    const token = searchParams.get("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid verification link");
            return;
        }

        const verify = async () => {
            try {
                const response = await verifyUser(token);
                setStatus("success");
                setMessage(response?.message || "User successfully verified!");
            } catch (error: any) {
                setStatus("error");
                setMessage(
                    error.response?.message ||
                    "Invalid or expired verification link."
                );
                setEmail(error.response?.data?.email || "");
            }
        };

        verify();
    }, [token]);

    const handleResend = async () => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid verification link");
            return;
        }

        try {
            setResendLoading(true);
            await resendVerificationEmailUsingToken(token);
            setMessage("Verification email resent successfully!");
        } catch (error: any) {
            setMessage(
                error.response?.message || "Failed to resend verification email"
            );
        } finally {
            setResendLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
                <p className="ml-2 text-gray-700">Verifying your account...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
                { status === "success" ? (
                    <>
                        <h1 className="text-2xl font-semibold text-green-600 mb-4">
                            { message }
                        </h1>
                        <button
                            onClick={ () => navigate("/login") }
                            className="text-blue-600 hover:underline">
                            Go to Login
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold text-red-600 mb-4">
                            { message }
                        </h1>
                        <p className="text-gray-600 mb-4">
                            If your verification link has expired, you can request a new one.
                        </p>
                        <button
                            disabled={ resendLoading }
                            onClick={ handleResend }
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            { resendLoading ? "Resending..." : "Resend Verification Email" }
                        </button>
                    </>
                ) }
            </div>
        </div>
    );
};

export default Verify;
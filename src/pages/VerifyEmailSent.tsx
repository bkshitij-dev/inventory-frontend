import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resendVerificationEmailUsingEmail } from "../services/authService";
import { Loader2, Mail } from "lucide-react";

const VerifyEmailSent: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string })?.email || "";

  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResend = async () => {
    try {
      setResending(true);
      await resendVerificationEmailUsingEmail(email);
      setMessage("Verification email resent successfully!");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Failed to resend verification email."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-md">
        <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Verify Your Email
        </h1>

        <p className="text-gray-600 mb-6">
          { email
            ? `A verification link has been sent to ${email}.`
            : "A verification link has been sent to your registered email." }
          <br />
          Please click the link in the email to activate your account.
        </p>

        { message && (
          <div className="mb-4 text-sm text-green-600 font-medium">
            { message }
          </div>
        ) }

        <button
          onClick={ handleResend }
          disabled={ resending }
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          { resending ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Resending...
            </span>
          ) : (
            "Resend Verification Email"
          ) }
        </button>

        <div className="mt-6">
          <button
            onClick={ () => navigate("/login") }
            className="text-blue-600 hover:underline text-sm"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailSent;
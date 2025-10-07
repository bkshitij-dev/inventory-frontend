import { useState } from 'react';

const Login: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEmail = e.target.value;
      setEmail(newEmail);

      setEmailError('');
      setFormError('');

      if (newEmail.trim() === '') {
          setEmailError('Email address is required.');
      } else if (!emailRegex.test(newEmail)) {
          setEmailError('Please enter a valid email address.');
      }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setPassword(newPassword);

      setPasswordError('');
      setFormError('');

      if (newPassword.trim() === '') {
          setPasswordError('Password is required.');
      }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let isValid = true;

        if (email.trim() === '') {
            setEmailError('Email address is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.trim() === '') {
            setPasswordError('Password is required.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            console.log('Attempting login with:');
            console.log('Email:', email);
            console.log('Password:', password);
            setFormError('');
        } else {
            console.log('Client-side validation failed. Please correct errors.');
            setFormError('Please correct the errors in the form.');
        }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Login Card/Container */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

          {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{formError}</span>
                </div>
            )}

          <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm
                        ${emailError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
                  `}
                  value={email}
                  onChange={handleEmailChange}
              />
          </div>

          {/* Password Input */}
          <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm
                        ${passwordError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
                  `}
                  value={password}
                  onChange={handlePasswordChange}
              />
              {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
          </div>

          {/* Login Button */}
          <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
              Log In
          </button>
          </form>

          {/* Link to Registration */}
          <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
              </a>
          </p>
          </div>
      </div>
    </div>
  );
};

export default Login;
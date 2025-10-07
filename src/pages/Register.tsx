import { useState } from 'react';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setUsernameError('');
    setFormError('');
    if (newUsername.trim() === '') {
      setUsernameError('Email address is required.');
    } else if (newUsername.length < 3) {
      setUsernameError('Password must be at least 3 characters long.');
    }
  };

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
    } else if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    }
    
    if (confirmPassword.trim() !== '' && newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
    } else if (confirmPassword.trim() !== '') {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError('');
    setFormError('');
    if (newConfirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm password is required.');
    } else if (newConfirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (username.trim() === '') {
      setUsernameError('Username is required.');
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters long.');
      isValid = false;
    } else {
      setUsernameError('');
    }

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
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm password is required.');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      console.log('Attempting registration with:');
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Password:', password);
      setFormError('');

      setFormError('Registration successful! You can now log in.');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } else {
      console.log('Client-side validation failed. Please correct errors.');
      setFormError('Please correct the errors in the form.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Registration Card/Container */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>

        {/* General form error/success display */}
        {formError && (
          <div
            className={`px-4 py-3 rounded relative mb-4 ${formError.includes('successful') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}
            role="alert"
          >
            <span className="block sm:inline">{formError}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="your-username"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm
                ${usernameError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
              `}
              value={username}
              onChange={handleUsernameChange}
            />
            {usernameError && <p className="mt-1 text-sm text-red-600">{usernameError}</p>}
          </div>

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
            {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
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

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm
                ${confirmPasswordError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
              `}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && <p className="mt-1 text-sm text-red-600">{confirmPasswordError}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a 
                href="#" 
                className="font-medium text-blue-600 hover:text-blue-500"
                >
                    Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
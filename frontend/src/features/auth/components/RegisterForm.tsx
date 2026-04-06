import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { validateField } from '../../../shared/hooks/useValidation';
import facebookIcon from '../../../assets/icons/facebook.png';
import appleIcon from '../../../assets/icons/apple.png';
import googleIcon from '../../../assets/icons/google.png';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [touched, setTouched] = useState({ 
    username: false, 
    email: false, 
    phone: false,
    password: false,
    confirmPassword: false
  });

  const usernameError = touched.username ? validateField('username', username) : null;
  const emailError = touched.email ? validateField('email', email) : null;
  const phoneError = touched.phone ? validateField('phone', phone) : null;
  const passwordError = touched.password ? validateField('password', password) : null;
  const confirmPasswordError = touched.confirmPassword 
    ? (password !== confirmPassword ? "Passwords do not match" : null) 
    : null;

  const isFormValid = useMemo(() => {
    return username.length > 0 && 
           email.length > 0 && 
           phone.length > 0 &&
           password.length > 0 && 
           confirmPassword.length > 0 &&
           password === confirmPassword &&
           validateField('username', username) === null &&
           validateField('email', email) === null &&
           validateField('phone', phone) === null &&
           validateField('password', password) === null;
  }, [username, email, phone, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      try {
        await authService.register({
          username,
          email,
          phone,
          password,
        });
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } catch (error) {
        // Error toasts are handled globally
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
      <Input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched({ ...touched, email: true })}
        error={emailError}
      />
      <Input
        placeholder="Create User name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => setTouched({ ...touched, username: true })}
        error={usernameError}
      />
      <Input
        type="tel"
        placeholder="Contact number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onBlur={() => setTouched({ ...touched, phone: true })}
        error={phoneError}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched({ ...touched, password: true })}
        error={passwordError}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => setTouched({ ...touched, confirmPassword: true })}
        error={confirmPasswordError}
      />
      
      <Button type="submit" disabled={!isFormValid || isLoading} className="mt-[8px]">
        {isLoading ? 'Registering...' : 'Register'}
      </Button>

      <div className="mt-[32px]">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-[12px]">
            <span className="px-4 bg-white text-[#A0A0A0]">or continue with</span>
          </div>
        </div>

        <div className="mt-[24px] flex justify-center gap-6">
          <button type="button" className="w-[45px] h-[45px] rounded-full flex items-center justify-center overflow-hidden border border-gray-200 hover:bg-gray-50 transition-colors">
            <img src={facebookIcon} alt="Facebook icon" className="w-6 h-6 object-contain" />
          </button>
          <button type="button" className="w-[45px] h-[45px] rounded-full flex items-center justify-center overflow-hidden border border-gray-200 hover:bg-gray-50 transition-colors">
            <img src={appleIcon} alt="Apple icon" className="w-6 h-6 object-contain" />
          </button>
          <button type="button" className="w-[45px] h-[45px] rounded-full flex items-center justify-center overflow-hidden border border-gray-200 hover:bg-gray-50 transition-colors">
            <img src={googleIcon} alt="Google icon" className="w-6 h-6 object-contain" />
          </button>
        </div>
      </div>
    </form>
  );
};

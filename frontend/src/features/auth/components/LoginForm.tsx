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

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [touched, setTouched] = useState({ emailOrUsername: false, password: false });

  const emailOrUsernameError = touched.emailOrUsername && !emailOrUsername ? "Required" : null;
  const passwordError = touched.password ? validateField('password', password) : null;

  const isFormValid = useMemo(() => {
    return emailOrUsername.length > 0 &&
      password.length > 0 &&
      validateField('password', password) === null;
  }, [emailOrUsername, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      try {
        const response = await authService.login({
          username: emailOrUsername, // Send as username; backend handles if it is email
          password: password,
        });
        localStorage.setItem('accessToken', response.token);
        toast.success('Login successful!');
        navigate('/home');
      } catch (error) {
        // Toast handled by the interceptor
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
      <Input
        placeholder="Enter email or user name"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        onBlur={() => setTouched({ ...touched, emailOrUsername: true })}
        error={emailOrUsernameError}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched({ ...touched, password: true })}
        error={passwordError}
      />

      <div className="text-right w-full mt-[-16px]">
        <a href="#" className="text-[14px] text-[#A0A0A0] hover:text-[#5A52D5] transition-colors">
          Forgor password ?
        </a>
      </div>

      <Button type="submit" className="mt-[8px]">
        {isLoading ? 'Logging in...' : 'Login'}
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

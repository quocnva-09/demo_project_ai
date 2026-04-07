import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, heading }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-white">
      {/* Left Column */}
      <div className="flex flex-col w-full lg:w-1/2 justify-between p-[16px] sm:p-[20px] lg:p-[40px] xl:p-[60px] bg-[#FFFFFF]">
        <div>
          <h1 className="text-[18px] font-bold text-[#1A1A1A]">Your Logo</h1>
          <div className="mt-[120px]">
            <div className="max-w-[500px]">
              <h2 className="text-[28px] sm:text-[36px] lg:text-[52px] font-bold text-[#000000] leading-[1.1]">
                {isLogin ? "Sign In to" : "Sign Up to"}<br />
                <span className="font-medium text-[#000000] text-[16px] sm:text-[18px] lg:text-[20px]">Lorem Ipsum is simply</span>
              </h2>
              <div className="lg:hidden mt-[16px] text-[#1A1A1A] text-[14px] sm:text-[15px]">
                {isLogin ? (
                  <>
                    <p>If you don't have an account register</p>
                    <p>You can <Link to="/register" className="text-[#5A52D5] font-semibold hover:underline">Register here !</Link></p>
                  </>
                ) : (
                  <>
                    <p>If you already have an account</p>
                    <p>You can <Link to="/login" className="text-[#5A52D5] font-semibold hover:underline">Login here !</Link></p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-row justify-between w-full mt-10">
          <div className="text-[#1A1A1A] text-[16px]">
            {isLogin ? (
              <>
                <p className="mb-1">If you don't have an account register</p>
                <p>You can <Link to="/register" className="text-[#5A52D5] font-semibold hover:underline">Register here !</Link></p>
              </>
            ) : (
              <>
                <p className="mb-1">If you already have an account</p>
                <p>You can <Link to="/login" className="text-[#5A52D5] font-semibold hover:underline">Login here !</Link></p>
              </>
            )}
          </div>

          <div className="w-1/2 flex justify-end">
            <img
              src="/src/assets/3d-character.png"
              alt="Illustration"
              className="w-full max-w-[300px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-[24px] sm:px-[60px] xl:px-[100px]">
        <div className="w-full max-w-[500px] mx-auto">
          <h2 className="hidden lg:block text-[32px] font-semibold text-[#000000] mb-[32px]">{heading}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

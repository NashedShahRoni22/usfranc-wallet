"use client";
import { useState } from "react";
import { Mail, Lock, Loader2, Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useApp } from "@/app/context/AppContext";

export default function WalletLogin({setView}) {
  const router = useRouter();
  const { login, storeSessionData } = useApp();
  
  const [step, setStep] = useState(1); // 1: Login, 2: OTP Verification
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(300); // 5 minutes in seconds

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://server.usfrancwallet.com/v1/clients/authenticate/p1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSessionData(data);
        
        // Store session data in context and localStorage
        storeSessionData(data);
        
        setStep(2);
        toast.success("OTP sent successfully! Please check your email.");
        startOtpTimer();
        console.log("Login Response:", data);
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const startOtpTimer = () => {
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://server.usfrancwallet.com/v1/clients/authenticate/p2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionData.sessionId,
          otp: otp,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success("OTP verified successfully! Redirecting to dashboard...");
        console.log("OTP Verification Response:", data);
        
        // Use context login function to store all user data
        const loginSuccess = login(data);
        
        if (loginSuccess) {
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        } else {
          toast.error("Failed to complete login. Please try again.");
        }
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (step === 1) {
        handleLogin();
      } else {
        handleVerifyOtp();
      }
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://server.usfrancwallet.com/v1/clients/authenticate/p1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSessionData(data);
        storeSessionData(data);
        setOtpTimer(300);
        setOtp("");
        toast.success("OTP resent successfully!");
        startOtpTimer();
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setStep(1);
    setOtp("");
    setOtpTimer(300);
    setSessionData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">UF</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {step === 1 ? (
              <>
                Welcome Back to <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">USFranc</span>
              </>
            ) : (
              <>
                Verify Your <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Identity</span>
              </>
            )}
          </h1>
          <p className="text-gray-600">
            {step === 1 ? "Sign in to access your wallet" : "Enter the OTP sent to your email"}
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                } transition-all duration-300`}>
                  {step > 1 ? <CheckCircle2 className="w-6 h-6" /> : '1'}
                </div>
                <span className="text-xs mt-2 font-medium">Login</span>
              </div>
              
              {/* Connector */}
              <div className={`w-20 h-1 mx-2 ${
                step >= 2 ? 'bg-blue-600' : 'bg-gray-300'
              } transition-all duration-300`}></div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                } transition-all duration-300`}>
                  2
                </div>
                <span className="text-xs mt-2 font-medium">Verify OTP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form - Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                    className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>
        )}

        {/* OTP Verification Form - Step 2 */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="space-y-6">
              {/* Back Button */}
              <button
                onClick={handleBackToLogin}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </button>

              {/* User Info */}
              {sessionData && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Logged in as:</span> {sessionData.name}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    <span className="font-semibold">Email:</span> {formData.email}
                  </p>
                </div>
              )}

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  onKeyPress={handleKeyPress}
                  maxLength={6}
                  className="block w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="000000"
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    OTP sent to your registered email
                  </p>
                  {otpTimer > 0 ? (
                    <p className="text-xs font-semibold text-blue-600">
                      Expires in: {formatTime(otpTimer)}
                    </p>
                  ) : (
                    <p className="text-xs font-semibold text-red-600">
                      OTP Expired
                    </p>
                  )}
                </div>
              </div>

              {/* Verify Button */}
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6 || otpTimer === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?{" "}
                  <button
                    onClick={handleResendOtp}
                    disabled={loading || otpTimer > 240}
                    className="text-blue-600 hover:text-blue-800 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Resend OTP
                  </button>
                </p>
                {otpTimer > 240 && (
                  <p className="text-xs text-gray-500 mt-1">
                    You can resend OTP after {formatTime(otpTimer - 240)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {step === 1 && (
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <button onClick={() => setView(2)} className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold">
              Create Account
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
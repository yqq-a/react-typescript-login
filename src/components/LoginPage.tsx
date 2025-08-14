import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // 邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    // 密码验证
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6位字符';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除对应字段的错误信息
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`${loginMode === 'login' ? '登录' : '注册'}成功！`);
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('提交失败:', error);
      alert('操作失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setLoginMode(prev => prev === 'login' ? 'register' : 'login');
    setErrors({});
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300 opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* 主登录卡片 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* 头部 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {loginMode === 'login' ? '欢迎回来' : '创建账户'}
            </h1>
            <p className="text-white/70">
              {loginMode === 'login' ? '请登录您的账户' : '请填写注册信息'}
            </p>
          </div>

          {/* 表单 */}
          <div className="space-y-6">
            {/* 邮箱输入 */}
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    errors.email ? 'border-red-400' : 'border-white/20'
                  } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm`}
                  placeholder="请输入邮箱"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-red-300 text-sm">{errors.email}</p>
              )}
            </div>

            {/* 密码输入 */}
            <div>
              <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${
                    errors.password ? 'border-red-400' : 'border-white/20'
                  } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm`}
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-red-300 text-sm">{errors.password}</p>
              )}
            </div>

            {/* 记住我和忘记密码 */}
            {loginMode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-white/70">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2">记住我</span>
                </label>
                <button
                  type="button"
                  className="text-blue-300 hover:text-blue-200 transition-colors"
                >
                  忘记密码？
                </button>
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  处理中...
                </div>
              ) : (
                loginMode === 'login' ? '登录' : '注册'
              )}
            </button>
          </div>

          {/* 分隔线 */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/50 text-sm">或</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* 社交登录按钮 */}
          <div className="space-y-3">
            <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              使用 Google 登录
            </button>
          </div>

          {/* 切换模式 */}
          <div className="mt-6 text-center">
            <span className="text-white/70 text-sm">
              {loginMode === 'login' ? '还没有账户？' : '已有账户？'}
            </span>
            <button
              type="button"
              onClick={switchMode}
              className="ml-1 text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors"
            >
              {loginMode === 'login' ? '立即注册' : '立即登录'}
            </button>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-center mt-6 text-white/60 text-sm">
          © 2025 Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
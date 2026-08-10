import { useState } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';

const LogoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="currentColor"/>
  </svg>
);

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = isLogin ? '/auth/login' : '/auth/register';
      const res = await axios.post(url, form);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const res = await axios.post('/auth/google', { idToken });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-col justify-center w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-16 relative overflow-hidden">

        <div className="absolute top-16 left-16 w-24 h-24 bg-white/10 rounded-2xl rotate-12 animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-white/10 rounded-full animate-[float_5s_ease-in-out_infinite_0.5s]" />
        <div className="absolute bottom-24 left-24 w-20 h-20 bg-white/10 rounded-2xl -rotate-12 animate-[float_7s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-[float_4s_ease-in-out_infinite_1.5s]" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full animate-[float_8s_ease-in-out_infinite]" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-10">
            <span className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <LogoIcon className="w-5 h-5 text-indigo-600" />
            </span>
            <span className="text-2xl font-semibold">JobTrail</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Track every application.<br />Land the offer.
          </h1>
          <p className="text-indigo-100 text-lg">
            Organize your job search in a visual Kanban board, track analytics, and stay on top of every opportunity.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-gray-50 px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-2">Get Started</h2>
          <p className="text-gray-500 text-center mb-6">Create an account or log in to track your trail.</p>

          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md font-medium ${isLogin ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md font-medium ${!isLogin ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium">Name</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-1" placeholder="Alex Johnson" required />
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1" placeholder="alex@example.com" required />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1" placeholder="••••••••" required />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="w-full bg-indigo-600 text-white rounded-lg p-3 font-medium hover:bg-indigo-700">
              Continue
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full border rounded-lg p-3 font-medium flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>

          <p className="text-xs text-gray-400 text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
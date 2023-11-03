import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  customFetchMarket,
  addUserToLocalStorage,
  flattenErrorMessage,
} from '../utils';
import { useGlobalContext } from '../context';
import loginImage from '../assets/login1.svg';

const Login = () => {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await customFetchMarket.post('/admin/login', formData);
      const userData = response.data.data;
      addUserToLocalStorage(userData);
      const username = userData?.user.name;
      toast.success(`Welcome back ${username}`);
      setUser(userData);
      navigate('/redirect');
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(errorMessage || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 px-3">
      <div className="md:w-1/2 p-6 md:p-12 md:border-r md:shadow-sm border-primary-900">
        <img
          src={loginImage}
          alt="Login"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="md:w-1/2 p-6 md:px-28 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-medium mb-8 text-primary-500">
          Login to Your Account
        </h1>
        <Form method="POST" onSubmit={handleSubmit} className="w-full">
          <div className="mb-6 md:mb-12">
            <label
              htmlFor="email"
              className="block mb-2 text-medium font-medium text-primary-500"
            >
              Your email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Qaddafi@gmail.com"
              className="bg-gray-50 border border-primary-500 text-medium text-primary-500 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 mb-3"
              required
            />
          </div>
          <div className="mb-6 md:mb-12">
            <label
              htmlFor="password"
              className="block mb-2 text-medium font-medium text-primary-500"
            >
              Your password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              className="bg-gray-50 border border-primary-500 text-medium rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 mb-3"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-500 focus:ring-primary-300 border-gray-300 rounded checked:bg-primary-500 checked:border-transparent"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-primary-500"
            >
              Remember me
            </label>
          </div>

          <div className="">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-700'
              } text-white font-medium text-base rounded-lg focus:outline-none focus:ring focus:ring-primary-300 px-12 py-2`}
            >
              {isSubmitting ? 'Logging...' : 'Login'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

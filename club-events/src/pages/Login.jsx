import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../RoleContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setRole } = useRole();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/adminlogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Ensure cookies are sent
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                throw new Error('Invalid password or login failed');
            }

            const responsedata = await response.json();

            const data = responsedata.personData;

            setRole(data.role); // Update role in context
            toast.success(`Welcome, ${data.name}`);
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

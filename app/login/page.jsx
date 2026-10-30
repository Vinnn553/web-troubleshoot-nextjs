'use client'
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/admin', // Halaman tujuan setelah sukses login
            });
        } catch (err) {
            setError("Ambatukam")
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login Admin</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-lg mt-1"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-lg mt-1"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-[#42a6f8] text-white p-2 rounded-lg font-semibold hover:bg-[#3283c7]">
                    Masuk
                </button>
            </form>
        </div>
    );
}
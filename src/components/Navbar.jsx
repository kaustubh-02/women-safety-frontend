import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, User, LogOut, PhoneCall, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-pink-700 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter">
                    <ShieldAlert size={32} className="animate-pulse text-pink-200" />
                    <span>SHE-SHIELD</span>
                </Link>
                
                <div className="hidden md:flex gap-8 items-center font-medium">
                    {user ? (
                        <>
                            <Link to="/" className="hover:text-pink-200 transition-colors">SOS Home</Link>
                            <Link to="/contacts" className="hover:text-pink-200 flex items-center gap-1">
                                <PhoneCall size={18}/> Contacts
                            </Link>
                            {user.roles.includes('ROLE_ADMIN') && (
                                <Link to="/admin" className="bg-pink-900 px-3 py-1 rounded-md flex items-center gap-1 border border-pink-400">
                                    <LayoutDashboard size={18}/> Admin
                                </Link>
                            )}
                            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-pink-500">
                                <div className="flex items-center gap-2">
                                    <User size={18}/>
                                    <span className="text-sm font-bold uppercase">{user.username}</span>
                                </div>
                                <button onClick={handleLogout} className="bg-white text-pink-700 px-4 py-1.5 rounded-lg font-bold hover:bg-pink-100 transition-all flex items-center gap-1">
                                    <LogOut size={16}/> Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="hover:text-pink-200">Login</Link>
                            <Link to="/register" className="bg-white text-pink-700 px-5 py-2 rounded-lg font-bold hover:bg-pink-100 transition-all shadow-md">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
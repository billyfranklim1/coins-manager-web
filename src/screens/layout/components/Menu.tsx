import { useState } from 'react';
import { MdMenu, MdClose, MdArrowForward, MdArrowBack } from 'react-icons/md'; // Importe ícones adicionais
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('user');
        navigate('/');
    }

    const currentRoute = window.location.pathname;

    const isActive = (route: string) => {
        return currentRoute === route ? 'bg-blue-700' : '';
    }

    return (
        <div className="h-screen">
            <button
                className={`text-white p-2 rounded md:hidden ${isOpen ? 'bg-red-600' : 'bg-blue-600'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <MdArrowBack className="w-6 h-6"/> : <MdArrowForward className="w-6 h-6"/>}
            </button>

            <div className={`h-screen bg-blue-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-300 ease-in-out`}>
            <div className="flex justify-center">
                    <img src="public/logo-light.png" alt="avatar" className="p-2 "/>
                </div>
                <div className="flex justify-end md:hidden">
                    <button
                        className="text-white p-2"
                        onClick={() => setIsOpen(false)}
                    >
                        <MdClose className="w-6 h-6"/>
                    </button>
                </div>
    
                <a className={`block px-4 rounded transition duration-200 hover:bg-blue-700 ${isActive('/home')}`} onClick={() => navigate('/home')}>
                    {t("menu.home")}
                </a>
                <a className={`block px-4 rounded transition duration-200 hover:bg-blue-700 ${isActive('/groups')}`} onClick={() => navigate('/groups')}>
                    {t("menu.groups")}
                </a>
                <a className={`block px-4 rounded transition duration-200 hover:bg-blue-700`} onClick={handleLogout}>
                    {t("menu.logout")}
                </a>
            </div>
        </div>
    );
}

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Menu({ isOpen, handleMenu }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('user');
        navigate('/');
    };


    const currentRoute = window.location.pathname;

    const isActive = (route) => {
        return currentRoute === route ? 'bg-blue-700' : '';
    };

    return (
        <div className="relative h-screen">
            <div className="fixed left-0 top-1/2 z-40" style={{transform: `translateX(${isOpen ? '260px' : '0px'}) translateY(-50%)`}}>
                <button onClick={handleMenu} >
                    <span className={isOpen ? 'rotate-180' : ''}>
                        <div className="flex w-6 h-[72px] items-center justify-center">
                            <div className="flex h-10 flex-col items-center">
                                <div className="h-12 w-1 rounded-full" style={{background: 'gray', transform: 'translateY(0.15rem)'}}></div>
                                <div className="h-12 w-1 rounded-full" style={{background: 'gray', transform: 'translateY(-0.15rem)'}}></div>
                            </div>
                        </div>
                        <span style={{position: 'absolute', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)'}}>
                            {isOpen ? 'Close' : 'Open'} sidebar
                        </span>
                    </span>
                </button>
            </div>

            <div className={`fixed top-0 left-0 h-screen w-64 bg-blue-600 text-white transition duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{zIndex: 30}}>
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center">
                        <img src="public/logo-dark.png" alt="logo" className="px-2 "/>
                    </div>
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

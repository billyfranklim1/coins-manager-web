import { useState } from 'react';
import Menu from "./components/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    const handleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Menu isOpen={isOpen} handleMenu={handleMenu} />
        <div className={`flex flex-1 flex-col ${isOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
          <Header />
          <main className="flex-1 p-4 overflow-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    );
}

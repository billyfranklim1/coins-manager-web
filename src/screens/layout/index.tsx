import Menu from "./components/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout({ children }) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Menu />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 overflow-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }
  
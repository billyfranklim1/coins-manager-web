import { useState, useRef, useEffect } from "react";
import i18n from "../../i18n/config";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("us");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "br", name: "Português" },
    { code: "us", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
  ];

  useEffect(() => {

    const lng = localStorage.getItem("i18nextLng");
    if (lng) {
      i18n.changeLanguage(lng);
      setSelectedLanguage(lng);
    } else {
      i18n.changeLanguage("br");
      setSelectedLanguage("br");
      localStorage.setItem("i18nextLng", "br");
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lng: string): void => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    setIsOpen(false);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <div className="relative inline-block cursor-pointer" ref={dropdownRef}>
      <div
        className={`flex items-center justify-between gap-2 px-2 py-2 border border-gray-200 transition duration-150 ease-in-out ${
          isOpen
            ? "bg-gray-100 dark:bg-neutral-700"
            : "bg-white dark:bg-neutral-800"
        } dark:border-gray-600 dark:text-white`}
        onClick={toggleDropdown}
      >
        <span className={`fi fi-${selectedLanguage}`}></span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "-rotate-180" : "rotate-0"
          }`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {isOpen && (
        <div className="absolute w-full mt-1 border border-gray-200 shadow-lg dark:border-gray-600">
          <div className="bg-white dark:bg-neutral-800">
            {languages.map((language) => (
              <div
                key={language.code}
                className="px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-neutral-700"
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className={`fi fi-${language.code}`}></span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

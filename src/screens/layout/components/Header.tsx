// Import statements for React functionality and external components
import React from "react";
import { useTranslation } from "react-i18next";

// Import local components
import DarkModeSwitch from "../../../components/DarkModeSwitcher";
import LanguageSelector from "../../../components/LanguageSelector";

// Header component definition
export default function Header() {
  const { t } = useTranslation();

  // Safely parse the 'user' object from localStorage
  const userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem as string) : null;
  const userName = user ? user.name.split(" ")[0] : "User"; // Default name if user is null

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          {/* <DarkModeSwitch /> */}
          <span>
            {t("header.welcome")}, {userName}
          </span>
        </div>
      </div>
    </div>
  );
}

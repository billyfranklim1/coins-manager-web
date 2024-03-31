import { useTranslation } from "react-i18next";
import DarkModeSwitch from "../../../components/DarkModeSwitcher";
import LanguageSelector from "../../../components/LanguageSelector";

export default function Header() {
  const { t } = useTranslation();

  const userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem as string) : null;
  const userName = user ? user.name.split(" ")[0] : "User";

  return (
    <div className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          
        </h1>
        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
          <LanguageSelector />
          <DarkModeSwitch />
          <span>
            {t("header.welcome")}, {userName}
          </span>
        </div>
      </div>
    </div>
  );
}

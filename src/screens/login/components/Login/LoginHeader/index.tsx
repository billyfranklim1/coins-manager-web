import { useDarkMode } from "../../../../../contexts/DarkMode/DarkModeContext";
import { useTranslation } from "react-i18next";

//props setIsLogin
export default function LoginHeader({ setIsLogin, isLogin}) {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();

  return (
    <div className="my-10 flex justify-between select-none">
      <img
        alt=""
        className="h-8"
        src={`${!isDarkMode ? "logo-light.png" : "logo-dark.png"}`}
      />
      <a href="#"  onClick={() => setIsLogin(!isLogin)} className={`text-blue-500 cursor-pointer ${!isLogin ? "hidden" : ""}`}>
        {t("login.createAccount")} {isLogin}
      </a>
    </div>
  );
}

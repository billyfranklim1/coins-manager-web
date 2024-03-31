import { useState } from "react";
import DarkModeSwitcher from "../../../../../components/DarkModeSwitcher";
import SocialLoginButtons from "../SocialLoginButtons";
import Divider from "../Divider";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import OpenBannerButton from "../OpenBannerButton";
import LoginHeader from "../LoginHeader";
import WelcomeMessage from "../WelcomeMessage";
import { useBanner } from "../../../../../contexts/Banner/BannerContext";
import LanguageSelector from "../../../../../components/LanguageSelector/index";

export default function LoginContainer() {
  const { isOpen } = useBanner();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div
        className={`h-full px-10 md:w-full w-full flex justify-center dark:bg-neutral-800 	
        ${
          isOpen
            ? "md:w-1/3 w-full lg:w-1/3"
            : "w-full md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12  "
        }`}
      >
        {!isOpen && <OpenBannerButton />}

        <div className={`${isOpen ? "w-full" : "w-full"}`}>
          <div className="flex justify-between align-center my-5">
            <LanguageSelector />
            <DarkModeSwitcher />
          </div>
          {isLogin ? (
            <>
              <LoginHeader setIsLogin={setIsLogin} isLogin={isLogin} />
              <WelcomeMessage />
              <LoginForm setIsLogin={setIsLogin} />
            </>
          ) : (
            <>
              <LoginHeader setIsLogin={setIsLogin} isLogin={isLogin} />
              <RegisterForm setIsLogin={setIsLogin} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

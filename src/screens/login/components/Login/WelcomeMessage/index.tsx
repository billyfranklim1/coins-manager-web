import { useTranslation } from "react-i18next";

export default function WelcomeMessage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col mt-5 select-none">
      <h1 className="text-3xl font-semibold text-neutral-800 dark:text-white">
        {t("login.welcome")}
      </h1>
    </div>
  );
}

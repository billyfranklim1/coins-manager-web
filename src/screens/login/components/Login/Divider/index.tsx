import { useTranslation } from "react-i18next";

export default function Divider() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center mt-10">
      <div className="flex-1 border-t border-gray-300"></div>
      <div className="px-2 text-gray-400">
        {t("login.or")}
      </div>
      <div className="flex-1 border-t border-gray-300"></div>
    </div>
  );
}

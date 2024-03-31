import { useTranslation } from 'react-i18next';

export default function Footer() {

    const { t } = useTranslation();
    return (
        <footer className="bg-gray-200 text-center lg:text-left dark:bg-gray-800">
        <div className="text-gray-700 text-center p-4 dark:text-gray-300 bg-gray-200 dark:bg-gray-800">
            © {new Date().getFullYear()} {t("footer.rights")}
        </div>
    </footer>
    );
}

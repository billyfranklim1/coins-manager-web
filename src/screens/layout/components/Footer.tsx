import { useTranslation } from 'react-i18next';

export default function Footer() {

    const { t } = useTranslation();
    return (
        <footer className="bg-gray-200 text-center lg:text-left ">
        <div className="text-gray-700 text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
            © {new Date().getFullYear()} {t("footer.rights")}
        </div>
    </footer>
    );
}

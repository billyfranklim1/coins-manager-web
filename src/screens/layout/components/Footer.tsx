

export default function Footer() {
    return (
        <footer className="bg-gray-200 text-center lg:text-left ">
        <div className="text-gray-700 text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
            © {new Date().getFullYear()} Minha Aplicação. Todos os direitos reservados.
        </div>
    </footer>
    );
}

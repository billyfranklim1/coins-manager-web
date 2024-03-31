import { DarkModeProvider } from "./DarkMode/DarkModeContext";
import { BannerProvider } from "./Banner/BannerContext";
import { ReactQueryProvider } from "./Query";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <DarkModeProvider>
        <BannerProvider>{children}</BannerProvider>
      </DarkModeProvider>
    </ReactQueryProvider>
  );
}

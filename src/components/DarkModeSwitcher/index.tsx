import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDarkMode } from "./../../contexts/DarkMode/DarkModeContext";

export default function DarkModeSwitcher() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.div
      animate={isDarkMode ? "dark" : "light"}
      className="rounded-full bg-gray-300 w-14 h-8 flex items-center justify-start p-1 dark:bg-gray-700 cursor-pointer"
      onClick={toggleDarkMode}
    >
      <motion.div
        initial={isDarkMode ? "dark" : "light"}
        animate={isDarkMode ? "dark" : "light"}
        variants={{
          dark: { x: 28 },
          light: { x: 2 },
        }}
        className={`w-4 h-4 rounded-full flex items-center justify-center`}
      >
        {isDarkMode ? <FaSun color="yellow" /> : <FaMoon color="gray" />}
      </motion.div>
    </motion.div>
  );
}

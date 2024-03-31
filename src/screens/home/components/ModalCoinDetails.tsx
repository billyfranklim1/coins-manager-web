import { useState } from "react";
import Modal from "react-modal";
import Pagination from "../../../components/Pagination";
import { useQuote } from "../hooks/useQuote";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeContext";
import { FaTimes } from "react-icons/fa";


Modal.setAppElement("#root");

export default function ModalCoinDetails({
  modalIsOpen,
  setIsOpen,
  selectedCoin,
}) {
  const [page, setPage] = useState(1);

  const { quotes } = useQuote(page, selectedCoin.id);

  const { isDarkMode } = useDarkMode();


  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "auto",
      zIndex: '1001',
      backgroundColor: isDarkMode ? "#1A202C" : "#fff",
    },
    overlay: {
      zIndex: '1000'
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNavigate = (page) => {
    setPage(page);
  };

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatCurrency(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "USD",
    });
  }

  function formatPercentage(value) {
    return `${Number(value).toFixed(2)}%`;
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Coin Details"
    >
      <div className="flex justify-between items-center dark:text-white">
        <h2 className="text-xl font-bold">Coin Details</h2>
        <button onClick={closeModal} className="text-red-500 dark:text-red-500 dark:hover:text-red-700 dark:hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-1 rounded-full hover:bg-red-100">
          <FaTimes />
        </button>
      </div>
      <div className="mt-4 flex flex-col dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:divide-gray-700">
        <div>
          <span className="font-bold">Name</span>: {selectedCoin.name}
        </div>
        <div>
          <span className="font-bold">Symbol</span>: {selectedCoin.symbol}
        </div>

        <table className="mt-5 h-full min-w-full divide-y divide-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:divide-gray-700 dark:hover:bg-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white dark:hover:text-white"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white dark:hover:text-white"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white dark:hover:text-white"
              >
                Market Cap
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white dark:hover:text-white"
              >
                Percent Change
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white dark:hover:text-white"
              >
                Volume 24h
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:text-white dark:divide-gray-700">
            {quotes &&
              quotes.data &&
              quotes.data.map((quote) => (
                <tr key={quote.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white dark:hover:text-white">
                    {formatDate(quote.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                    {formatCurrency(quote.price_usd)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                    {formatCurrency(quote.market_cap)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                    {formatPercentage(quote.percent_change_24h)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                    {formatCurrency(quote.volume_24h)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="mt-2 flex justify-center">
          <Pagination data={quotes} handleNavigate={handleNavigate} />
        </div>
      </div>
    </Modal>
  );
}

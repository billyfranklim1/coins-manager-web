import { useState } from "react";
import Modal from "react-modal";
import Pagination from "../../../components/Pagination";
import { useQuote } from "../hooks/useQuote";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function ModalCoinDetails({
  modalIsOpen,
  setIsOpen,
  selectedCoin,
}) {
  const [page, setPage] = useState(1);

  const { quotes } = useQuote(page, selectedCoin.id);

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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Coin Details</h2>
        <button onClick={closeModal}>Close</button>
      </div>
      <div className="mt-4 flex flex-col">
        <div>
          <span className="font-bold">Name</span>: {selectedCoin.name}
        </div>
        <div>
          <span className="font-bold">Symbol</span>: {selectedCoin.symbol}
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Market Cap
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Percent Change
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Volume 24h
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotes &&
              quotes.data &&
              quotes.data.map((quote) => (
                <tr key={quote.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatDate(quote.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(quote.price_usd)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(quote.market_cap)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPercentage(quote.percent_change_24h)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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

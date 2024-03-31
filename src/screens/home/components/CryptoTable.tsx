import React, { useState } from "react";
import ModalCoinDetails from "./ModalCoinDetails";
import { useCoin } from "../hooks/useCoin";
import Pagination from "../../../components/Pagination";

const CryptoTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [page, setPage] = useState(1);

  const { coins, isLoading, isError } = useCoin(page);

  const onNavigate = (page) => {
    setPage(page);
  };

  // const [quotes, setQuotes] = useState([]);

  // const token = "6|Du81TwZXjigh4zRCGFpeaP9smTRD0FdojwoOYd0k7cbc5334";

  const handleSelectedCoin = (coin) => {
    setSelectedCoin(coin);
    setModalIsOpen(true);
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Symbol
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coins &&
                  coins.data &&
                  coins.data.map((coin) => (
                    <tr key={coin.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button
                          onClick={() => handleSelectedCoin(coin)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {coin.name}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {coin.symbol}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <Pagination data={coins} handleNavigate={onNavigate} />
      </div>
      <ModalCoinDetails
        modalIsOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        selectedCoin={selectedCoin}
      />
    </div>
  );
};

export default CryptoTable;

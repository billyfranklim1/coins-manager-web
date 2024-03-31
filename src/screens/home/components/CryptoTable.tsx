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


  const handleSelectedCoin = (coin) => {
    setSelectedCoin(coin);
    setModalIsOpen(true);
  };

  return (
    <div className="flex flex-col relative">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:text-white dark:border-gray-700 dark:divide-gray-700 dark:bg-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white dark:hover:text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                  >
                    Symbol
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:text-white dark:divide-gray-700">
                {coins &&
                  coins.data &&
                  coins.data.map((coin) => (
                    <tr key={coin.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white dark:hover:text-white">
                        <button
                          onClick={() => handleSelectedCoin(coin)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-white dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          {coin.name}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
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

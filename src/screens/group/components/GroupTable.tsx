import React, { useState } from "react";
import { useGroup } from "../hooks/useGroup";
import { useTranslation } from "react-i18next";

import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import Pagination from "../../../components/Pagination";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { TailSpin } from "react-loader-spinner";

const GroupTable = ({ onEditGroup }: { onEditGroup: () => void }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { groups, isError, deleteGroupMutation } = useGroup(page);

  const handleNavigate = (newPage: string) => {
    const pageNumber = parseInt(newPage, 10);
    if (!isNaN(pageNumber)) {
      setPage(pageNumber);
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      setIsLoading(true);
      await deleteGroupMutation.mutateAsync(id);
    } catch (error) {
      console.error("Erro ao deletar o grupo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ConfirmDelete = (id) => {
    confirmAlert({
      title: t("confirm.title"),
      message: t("confirm.message"),
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleDeleteGroup(id),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-100 z-50 absolute top-0 left-0 opacity-75">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

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
                    {t("group.name")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("group.description")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("group.coins")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("group.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groups &&
                  groups.data &&
                  !isLoading &&
                  !isError &&
                  groups.data.map((group) => (
                    <tr key={group.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {group.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {group.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {group.coins.map((coin) => coin.symbol).join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-start space-x-2">
                        <a
                          href="#"
                          className="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-700"
                          onClick={() => onEditGroup(group)}
                        >
                          <FaEdit size={13} />
                        </a>
                        <a
                          href="#"
                          className="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-700"
                          onClick={() => ConfirmDelete(group.id)}
                        >
                          <FaTrash size={13} />
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>


              {groups && groups.data && groups.data.length === 0 && (
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
                    >
                      {t("group.empty")}
                    </td>
                  </tr>
                </tbody>
              )}

            </table>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <Pagination data={groups} handleNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default GroupTable;

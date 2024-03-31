import { useState } from "react";
import Layout from "../layout";
import GroupTable from "./components/GroupTable";
import ModalFormGroup from "./components/ModalFormGroup";
import { useTranslation } from "react-i18next";

export default function Group() {
  const { t } = useTranslation();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  const handleEditGroup = (groupData) => {
    setEditingGroup(groupData);
    setIsOpen(true);
  };
  return (
    <Layout>
      <>
        <div className="py-6 sm:px-6 lg:px-8  h-full">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {t("group.title")}
            </h1>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center "
              onClick={() => {
                setEditingGroup(null);
                setIsOpen(true);
              }}
            >
              {t("group.add")}
            </button>
          </div>
          <div className="mt-6">
            <GroupTable onEditGroup={handleEditGroup} />
          </div>
          <ModalFormGroup modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} editingGroup={editingGroup} />
        </div>
      </>
    </Layout>
  );
}

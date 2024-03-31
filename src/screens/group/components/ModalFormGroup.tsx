import { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import { useGroup } from "../hooks/useGroup";
import { Group, Coin } from "../types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdPersonOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";

Modal.setAppElement("#root"); // Substitua '#root' pelo seletor correto do seu app

export default function ModalFormGroup({
  modalIsOpen,
  setIsOpen,
  editingGroup = null,
}) {
  const isEditing = editingGroup !== null;
  const { t } = useTranslation();
  const {
    createGroupMutation,
    updateGroupMutation,
    coins,
    isLoadingCoins,
    isError,
  } = useGroup();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: isEditing ? editingGroup.id : 0,
      name: isEditing ? editingGroup.name : "",
      description: isEditing ? editingGroup.description : "",
      coins: isEditing ? editingGroup.coins.map((coin) => coin.id) : [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      coins: Yup.array().min(1, "Coins is required"),
    }),
    onSubmit: (group: Group, { setFieldError }) => {
    
        createGroupMutation.mutate(group, {
          onSuccess: () => {
            formik.resetForm();
            setIsLoading(false);
            setIsOpen(false);
            setSelectedOption([]);
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            setIsLoading(false);
            if (error.response && error.response.data.errors) {
              const { errors } = error.response.data;

              for (const key in errors) {
                const message = errors[key].join(", ");
                setFieldError(key, message);
              }
            }
          },
        });
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    if (coins && coins.data.length > 0) {
      const options = coins.data.map((coin: Coin) => ({
        value: coin.id,
        label: coin.name,
      }));

      setOptions(options);
    }
  }, [coins]);

  useEffect(() => {
    if (editingGroup && coins && coins.data.length > 0) {
      const selectedCoins = editingGroup.coins.map((coin) => ({
        value: coin.id,
        label: coin.name,
      }));
      setSelectedOption(selectedCoins);

      // set other fields
      formik.setFieldValue("id", editingGroup.id);
      formik.setFieldValue("name", editingGroup.name);
      formik.setFieldValue("description", editingGroup.description);
      formik.setFieldValue(
        "coins",
        editingGroup.coins.map((coin) => coin.id)
      );
    }
  }, [editingGroup, coins]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    formik.setFieldValue(
      "coins",
      selectedOption.map((item: any) => item.value)
    );
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel={isEditing ? "Edit group" : "Create a new group"}
    >
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">
            {isEditing ? t("group.edit") : t("group.create")}
          </h1>
          <button onClick={() => setIsOpen(false)}>
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <label className="block text-gray-400">{t("group.email")}</label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white">
                <MdPersonOutline size={20} />
              </span>
              <input
                type="text"
                className={`w-full p-2 border ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500 dark:border-red-500"
                    : "border-neutral-800	"
                } rounded-lg pl-10 focus:outline-none dark:bg-neutral-800	 dark:text-white dark:border-gray-600`}
                placeholder={t("group.name")}
                autoComplete="new-password"
                {...formik.getFieldProps("name")}
              />
            </div>
            <div className="text-red-500 h-5">
              {formik.errors.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-gray-400">
              {t("group.description")}
            </label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white">
                <MdPersonOutline size={20} />
              </span>
              <input
                type="text"
                className={`w-full p-2 border ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500 dark:border-red-500"
                    : "border-neutral-800	"
                } rounded-lg pl-10 focus:outline-none dark:bg-neutral-800	 dark:text-white dark:border-gray-600`}
                placeholder={t("group.description")}
                autoComplete="new-password"
                {...formik.getFieldProps("description")}
              />
            </div>
            <div className="text-red-500 h-5">
              {formik.errors.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-gray-400">{t("group.coins")}</label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white">
                <MdPersonOutline size={20} />
              </span>
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                isMulti
              />
            </div>
            <div className="text-red-500 h-5">
              {formik.errors.coins && formik.errors.coins.toString() ? (
                <div>{formik.errors.coins.toString()}</div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

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
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeContext";

Modal.setAppElement("#root"); // Substitua '#root' pelo seletor correto do seu app

export default function ModalFormGroup({
  modalIsOpen,
  setIsOpen,
  editingGroup = null,
}) {
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
      width: "500px",
      backgroundColor: isDarkMode ? "#1A202C" : "#fff",
    },
    overlay: {
      zIndex: "1000",
      backgroundColor: isDarkMode
        ? "rgba(0, 0, 0, 0.75)"
        : "rgba(255, 255, 255, 0.75)",
    },
  };

  const isEditing = editingGroup !== null;
  const { t } = useTranslation();
  const { createGroupMutation, coins } = useGroup();
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

  const handleCloseModal = () => {
    setIsOpen(false);
    formik.resetForm();
    setSelectedOption([]);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      style={customStyles}
      contentLabel={isEditing ? "Edit group" : "Create a new group"}
    >
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">
            {isEditing ? t("group.edit") : t("group.create")}
          </h1>
          <button
            onClick={() => handleCloseModal()}
            className="focus:outline-none dark:text-white dark:hover:text-white dark:hover:bg-gray-700"
          >
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <label className="block text-gray-400">{t("group.name")}</label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white">
                <MdPersonOutline size={20} />
              </span>
              <input
                type="text"
                className={`w-full p-2 border ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-800	"
                } rounded-lg pl-10 focus:outline-none dark:bg-gray-800	 dark:text-white dark:border-gray-600`}
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
                    : "border-gray-800	"
                } rounded-lg pl-10 focus:outline-none dark:bg-gray-800	 dark:text-white dark:border-gray-600`}
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
              {/* style select for dark mode */}
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                isMulti
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 4,
                  colors: {
                    ...theme.colors,
                    primary25: isDarkMode
                      ? "rgba(255, 255, 255, 0.2)"
                      : theme.colors.primary25, // Cor de fundo do item ao passar o mouse
                    primary: isDarkMode
                      ? "rgba(255, 255, 255, 0.5)"
                      : theme.colors.primary, // Cor de fundo do item selecionado
                    neutral0: isDarkMode
                      ? "rgb(31, 41, 55)"
                      : theme.colors.neutral0, // Cor de fundo do componente
                    neutral20: isDarkMode
                      ? "rgb(75, 85, 99)"
                      : theme.colors.neutral20, // Cor da borda em estado normal
                    neutral30: isDarkMode
                      ? "rgb(75, 85, 99)"
                      : theme.colors.neutral30, // Cor da borda ao passar o mouse/focar
                    neutral40: isDarkMode
                      ? "rgb(156, 163, 175)"
                      : theme.colors.neutral40, // Cor do ícone de seta
                    neutral50: isDarkMode
                      ? "rgb(156, 163, 175)"
                      : theme.colors.neutral50, // Cor do texto de placeholder
                    neutral80: isDarkMode
                      ? "rgb(229, 231, 235)"
                      : theme.colors.neutral80, // Cor do texto inserido
                  },
                })}
                classNamePrefix="react-select"
                className={`react-select-container ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : isDarkMode
                    ? "border-gray-800"
                    : "border-gray-400"
                }`}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "rgb(31, 41, 55)" : "white",
                    borderColor:
                      formik.touched.description && formik.errors.description
                        ? "rgb(248, 113, 113)"
                        : isDarkMode
                        ? "rgb(31, 41, 55)"
                        : "rgb(204, 204, 204)",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: isDarkMode
                        ? "rgb(156, 163, 175)"
                        : "rgb(204, 204, 204)",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "rgb(31, 41, 55)" : "white",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused
                      ? isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)"
                      : isDarkMode
                      ? "rgb(31, 41, 55)"
                      : "white",
                    color: isDarkMode
                      ? "rgb(229, 231, 235)"
                      : "rgb(33, 37, 41)",
                    "&:active": {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.2)",
                    },
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: isDarkMode
                      ? "rgb(229, 231, 235)"
                      : "rgb(33, 37, 41)",
                  }),
                  multiValueRemove: (provided) => ({
                    ...provided,
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? "rgb(248, 113, 113)"
                        : "rgb(222, 226, 230)",
                      color: isDarkMode ? "rgb(31, 41, 55)" : "rgb(33, 37, 41)",
                    },
                  }),
                }}
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

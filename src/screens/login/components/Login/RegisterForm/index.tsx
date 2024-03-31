import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  MdPersonOutline,
  MdLockOutline,
  MdInput,
  MdVisibilityOff,
  MdVisibility,
  MdEmail,
} from "react-icons/md";


import { AiOutlineLoading } from "react-icons/ai";
import { useLogin } from "../../../hooks/useLogin";
import { useTranslation } from "react-i18next";


// setIsLogin is a props
export default function RegisterForm({ setIsLogin }) {
  const { t } = useTranslation();


  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { registerMutation } = useLogin();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("formValidation.nameRequired")),
      email: Yup.string()
        .email(t("formValidation.emailInvalid"))
        .required(t("formValidation.emailRequired")),
      password: Yup.string()
        .min(6, t("formValidation.passwordMinLength"))
        .required(t("formValidation.passwordRequired")),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], t("formValidation.passwordMatch"))
        .required(t("formValidation.passwordConfirmationRequired")),
    }),
    onSubmit: (values, { setFieldError }) => {
      setIsLoading(true);
      registerMutation.mutate(values, {
        onSuccess: () => {
          // reset form
          formik.resetForm();
          setIsLoading(false);
          setIsLogin(true);



          
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          setIsLoading(false);
          if (error.response && error.response.data.error)
            setFieldError("password", error.response.data.error);

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

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="new-password"
        className="my-3"
      >
        <div className="mt-3">
          <label className="block text-gray-400">{t("register.name")}</label>
          <div className="mt-1 relative">
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
              placeholder={t("register.name")}
              autoComplete="new-password"
              {...formik.getFieldProps("name")}
            />
          </div>
          <div className="text-red-500 h-3">
            {formik.errors.name && formik.errors.name ? (
              <p className="text-sm">{formik.errors.name}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-gray-400">{t("register.email")}</label>
          <div className="mt-1 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white">
              <MdEmail size={20} />
            </span>
            <input
              type="text"
              className={`w-full p-2 border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 dark:border-red-500"
                  : "border-neutral-800	"
              } rounded-lg pl-10 focus:outline-none dark:bg-neutral-800	 dark:text-white dark:border-gray-600`}
              placeholder={t("register.email")}
              autoComplete="new-password"
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className="text-red-500 h-3">
            {formik.errors.email && formik.errors.email ? (
              <p className="text-sm">{formik.errors.email}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-gray-400">
            {t("register.password")}
          </label>
          <div className="mt-1 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white">
              <MdLockOutline size={20} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full p-2 border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 dark:border-red-500"
                  : "border-neutral-800	"
              } rounded-lg pl-10 focus:outline-none dark:bg-neutral-800	 dark:text-white dark:border-gray-600`}
              placeholder={t("register.password")}
              autoComplete="new-password"
              {...formik.getFieldProps("password")}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer dark:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </span>
          </div>
          <div className="text-red-500 h-3">
            {formik.errors.password && formik.errors.password ? (
              <p className="text-sm">{formik.errors.password}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-gray-400">
            {t("register.confirmPassword")}
          </label>
          <div className="mt-1 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white">
              <MdLockOutline size={20} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full p-2 border ${
                formik.touched.password_confirmation &&
                formik.errors.password_confirmation
                  ? "border-red-500 dark:border-red-500"
                  : "border-neutral-800	"
              } rounded-lg pl-10 focus:outline-none dark:bg-neutral-800	 dark:text-white dark:border-gray-600`}
              placeholder={t("register.confirmPassword")}
              autoComplete="new-password"
              {...formik.getFieldProps("password_confirmation")}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer dark:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </span>
          </div>
          <div className="text-red-500 h-3">
            {formik.errors.password_confirmation &&
            formik.errors.password_confirmation ? (
              <p className="text-sm">{formik.errors.password_confirmation}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-3 flex items-center">
          <input type="checkbox" id="acceptTerms" className="mr-2" />
          <label htmlFor="acceptTerms" className="text-gray-400">
            {t("register.acceptTerms")}
          </label>
        </div>
        {/* <div className="mt-3 flex justify-center">
          <HCaptcha sitekey={TOKEN} />
        </div> */}
        <button
          className="w-full mt-3 h-9 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center "
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin mr-2" />
          ) : (
            <>
              <MdInput className="mr-2" />
              {t("register.signUp")}
            </>
          )}
        </button>
      </form>
      <div className="flex justify-center my-5">
        <a href="#" className="text-center text-sm text-gray-400">
          <span>
            {t("register.haveAccount")}
            {""}{" "}
          </span>
          <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(true)}>
            {t("register.signIn")}
            </span>
        </a>
      </div>
    </>
  );
}

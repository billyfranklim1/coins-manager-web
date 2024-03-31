import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useTranslation } from "react-i18next";


export const useLogin = () => {
  const {t} = useTranslation();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.access_token);
      localStorage.setItem("token_type", data.data.token_type);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      toast.success(t("login.success"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });


  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success(t("register.success"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });


  return {
    loginMutation,
    registerMutation,
  };
};

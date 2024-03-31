import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGroups, getCoins, createGroup, deleteGroup } from "../api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";

export const useGroup = (page = 1) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["groups", page],
    queryFn: () => getGroups(page),
    initialData: { data: [], meta: { total: 0 } },
  });

  const {
    data: coins,
    isLoading: isLoadingCoins,
    isError: isErrorCoins,
  } = useQuery({ queryKey: ["coins"], queryFn: getCoins });

  const createGroupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success(t("group.success"), {
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


  const deleteGroupMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success(t("group.success"), {
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
    groups,
    isLoading,
    isError,
    coins,
    isLoadingCoins,
    isErrorCoins,
    createGroupMutation,
    deleteGroupMutation
  };
};

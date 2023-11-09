import { useToast } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";

const toastId = "1";

export const useShowErrorAndLogout = (): { showErrorAndLogout: () => void } => {
  const toast = useToast();
  const { logout } = useAuth();

  const showErrorAndLogout = () => {
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: `Hubo un error. Intente nuevamente`,
        status: "error",
      });
    }

    logout?.();
  };

  return { showErrorAndLogout };
};

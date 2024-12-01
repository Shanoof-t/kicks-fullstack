import { toast } from "react-toastify";

export const handleToast = (type, message, option = {}) => {
  const { onClose } = option;
  const toastOption = { className: "mt-12", onClose };
  if (type === "success") {
    toast.success(message, toastOption);
    return Promise.resolve();
  } else if (type === "fail") {
    toast.warning(message, toastOption);
  } else if (type === "error") {
    toast.error(message, toastOption);
  }
};

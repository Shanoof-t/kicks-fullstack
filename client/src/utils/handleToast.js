import { toast } from "react-toastify";

export const handleToast = (type, message, option = {}) => {
  const { onClose } = option;
  console.log(type, message);
  // const toastOption = { className: "mt-12", onClose };
  if (type === "success") {
    toast.success(message, { className: "mt-12", onClose });
    return Promise.resolve();
  } else if (type === "fail") {
    toast.warning(message, { className: "mt-12" });
  } else if (type === "error") {
    toast.error(message, { className: "mt-12" });
  }
};

import { toast } from "react-toastify";

export const handleToast = (type, message) => {
  if (type === "success") {
    toast.success(message, { className: "mt-12" });
  } else if (type === "fail") {
    toast.error(message, { className: "mt-12" });
  }
};

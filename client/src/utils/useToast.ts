import { toast } from "react-toastify";

function useToast() {
  const success = (msg: string) => toast.success(msg);
  const failed = (msg: string) => toast.error(msg);
  const information = (msg: string) => toast(msg);
  return { success, failed, information };
}

export default useToast;

import type { FormEvent } from "react";
import type { User } from "../../../types/user";

interface DeleteUserFormProps {
  poppedUser: User;
  setIsPopupOpen: (arg1: false | "rename" | "ban") => void;
  handleAdminConfirmation: (arg1: "PATCH" | "DELETE", e?: FormEvent) => void;
}

function DeleteUserForm({
  setIsPopupOpen,
  handleAdminConfirmation,
  poppedUser,
}: DeleteUserFormProps) {
  return (
    <>
      <p>es-tu sûr de vouloir bannir l'utilisateur {poppedUser.name}</p>
      <button
        onClick={() => {
          setIsPopupOpen(false);
          handleAdminConfirmation("DELETE");
        }}
        type="button"
      >
        BAN
      </button>
    </>
  );
}

export default DeleteUserForm;

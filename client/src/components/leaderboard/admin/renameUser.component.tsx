import type { FormEvent } from "react";
import type { User } from "../../../types/user";

interface RenameUserFormProps {
  poppedUser: User;
  setIsPopupOpen: (arg1: false | "rename" | "ban") => void;
  handleAdminConfirmation: (arg1: "PATCH" | "DELETE", e?: FormEvent) => void;
}

function RenameUserForm({
  setIsPopupOpen,
  handleAdminConfirmation,
  poppedUser,
}: RenameUserFormProps) {
  return (
    <form
      onSubmit={(e) => {
        setIsPopupOpen(false);
        handleAdminConfirmation("PATCH", e);
      }}
    >
      <input type="text" defaultValue={poppedUser.name} />
      <input type="submit" value="Renommer" />
    </form>
  );
}

export default RenameUserForm;

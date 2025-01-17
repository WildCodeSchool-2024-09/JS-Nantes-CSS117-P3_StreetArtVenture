interface AdminModalProps {
  isPopupOpen: false | "rename" | "ban";
  poppedUser: null | User;
  setIsPopupOpen: (arg1: false | "rename" | "ban") => void;
  handleAdminConfirmation: (arg1: "PATCH" | "DELETE", e?: FormEvent) => void;
}

interface RenameUserPopupFormProps {
  poppedUser: User;
  setIsPopupOpen: (arg1: false | "rename" | "ban") => void;
  handleAdminConfirmation: (arg1: "PATCH" | "DELETE", e?: FormEvent) => void;
}

interface DeleteUserPopupFormProps {
  poppedUser: User;
  setIsPopupOpen: (arg1: false | "rename" | "ban") => void;
  handleAdminConfirmation: (arg1: "PATCH" | "DELETE", e?: FormEvent) => void;
}

export type {
  DeleteUserPopupFormProps,
  RenameUserPopupFormProps,
  AdminModalProps,
};

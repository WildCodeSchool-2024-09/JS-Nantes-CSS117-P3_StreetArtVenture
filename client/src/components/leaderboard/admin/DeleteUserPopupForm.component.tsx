import type { DeleteUserPopupFormProps } from "./AdminModal";

function DeleteUserPopupForm({
  setIsPopupOpen,
  handleAdminConfirmation,
  poppedUser,
}: DeleteUserPopupFormProps) {
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

export default DeleteUserPopupForm;

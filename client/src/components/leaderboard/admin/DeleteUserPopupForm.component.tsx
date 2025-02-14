import type { DeleteUserPopupFormProps } from "./AdminModal";

function DeleteUserPopupForm({
  setIsPopupOpen,
  handleAdminConfirmation,
  poppedUser,
}: DeleteUserPopupFormProps) {
  return (
    <>
      <p>Es-tu sûr de vouloir bannir l'utilisateur {poppedUser.username}</p>
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

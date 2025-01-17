import type { RenameUserPopupFormProps } from "./AdminModal";

function RenameUserPopupForm({
  setIsPopupOpen,
  handleAdminConfirmation,
  poppedUser,
}: RenameUserPopupFormProps) {
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

export default RenameUserPopupForm;

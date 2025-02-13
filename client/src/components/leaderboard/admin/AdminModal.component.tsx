import type { AdminModalProps } from "./AdminModal";
import DeleteUserForm from "./DeleteUserPopupForm.component";
import RenameUserForm from "./RenameUserPopupForm.component";

function AdminModal({
  isPopupOpen,
  poppedUser,
  setIsPopupOpen,
  handleAdminConfirmation,
}: AdminModalProps) {
  return (
    <>
      {isPopupOpen && poppedUser && (
        <div className="leaderboard-popup-background">
          <div className="leaderboard-popup-container">
            {isPopupOpen === "rename" ? (
              <RenameUserForm
                poppedUser={poppedUser}
                setIsPopupOpen={setIsPopupOpen}
                handleAdminConfirmation={handleAdminConfirmation}
              />
            ) : (
              <div className="button-ban-refusal">
                <DeleteUserForm
                  poppedUser={poppedUser}
                  setIsPopupOpen={setIsPopupOpen}
                  handleAdminConfirmation={handleAdminConfirmation}
                />
                <button
                  className="leaderboard-popup-button-false"
                  type="button"
                  onClick={() => {
                    setIsPopupOpen(false);
                  }}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminModal;

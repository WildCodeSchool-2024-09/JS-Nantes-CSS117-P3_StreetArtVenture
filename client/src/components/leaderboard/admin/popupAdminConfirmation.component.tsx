import type { FormEvent } from "react";
import type { User } from "../../../types/user";
import DeleteUserForm from "./deleteUser.component";
import RenameUserForm from "./renameUser.component";

interface PopupAdminConfirmationProps {
  isPopupOpen: false | "rename" | "ban";
  poppedUser: null | User;
  setIsPopupOpen: (arg1: false | "rename" | "ban") => void;
  handleAdminConfirmation: (arg1: "PATCH" | "DELETE", e?: FormEvent) => void;
}

function PopupAdminConfirmation({
  isPopupOpen,
  poppedUser,
  setIsPopupOpen,
  handleAdminConfirmation,
}: PopupAdminConfirmationProps) {
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
              <DeleteUserForm
                poppedUser={poppedUser}
                setIsPopupOpen={setIsPopupOpen}
                handleAdminConfirmation={handleAdminConfirmation}
              />
            )}
            <button
              type="button"
              onClick={() => {
                setIsPopupOpen(false);
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
      ;
    </>
  );
}

export default PopupAdminConfirmation;

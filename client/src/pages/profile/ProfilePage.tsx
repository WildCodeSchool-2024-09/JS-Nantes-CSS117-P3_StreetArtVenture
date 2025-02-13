import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import "./profilePage.css";
import { useUser } from "../../context/UserContext";
import type { UserProfileData } from "../../types/user";
import { fetchWithAuth } from "../../utils/api";
import validationRules from "./ValidationRules";

function ProfilePage() {
  const [isLocked, setIsLocked] = useState(true);
  const [data, setData] = useState<null | UserProfileData>(null);

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileData>();

  const labels = [
    "Pseudonyme",
    "Prénom",
    "Nom",
    "Email",
    "Code postal",
    "Ville",
    "Adresse",
  ];

  useEffect(() => {
    // get user informations to pre-fill the inputs
    async function fetchUserData() {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/user/${user?.id}`,
      );
      const userData = await res.json();
      setData(userData[0]);
      reset(userData[0]);
    }
    fetchUserData();
  }, [reset, user]);

  const onSubmit: SubmitHandler<UserProfileData> = (formData) => {
    if (isLocked) {
      setIsLocked(false);
      return;
    }

    fetchWithAuth(`${import.meta.env.VITE_API_URL}/user/${user?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // Puis ensuite re-verouiller les champs pour éviter les erreurs
    setIsLocked(true);
  };

  return data ? (
    <main className="profile-main-container">
      <div className="profile-form-container">
        <h1>Changez les informations de votre profil</h1>
        <img src="forme_blanche.png" alt="element graphique" />
        <form id="edit-profile" onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(data).map((key, index) => {
            return (
              <label key={key} htmlFor={`${key}-input`}>
                {labels[index]}
                <input
                  placeholder={labels[index]}
                  id={`${key}-input`}
                  {...register(
                    key as keyof UserProfileData,
                    validationRules[key as keyof UserProfileData],
                  )}
                  type="text"
                  disabled={isLocked}
                />
                {errors[key as keyof UserProfileData] && (
                  <span className="profile-page-error-message">
                    {errors[key as keyof UserProfileData]?.message}
                  </span>
                )}
              </label>
            );
          })}
          <input
            type="submit"
            value={
              isLocked
                ? "Modifier mon profil"
                : "Valider mes nouvelles informations"
            }
          />
        </form>
      </div>
    </main>
  ) : (
    <p>chargement de vos données..</p>
  );
}

export default ProfilePage;

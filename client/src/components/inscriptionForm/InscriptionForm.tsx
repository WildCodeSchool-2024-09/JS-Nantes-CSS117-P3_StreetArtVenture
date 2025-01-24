import "../inscriptionForm/InscriptionForm.css";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import validationRules from "./ValidationRules";

const InscriptionForm: React.FC = (): React.ReactNode => {
  type InscriptionFormValues = {
    firstName: string;
    userName: string;
    email: string;
    lastName: string;
    adresse: string;
    city: string;
    postal: number;
    password: string;
    confirmPassword: string;
  };

  const onSubmit = async (data: InscriptionFormValues) => {
    const {
      email,
      firstName,
      userName,
      lastName,
      adresse,
      city,
      postal,
      password,
    } = data;
    try {
      const response = await fetch("http://localhost:3310/user/registration", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          email: email,
          firstname: firstName,
          lastname: lastName,
          zipcode: postal,
          city: city,
          password: password,
          adresse: adresse,
          adress: adresse,
        }),
      });
      if (!response.ok) {
        throw new Error("Échec de l'inscription");
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InscriptionFormValues>();

  return (
    <main className="main-inscription-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Inscription</h2>
        {/* ................INPUT USERNAME....................... */}
        <section className="form-group">
          <label htmlFor="user-name">Nom d'utilisateur</label>
          <input
            id="user-name"
            type="text"
            {...register("userName", validationRules.userName)}
          />
          {errors.userName && (
            <p className="inscription-error-message">
              {errors.userName.message}
            </p>
          )}
        </section>
        {/* ................INPUT EMAIL....................... */}
        <section className="form-group">
          <label htmlFor="mail"> Mail </label>
          <input
            id="mail"
            type="mail"
            {...register("email", validationRules.email)}
          />
          {errors.email && (
            <p className="inscription-error-message">{errors.email.message}</p>
          )}
        </section>
        {/* ...................INPUT PRENOMS....................... */}
        <section className="form-group">
          <label htmlFor="name"> Prénoms </label>
          <input
            id="name"
            type="text"
            {...register("firstName", validationRules.firstName)}
          />
          {errors.firstName && (
            <p className="inscription-error-message">
              {errors.firstName.message}
            </p>
          )}
        </section>
        {/* ...................INPUT NOMS....................... */}
        <section className="form-group">
          <label htmlFor="last-name"> Noms </label>
          <input
            id="last-name"
            type="text"
            {...register("lastName", validationRules.lastName)}
          />
          {errors.lastName && (
            <p className="inscription-error-message">
              {errors.lastName.message}
            </p>
          )}
        </section>
        {/* ...................INPUT ADRESSE....................... */}
        <section className="form-group">
          <label htmlFor="adress"> Adresse </label>
          <input
            {...register("adresse", validationRules.adresse)}
            id="adress"
            type="text"
          />
          {errors.adresse && (
            <p className="inscription-error-message">
              {errors.adresse.message}
            </p>
          )}
        </section>
        {/* ......................INPUT VILLE.......................... */}
        <section className="form-group">
          <label htmlFor="city"> Ville </label>
          <input
            {...register("city", validationRules.city)}
            id="city"
            type="text"
          />
          {errors.city && (
            <p className="inscription-error-message">{errors.city.message}</p>
          )}
        </section>
        {/* ......................INPUT CODE POSTAL.......................... */}
        <section className="form-group">
          <label htmlFor="postal-code"> Code postal </label>
          <input
            {...register("postal", validationRules.postal)}
            id="postal-code"
            type="number"
          />
          {errors.postal && (
            <p className="inscription-error-message">{errors.postal.message}</p>
          )}
        </section>
        {/* ......................INPUT MOT DE PASSE....................... */}
        <section className="form-group">
          <label htmlFor="password"> Mot de passe </label>
          <input
            id="password"
            type="password"
            {...register("password", validationRules.password)}
          />
          {errors.password && (
            <p className="inscription-error-message">
              {errors.password.message}
            </p>
          )}
        </section>
        {/* ...................INPUT CONFIRMEZ MDP....................... */}
        <section className="form-group">
          <label htmlFor="password-confirmation">
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            id="password-confirmation"
            {...register("confirmPassword", validationRules.confirmPassword)}
          />
          {errors.confirmPassword && (
            <p className="inscription-error-message">
              {errors.confirmPassword.message}
            </p>
          )}
        </section>
        {/* ...................ESPACE ENTRE INPUT && BUTTONS....................... */}
        <button type="submit">S'inscrire</button>
        <p className="register-yet">
          Déjà inscrit ?
          <p>
            <NavLink id="nav-link" to="/Connexion">
              Se connecter
            </NavLink>
          </p>
        </p>
      </form>
    </main>
  );
};

export default InscriptionForm;

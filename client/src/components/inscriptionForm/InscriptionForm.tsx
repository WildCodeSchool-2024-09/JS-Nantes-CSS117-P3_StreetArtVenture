import "../inscriptionForm/InscriptionForm.css";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type InscriptionFormValues from "./InscriptionFormTypes";
import validationRules from "./ValidationRules";

const InscriptionForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: InscriptionFormValues) => {
    const {
      username,
      email,
      firstName,
      lastName,
      adresse,
      city,
      postal,
      password,
    } = data;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/registration`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            firstname: firstName,
            lastname: lastName,
            zipcode: postal,
            city: city,
            password: password,
            adress: adresse,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Impossible de s'inscire");
      }
      toast.success("Inscription réussie ! Bienvenue 🎉");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InscriptionFormValues>();

  return (
    <main className="main-inscription-form">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Inscription</h2>
        {/* ................INPUT USERNAME....................... */}
        <section className="form-group">
          <label htmlFor="user-name">Nom d'utilisateur</label>
          <input
            id="user-name"
            type="text"
            {...register("username", validationRules.userName)}
          />
          {errors.username && (
            <p className="inscription-error-message">
              {errors.username.message}
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
          <label htmlFor="name"> Prénom </label>
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
          <label htmlFor="last-name"> Nom </label>
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
        <section className="register-yet">
          Déjà inscrit ?
          <p>
            <NavLink id="nav-link" to="/Connexion">
              Se connecter
            </NavLink>
          </p>
        </section>
      </form>
    </main>
  );
};

export default InscriptionForm;

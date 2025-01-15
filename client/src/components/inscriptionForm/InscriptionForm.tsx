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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InscriptionFormValues>();
  const onSubmit = () => {};
  return (
    <main className="body-inscription-form">
      <form className="inscription-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="inscription-form-title">Inscription</h2>
        <section className="inscription-inputs-section">
          {/* ................INPUT USERNAME....................... */}
          <section className="form-group">
            <h4 className="input-information"> Nom d'utilisateur </h4>
            <input
              placeholder="..."
              className="inscription-input"
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
            <h4 className="input-information"> Mail </h4>
            <input
              placeholder="..."
              className="inscription-input"
              type="email"
              {...register("email", validationRules.email)}
            />
            {errors.email && (
              <p className="inscription-error-message">
                {errors.email.message}
              </p>
            )}{" "}
          </section>
          {/* ...................INPUT PRENOMS....................... */}
          <section className="form-group">
            <h4 className="input-information"> Prénom </h4>
            <input
              placeholder="..."
              className="inscription-input"
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
            <h4 className="input-information"> Noms </h4>
            <input
              placeholder="..."
              className="inscription-input"
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
          <section className="form-group-adress">
            <h4 className="input-information-adress"> Adresse </h4>
            <input
              {...register("adresse", validationRules.adresse)}
              className="inscription-input"
              type="text"
              placeholder="..."
            />
            {errors.adresse && (
              <p className="inscription-error-message-adress">
                {errors.adresse.message}
              </p>
            )}
          </section>
          {/* ......................INPUT VILLE.......................... */}
          <section className="form-group">
            <h4 className="input-information"> Ville </h4>
            <input
              {...register("city", validationRules.city)}
              className="inscription-input"
              type="text"
              placeholder="..."
            />
            {errors.city && (
              <p className="inscription-error-message">{errors.city.message}</p>
            )}
          </section>
          {/* ......................INPUT CODE POSTAL.......................... */}
          <section className="form-group">
            <h4 className="input-information"> Code postal </h4>
            <input
              {...register("postal", validationRules.postal)}
              className="inscription-input"
              type="number"
              placeholder="..."
            />
            {errors.postal && (
              <p className="inscription-error-message">
                {errors.postal.message}
              </p>
            )}
          </section>
          {/* ......................INPUT MOT DE PASSE....................... */}
          <section className="form-group">
            <h4 className="input-information"> Mot de passe </h4>
            <input
              className="inscription-input"
              type="password"
              placeholder="..."
              {...register("password", validationRules.password)}
            />
            {errors.password && (
              <p className="inscription-error-message">
                {errors.password.message}
              </p>
            )}
          </section>
          {/* .........................INPUT CONFIRMEZ MDP....................... */}
          <section className="form-group">
            <h4 className="input-information">
              {" "}
              Confirmez votre mot de passe{" "}
            </h4>
            <input
              placeholder="..."
              type="password"
              className="inscription-input"
              {...register("confirmPassword", validationRules.confirmPassword)}
            />
            {errors.confirmPassword && (
              <p className="inscription-error-message">
                {errors.confirmPassword.message}
              </p>
            )}
          </section>
          {/* ...................ESPACE ENTRE INPUT && BUTTONS....................... */}
          <button type="submit" className="inscription-form-button">
            S'inscrire
          </button>
          <p className="deja-inscrit">
            Déjà inscrit ?
            <NavLink to="/Connexion">
              <button type="button" className="connexion-form-button">
                Se connecter
              </button>
            </NavLink>
          </p>
        </section>
      </form>
    </main>
  );
};

export default InscriptionForm;

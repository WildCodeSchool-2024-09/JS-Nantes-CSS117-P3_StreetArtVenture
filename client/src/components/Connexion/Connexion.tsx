import { useForm } from "react-hook-form";
import type { ConnexionProps } from "./Connexion.types";
import "./Connexion.css";
import React from "react";
import { Link } from "react-router-dom";

export const Connexion: React.FC<ConnexionProps> = () => {
  const validationRules = {
    password: {
      required: "Saisissez votre mot de passe",
    },
    email: {
      required: "Saisissez votre E-mail",
      pattern: {
        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
        message: "Adresse mail invalide",
      },
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnexionProps>();

  const onSubmit = async (data: ConnexionProps) => {
    const { email, password } = data;
    try {
      const response = await fetch("http://localhost:3310/user/verify", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de la connexion");
      }

      const result = await response.json();
      const token = result.token;

      localStorage.setItem("authToken", token);

      window.location.href = "/home";
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <body className="connexion-page">
      <form className="connexion-container " onSubmit={handleSubmit(onSubmit)}>
        <h1 className="white center bangers-regular bigger">SE CONNECTER</h1>

        <input
          className="input montserrat"
          placeholder="Votre adresse mail"
          {...register("email", validationRules.email)}
        />
        {errors.email && (
          <p className="error-message montserrat">{errors.email.message}</p>
        )}

        <input
          className="input montserrat"
          type="password"
          placeholder="Votre mot de passe"
          {...register("password", validationRules.password)}
        />
        {errors.password && (
          <p className="error-message montserrat">{errors.password.message}</p>
        )}

        <label className="white checkbox montserrat">
          <input
            className="checkboxing"
            type="checkbox"
            id="reminder"
            name="reminder"
            checked={checked}
            onChange={handleChange}
          />
          Se souvenir de moi
        </label>

        <button className="green-button montserrat" type="submit">
          S'identifier
        </button>
        <h2 className="white center bangers-regular">Pas encore inscrit ?</h2>
        <Link
          className="white center bangers-regular margin-bot"
          to="/InscriptionForm"
        >
          S'inscrire
        </Link>
      </form>
    </body>
  );
};

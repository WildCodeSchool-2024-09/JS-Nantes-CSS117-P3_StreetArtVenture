import { useForm } from "react-hook-form";
import type { ConnexionProps } from "./Connexion.types";
import "./Connexion.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Connexion: React.FC<ConnexionProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    try {
      fetch(`${import.meta.env.VITE_API_URL}/user/verifyToken`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ token }),
      }).then((response) => {
        if (!response.ok) {
          return;
        }
        navigate("/");
      });
    } catch (error) {
      console.error("Erreur lors de la vérification de connexion:", error);
    }
  }, [navigate]);

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

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ConnexionProps) => {
    const { email, password } = data;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/verify`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            reminder: reminderValue,
          }),
        },
      );

      if (!response.ok) {
        setErrorMessage("E-mail ou mot-de-passe invalide ! ");
        throw new Error("Échec de la connexion");
      }

      const result = await response.json();
      const token = result.token;

      localStorage.setItem("authToken", token);

      navigate("/");
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  const [checked, setChecked] = React.useState(false);
  const [reminderValue, setReminderValue] = React.useState("2h");

  const handleChange = () => {
    setChecked(!checked);
    setReminderValue(checked ? "2h" : "30d");
  };
  return (
    <main className="connexion-page">
      <form className="connexion-container" onSubmit={handleSubmit(onSubmit)}>
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
        <p className="error-message">{errorMessage}</p>
        <h2 className="white center bangers-regular">Pas encore inscrit ?</h2>
        <Link
          className="white center bangers-regular margin-bot"
          to="/InscriptionForm"
        >
          S'inscrire
        </Link>
      </form>
    </main>
  );
};

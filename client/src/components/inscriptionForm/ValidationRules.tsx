const validationRules = {
  userName: {
    required: "Vous n'avez pas renseigné votre nom d'utilisateur",
    maxLength: {
      value: 20,
      message: "must be less than 20 characters",
    },
    minLength: { value: 5, message: "Name must be at least 5 characters" },
  },

  firstName: {
    required: "Vous n'avez pas renseigné votre prenom",
    minLength: { value: 3, message: "Name must be at least 3 characters" },
    maxLength: { value: 50, message: "Name must be less than 50 characters" },
  },

  lastName: {
    required: "Vous n'avez pas renseigné votre nom de famille",
    minLength: { value: 3, message: "Name must be at least 2 characters" },
    maxLength: { value: 50, message: "Name must be less than 50 characters" },
  },

  adresse: {
    required: "Vous n'avez pas renseigné votre adresse",
    minLength: { value: 3, message: "Name must be at least 10 characters" },
    maxLength: { value: 50, message: "Name must be less than 50 characters" },
  },

  city: {
    required: "Vous n'avez pas renseigné votre ville",
    minLength: { value: 3, message: "Name must be at least 10 characters" },
    maxLength: { value: 25, message: "Name must be less than 50 characters" },
  },

  postal: {
    required: "Vous n'avez pas renseigné votre code postal",
    minLength: {
      value: 2,
      message: "Le code postal must be at least 2 characters",
    },
  },

  email: {
    required: "Vous n'avez pas renseigné votre email",
    pattern: {
      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      message: "Invalid email format",
    },
  },

  password: {
    required: "Vous n'avez pas renseigné votre mot de passe",
    pattern: {
      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      message:
        "Votre mot de passe doit contenir au minimum 5 caracteres dont 1 caractere special et 1 chiffre",
    },
  },

  confirmPassword: {
    required: "Vous devez confirmer votre mot de passe",
  },
};

export default validationRules;

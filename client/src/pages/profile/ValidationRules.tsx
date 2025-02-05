const validationRules = {
  username: {
    required: "Vous n'avez pas renseigné votre nom d'utilisateur",
    maxLength: {
      value: 25,
      message: "Le nom d'utilisateur doit contenir moins de 25 caractères",
    },
    minLength: {
      value: 4,
      message: "Le nom d'utilisateur doit contenir au moins 4 caractères",
    },
  },

  firstname: {
    required: "Vous n'avez pas renseigné votre prenom",
    minLength: {
      value: 2,
      message: "Votre prenom doit contenir au moins 2 caractères",
    },
    maxLength: {
      value: 30,
      message: "Le prenom doit contenir moins de 30 caractères",
    },
  },

  lastname: {
    required: "Vous n'avez pas renseigné votre nom de famille",
    minLength: {
      value: 2,
      message: "Votre nom doit contenir au moins 2 caractères",
    },
    maxLength: {
      value: 40,
      message: "Le nom doit contenir moins de 40 caractères",
    },
  },

  adress: {
    required: "Vous n'avez pas renseigné votre adresse",
    minLength: {
      value: 10,
      message: "L'adresse doit contenir au moins 10 caractère",
    },
    maxLength: {
      value: 50,
      message: "L'adresse' doit contenir moins de 50 caractère",
    },
  },

  city: {
    required: "Vous n'avez pas renseigné votre ville",
    maxLength: {
      value: 30,
      message: "La ville doit contenir moins de 30 caractères",
    },
  },

  zipcode: {
    required: "Vous n'avez pas renseigné votre code postal",
    minLength: {
      value: 2,
      message: "Le code postal doit contenir au moins 2 caracteres",
    },
    maxLength: {
      value: 10,
      message: "Le code postal doit contenir au maximum 10 caracteres",
    },
  },

  email: {
    required: "Vous n'avez pas renseigné votre email",
    pattern: {
      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      message: "Le format de l'e-mail est invalide",
    },
  },
};

export default validationRules;

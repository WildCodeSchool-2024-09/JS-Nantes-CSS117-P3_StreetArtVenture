import type { Request } from "express";
import validationRules from "./ValidationRules";

export function registerValidator(data: Request) {
  const {
    username,
    firstname,
    lastname,
    email,
    zipcode,
    city,
    adress,
    password,
  } = data.body;

  /* username */
  if (!username) return validationRules.userName.required;
  if (username.length < validationRules.userName.minLength.value)
    return validationRules.userName.minLength.message;
  if (username.length > validationRules.userName.maxLength.value)
    return validationRules.userName.maxLength.message;
  /* firstname */
  if (!firstname) return validationRules.firstName.required;
  if (firstname.length < validationRules.firstName.minLength.value)
    return validationRules.firstName.minLength.message;
  if (firstname.length > validationRules.firstName.maxLength.value)
    return validationRules.firstName.maxLength.message;
  /* lastname */
  if (!lastname) return validationRules.lastName.required;
  if (lastname.length < validationRules.lastName.minLength.value)
    return validationRules.lastName.minLength.message;
  if (lastname.length > validationRules.lastName.maxLength.value)
    return validationRules.lastName.maxLength.message;
  /* email */
  if (!email.length) return validationRules.email.required;
  if (!validationRules.email.pattern.value.test(email)) {
    return validationRules.email.pattern.message;
  }
  /* zipcode */
  if (!zipcode || zipcode.length < validationRules.postal.minLength) {
    return validationRules.postal.required;
  }
  /* city */
  if (city.length > validationRules.city.maxLength) {
    return validationRules.city.required;
  }
  /* adress */
  if (!adress) return validationRules.adresse.required;
  if (adress.length < validationRules.adresse.minLength.value)
    return validationRules.adresse.minLength.message;
  if (adress.length > validationRules.adresse.maxLength.value)
    return validationRules.adresse.maxLength.message;
  /* password */
  if (!password.length) return validationRules.password.required;
  if (!validationRules.password.pattern.value.test(password))
    return validationRules.password.pattern.message;
  return null;
}

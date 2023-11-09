import { AuthErrorCodes } from "firebase/auth";

enum FirebaseAuthErrorCodes {
  INVALID_EMAIL = "auth/invalid-email",
  EMAIL_EXISTS = "auth/email-already-in-use",
  MISSING_PASSWORD = "auth/wrong-password",
  WEAK_PASSWORD = "auth/weak-password",
}

export const getErrorMessageByCode = (code: FirebaseAuthErrorCodes): string => {
  switch (code) {
    case AuthErrorCodes.INVALID_EMAIL:
      return "Email invalido";
    case AuthErrorCodes.EMAIL_EXISTS:
      return "El email ya está en uso";
    case AuthErrorCodes.INVALID_PASSWORD:
      return "Debes ingresar un password valido";
    case AuthErrorCodes.WEAK_PASSWORD:
      return "Debes ingresar un password de al menos 6 caracteres";
    default:
      return "Hubo un error";
  }
};

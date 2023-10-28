import { type UsernameValidation } from "./types";

export const copyToClipboard = (text: string) => {
  void navigator.clipboard.writeText(text);
};

export const validationErrorText = (error: UsernameValidation) => {
  switch (error) {
    case "exist":
      return "Sorry, this username already in use";
    case "wrong":
      return "Username should be {3-20} char long, contains letters, numbers and underscore";
    case "general":
      return "Something went wrong, try again";
    default:
      return "";
  }
};

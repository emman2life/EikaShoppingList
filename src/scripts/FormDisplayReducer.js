// why are you passing list if is not used.
// Is this reducer neccesary? If feels that is something more local.
// Also this is just a boolean so instead of using names like "close" and "show" is a true or false.
export default function FormDisplayReducer(list, action) {
  switch (action.type) {
    case "close":
      return false;
    case "show":
      return true;
    default:
      return new Error("Unhandled action " + action.type);
  }
}

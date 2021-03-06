export const FORM_UPDATE = "FORM_UPDATE";

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedValue = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      let formIsValid = true;
      for (const key in updatedValidities) {
        formIsValid = formIsValid && updatedValidities[key];
      }

      return {
        inputValues: updatedValue,
        inputValidities: updatedValidities,
        formIsValid: formIsValid,
      };
    default:
      return state;
  }
};

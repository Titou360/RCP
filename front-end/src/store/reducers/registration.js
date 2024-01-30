const initialState = {
  personalInfo: {},
  verificationInfo: {},
  optionChoice: null,
  isCompleted: false,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return { ...state, personalInfo: action.payload };
    case 'SET_VERIFICATION_INFO':
      return { ...state, verificationInfo: action.payload };
    case 'SET_OPTION_CHOICE':
      return { ...state, optionChoice: action.payload };
    case 'COMPLETE_REGISTRATION':
      return { ...state, isCompleted: true };
    default:
      return state;
  }
};

export default registrationReducer;

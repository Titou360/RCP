export const setPersonalInfo = (personalInfo) => ({
    type: 'SET_PERSONAL_INFO',
    payload: personalInfo,
  });
  
  export const setVerificationInfo = (verificationInfo) => ({
    type: 'SET_VERIFICATION_INFO',
    payload: verificationInfo,
  });
  
  export const setOptionChoice = (option) => ({
    type: 'SET_OPTION_CHOICE',
    payload: option,
  });
  
  export const completeRegistration = () => ({
    type: 'COMPLETE_REGISTRATION',
  });
  
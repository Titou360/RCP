export const setPersonalInfo = (name, firstname, email) => ({
    type: 'SET_PERSONAL_INFO',
    payload: { name, firstname, email },
  });
  
  export const setAccountInfo = (password) => ({
    type: 'SET_ACCOUNT_INFO',
    payload: { password },
  });
  
  export const setOfferSelection = (selectedOffer) => ({
    type: 'SET_OFFER_SELECTION',
    payload: { selectedOffer },
  });
  
  export const submitRegistration = () => ({
    type: 'SUBMIT_REGISTRATION',
  });
  
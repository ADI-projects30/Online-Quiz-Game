export const CHANGE_CATEGORY = "CHANGE_CATEGORY";
export const CHANGE_DIFFICULTY = "CHANGE_DIFFICULTY";
export const CHANGE_TYPE = "CHANGE_TYPE";
export const CHANGE_AMOUNT = "CHANGE_AMOUNT";
export const CHANGE_SCORE = "CHANGE_SCORE";

export const handleChangeCategory = (payload) => ({
    type: CHANGE_CATEGORY,
    payload,
  });
  
  export const handleChangeDifficulty = (payload) => ({
    type: CHANGE_DIFFICULTY,
    payload,
  });
  
  export const handleChangeType = (payload) => ({
    type: CHANGE_TYPE,
    payload,
  });
  
  export const handleQuestionsAmountChange = (payload) => ({
    type: CHANGE_AMOUNT,
    payload,
  });
  
  export const handleScoreChange = (payload) => ({
    type: CHANGE_SCORE,
    payload,
  });

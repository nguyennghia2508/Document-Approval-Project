import {
  SEND_TO_USER,
  USER_SEND,
  SHARE_TO_USER,
  DOCS_ON_DRAFT,
  DOCS_ON_PENDING,
  DOCS_APPROVED,
  DOCS_REJECTED,
  DOCS_DIGITALLY_SIGNED,
  DOCS_SIGNED,
  SHOW_CHART,
} from '../constant/user-choice';

export const sendToUser = () => (dispatch) => {

}

export const startSurvey = () => (dispatch) => {
  dispatch({
    type: START_SURVEY,
  });
};

export const nextQuestion =
  ({ answer }) =>
  (dispatch) => {
    dispatch({
      type: NEXT_QUESTION,
      payload: answer,
    });
  };

export const prevQuestion = () => (dispatch) => {
  dispatch({
    type: PREV_QUESTION,
    payload: null,
  });
};

export const submitSurvey =
  ({ answers }) =>
  (dispatch) => {
    dispatch({
      type: SUBMIT_SURVEY,
      payload: answers,
    });
  };

export const resetSurvey = () => (dispatch) => {
  dispatch({
    type: RESET_SURVEY,
    payload: null,
  });
};

export const saveAnswer =
  ({ activeQuestion, answer }) =>
  (dispatch) => {
    dispatch({
      type: SAVE_ANSWER,
      payload: { activeQuestion, answer },
    });
  };

export const saveUserData =
  ({ answers }) =>
  (dispatch) => {
    dispatch({
      type: SAVE_USER_DATA,
      payload: answers,
    });
  };

export const saveUserAnswers =
  ({ answers }) =>
  (dispatch) => {
    dispatch({
      type: SAVE_USER_ANSWERS,
      payload: answers,
    });
  };

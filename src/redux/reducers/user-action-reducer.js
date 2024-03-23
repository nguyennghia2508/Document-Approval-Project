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

const initialState = {
  userData: null,
  step: 1,
  activeQuestion: 0,
  answers: [],
};

const userChoiceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default userChoiceReducer;

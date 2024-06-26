import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {FIRST_GAME_STEP, MAX_MISTAKE_COUNT} from '../const';
import {isAnswerCorrect} from '../game';
import {questions} from '../mocks/question';

const initialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  questions,
};

const STEP_COUNT = 1;

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.IncrementStep:
      return {...state, step: state.step + STEP_COUNT};
    case ActionType.CheckUserAnswer: {
      const {question, userAnswer} = action.payload;
      const mistakes = state.mistakes += Number(!isAnswerCorrect(question, userAnswer));

      if (mistakes >= MAX_MISTAKE_COUNT) {
        return {
          ...initialState,
        };
      }

      return {...state, mistakes};
    }
    case ActionType.ResetGame:
      return {...initialState};
    default:
      return state;
  }
};

export {reducer};

import {ActionType} from '../types/action';
import {Question, Questions, UserAnswer} from '../types/question';
import {AppRoute, AuthorizationStatus} from '../const';

export const checkUserAnswer = (question: Question, userAnswer: UserAnswer)=> ({
  type: ActionType.CheckUserAnswer,
  payload: {
    question,
    userAnswer,
  },
} as const);

export const incrementStep = () => ({
  type: ActionType.IncrementStep,
} as const);

export const resetGame = () => ({
  type: ActionType.ResetGame,
} as const);

export const loadQuestions = (questions: Questions) => ({
  type: ActionType.LoadQuestions,
  payload: {
    questions,
  },
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

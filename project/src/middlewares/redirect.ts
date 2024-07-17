import browserHistory from '../browser-history';
import {Middleware} from 'redux';
import {reducer} from '../store/reducer';
import {Actions, ActionType} from '../types/action';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: Actions) => {

        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

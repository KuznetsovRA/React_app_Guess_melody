import { Navigate } from 'react-router-dom';
import {AppRoute, GameType} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import {Question, UserAnswer} from '../../types/question';
import withAudioPlayer from '../../hooks/with-audio-player/with-audio-player';
import {checkUserAnswer} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {Actions} from '../../types/action';
import {State} from '../../types/state';
import Mistakes from '../mistakes/mistakes';

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);


const mapStateToProps = ({step, mistakes, questions}: State) => ({
  step,
  mistakes,
  questions,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onUserAnswer: (question: Question, userAnswer: UserAnswer):void => {
    dispatch(checkUserAnswer(question, userAnswer));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function GameScreen(props: PropsFromRedux): JSX.Element {
  const {questions, step, onUserAnswer, mistakes} = props;
  const question = questions[step];

  if (step >= questions.length || !question) {
    return (
      <Navigate to={AppRoute.Root} />
    );
  }

  switch (question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionScreenWrapped>
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export {GameScreen};
export default connector(GameScreen) ;

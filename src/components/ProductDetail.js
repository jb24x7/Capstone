import React from "react";
import PropTypes from "prop-types";

function SurveyDetail(props) {
  const { survey, onClickingDelete, onClickingSend, surveyAnswers } = props;

  function handleAnswerSubmission(event) {
    event.preventDefault();
    onClickingSend({
      // userId: user.id | null
      answer1: event.target.answer1.value,
      answer2: event.target.answer2.value,
      answer3: event.target.answer3.value,
      answer4: event.target.answer4.value,
      answer5: event.target.answer5.value,
      answer6: event.target.answer6.value,
      answer7: event.target.answer7.value,
      answer8: event.target.answer8.value,
      surveyId: survey.id
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleAnswerSubmission}>
        <h1>this is the creator: {survey.creatorEmail}</h1>
        <h1>{survey.name}</h1><br />
        <h3>{survey.question1}</h3><br />
        Answer: <input type='text'
          name="answer1"
          placeholder="Type your answer here" /> <br />
        <h3>{survey.question2}</h3>
        Answer: <input type='text'
          name="answer2"
          placeholder="Type your answer here" /> <br />
        <h3>{survey.question3}</h3>
        Answer: <input type='text'
          name="answer3"
          placeholder="Type your answer here" /> <br />
        <h3>{survey.question4}</h3>
        Answer: <input type='text'
          name="answer4"
          placeholder="Type your answer here" /> <br />
        <h3>{survey.question5}</h3>
        Answer: <input type='text'
          name="answer5"
          placeholder="Type your answer here" /> <br />
        <h3>{survey.question6}</h3>
        Answer: <input type='text'
          name="answer6"
          placeholder="Type your answer here" /> <br />
        <h3>{survey.question7}</h3>
        Answer: <input type='text'
          name="answer7"
          placeholder="Type your answer here" /> <br />
        <h3>{survey.question8}</h3>
        Answer: <input type='text'
          name="answer8"
          placeholder="Type your answer here" /> <br /><br />
        <button type="submit">Submit Survey Answers</button>
      </form>

      {survey.creatorEmail !== props.currentUserEmail ? null : <button onClick={props.onClickingEdit}>Update Survey</button>}
      {survey.creatorEmail !== props.currentUserEmail ? null : <button onClick={() => onClickingDelete(survey.id)}>Delete Survey</button>}

      {survey.creatorEmail !== props.currentUserEmail ? null :
        surveyAnswers.map((answer) =>
          <div key={answer.id}>
            <p>answer1: {answer.answer1}</p>
            <p>answer 2: {answer.answer2}</p>
            <p>answer 3: {answer.answer3}</p>
            <p>answer 4: {answer.answer4}</p>
            <p>answer 5: {answer.answer5}</p>
            <p>answer 6: {answer.answer6}</p>
            <p>answer 7: {answer.answer7}</p>
            <p>answer 8: {answer.answer8}</p>
          </div>
        )
      }

    </React.Fragment>
  );
}

SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickingSend: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingDelete: PropTypes.func
};

export default SurveyDetail;
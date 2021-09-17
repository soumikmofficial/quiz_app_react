import SetupQuiz from "./components/setupQuiz/SetupQuiz";
import Modal from "./components/modal/Modal";
import DotLoader from "react-spinners/DotLoader";
import { useGlobalContext } from "./context";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./App.scss";

function App() {
  const {
    waiting,
    loading,
    questions,
    correct,
    checkAnswer,
    nextQuestion,
    index,
  } = useGlobalContext();
  if (waiting) {
    return <SetupQuiz />;
  }

  if (loading) {
    return (
      <div className="loading">
        <DotLoader color={"#db5858"} size={100} />
      </div>
    );
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  console.log(tempIndex);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <div className="container">
        <Modal />
        <p className="tally">
          Correct Answers : {correct} / {index}
        </p>

        <article className="question-answer">
          <div className="question">
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
          </div>
          <div className="answer">
            {answers.map((answer, index) => {
              return (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => checkAnswer(answer === correct_answer)}
                />
              );
            })}
          </div>
        </article>
        <div className="next">
          <AiOutlineArrowRight className="icon" onClick={nextQuestion} />
        </div>
      </div>
    </main>
  );
}

export default App;

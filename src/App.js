import { useState } from "react";
import SetupQuiz from "./components/setupQuiz/SetupQuiz";
import Modal from "./components/modal/Modal";
import DotLoader from "react-spinners/DotLoader";
import { useGlobalContext } from "./context";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./App.scss";

function App() {
  const [index, setIndex] = useState(0);
  const { waiting, loading, questions, correct } = useGlobalContext();
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
  const answers = [...incorrect_answers, correct_answer];
  return (
    <main>
      <div className="container">
        <p className="tally">
          Correct Answers : {correct} / {index}
        </p>

        <article className="question-answer">
          <div className="question">
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
          </div>
          <div className="answer">
            {answers.map((answer) => {
              return <p dangerouslySetInnerHTML={{ __html: answer }} />;
            })}
          </div>
        </article>
        <div className="next">
          <AiOutlineArrowRight className="icon" />
        </div>
      </div>
    </main>
  );
}

export default App;

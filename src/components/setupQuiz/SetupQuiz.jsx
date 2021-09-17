import React from "react";
import "./setupQuiz.scss";
import { useGlobalContext } from "../../context";

function SetupQuiz() {
  const { error, handleSubmit, handleChange, quiz } = useGlobalContext();

  return (
    <section className="setup-quiz">
      <div className="container">
        <div className="header">
          <h2>Setup Quiz</h2>
        </div>
        <div className="form">
          <form>
            {/* amount */}
            <div className="form-control">
              <label htmlFor="amount">No of Questions</label>
              <input
                type="number"
                name="amount"
                id="amount"
                onChange={(e) => handleChange(e)}
                value={quiz.amount}
                min={10}
                max={50}
              />
            </div>

            {/* category
             */}
            <div className="form-control">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                onChange={(e) => handleChange(e)}
              >
                <option value="computer">computer</option>
                <option value="sports">sports</option>
                <option value="politics">politics</option>
              </select>
            </div>

            {/* difficulty */}
            <div className="form-control">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                name="difficulty"
                id="difficulty"
                onChange={(e) => handleChange(e)}
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>

            {error && <p>Try a different combination...</p>}

            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SetupQuiz;

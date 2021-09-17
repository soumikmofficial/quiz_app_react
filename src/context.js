import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "computer",
    difficulty: "easy",
  });

  const handleChange = (e) => {
    console.log(e);
  };

  const handleSubmit = () => {
    console.log("submitted");
  };

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(false);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIndex(0);
    setWaiting(true);
    console.log(`modal is ${isModalOpen}`);
    console.log(`waiting is ${waiting}`);
  };
  const nextQuestion = () => {
    console.log(index);
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
      openModal();
    }
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect(correct + 1);
    }
    nextQuestion();
  };

  // useEffect(() => {
  //   fetchQuestions(tempUrl);
  // }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        isModalOpen,
        correct,
        index,
        checkAnswer,
        nextQuestion,
        closeModal,
        quiz,
        handleSubmit,
        handleChange,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };

import axios from "axios";
import React, { useContext, useState } from "react";

const API_ENDPOINT = "https://opentdb.com/api.php?";

const table = {
  sports: 21,
  computer: 18,
  politics: 24,
};

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
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({
      ...quiz,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
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
  };
  const nextQuestion = () => {
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

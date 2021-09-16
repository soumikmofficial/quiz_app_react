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

  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        isModalOpen,
        correct,
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

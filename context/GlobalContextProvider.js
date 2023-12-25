import React, { useContext, useState } from "react";
import GlobalContext from "./GlobalContext";

const MyProvider = ({ children }) => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [image, setImage] = useState({});
  const [record, setRecord] = useState(null);
  const [ans, setAns] = useState([]);
  const [loader, setLoader] = useState(false);
  const [startRecord, setStartRecord] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(true);


  return (
    <GlobalContext.Provider
      value={{
        isSubmited,
        setIsSubmited,
        record,
        setRecord,
        ans,
        setAns,
        loader,
        setLoader,
        startRecord,
        setStartRecord,
        timer, setTimer,
        timerActive, setTimerActive
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(GlobalContext);
};
export { MyProvider, useMyContext };

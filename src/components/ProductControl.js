import React, { useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import SurveyList from "./SurveyList";
import NewVariableSurvey from "./NewVariableSurvey";
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, where, getDocs, getDoc, getFirestore } from "firebase/firestore";
import NewSurvey from "./NewSurvey";
import EditSurveyForm from "./EditSurvey";
import SurveyDetail from "./SurveyDetail";
import DashBoard from "./Dashboard";
import VariableDetail from "./VariableDetail";

function SurveyControl(props) {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainSurveyList, setMainSurveyList] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [editing, setEditing] = useState(false);
  const [dashboardDisplay, setDashboardDisplay] = useState(false);
  const [answersList, setAnswersList] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [variableForm, setVariableForm] = useState(false);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "surveys"),
      (collectionSnapshot) => {
        const surveys = [];
        collectionSnapshot.forEach((doc) => {
          surveys.push({
            creatorEmail: doc.data().creatorEmail,
            name: doc.data().name,
            questions: doc.data().questions,
            id: doc.id
          });
        });
        setMainSurveyList(surveys);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (!selectedSurvey) return;

    const selectedId = selectedSurvey.id;
    const q = query(collection(db, "answers"), where("surveyId", "==", selectedId));

    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const answers = [];
      querySnapshot.forEach((doc) => {
        answers.push({ id: doc.id, ...doc.data() });
      });
      setAnswersList(answers);
    });

    return () => {
      if (unSubscribe) unSubscribe();
    };
  }, [selectedSurvey]);
  // -------------------------------------------------------------------------------------------------------
  // useEffect(() => {
  //   if (!selectedSurvey) return;
  //   let unSubscribe;

  //   (async () => {
  //     const selectedId = selectedSurvey.id;
  //     const db = getFirestore();
  //     const docRef = doc(db, "surveys", selectedId);

  //     try {
  //       const docSnap = await getDoc(docRef);
  //       console.log(docSnap.data().questions);
  //       setQuestionsList(docSnap.data().questions)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();

  //   return () => {
  //     if (unSubscribe) unSubscribe();
  //   };
  // }, [selectedSurvey]);

  const updateQuestionList = (id) => {
    
      (async () => {
        const db = getFirestore();
        const docRef = doc(db, "surveys", id);

        try {
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data().questions);
          setQuestionsList(docSnap.data().questions);
        } catch (error) {
          console.log(error);
        }
        console.log("Reached updated questionList")
      })();
  };


  const handleClick = () => {
    if (selectedSurvey != null) {
      setSelectedSurvey(null);
      setFormVisibleOnPage(false);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    console.log("setting edit to true");
  };

  const handleDashboardClick = () => {
    setDashboardDisplay(true);
  };

  const handleEditingSurveyInList = async (surveyToEdit) => {
    const surveyRef = doc(db, "surveys", surveyToEdit.id);
    await updateDoc(surveyRef, surveyToEdit);
    setEditing(false);
    setSelectedSurvey(null);
  };

  const handleDeleteSurvey = async (id) => {
    await deleteDoc(doc(db, "surveys", id));
    setSelectedSurvey(null);
  };

  const handleAddingNewSurveyToList = async (newSurveyData) => {
    const result = await addDoc(collection(db, "surveys"), newSurveyData);
    setFormVisibleOnPage(false);
  };

  const handleChangingSelectedSurvey = (id) => {
    const selection = mainSurveyList.filter(survey => survey.id === id)[0];
    setSelectedSurvey(selection);
    updateQuestionList(id);
  };

  const handleSendingSurvey = async (surveyAnswers) => {
    const result = await addDoc(collection(db, "answers"), surveyAnswers);
    setSelectedSurvey(null);
  };

  let currentlyVisibleState = null;
  let buttonText = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>;
  } else if (editing) {
    currentlyVisibleState =
      <EditSurveyForm
        survey={selectedSurvey}
        onEditSurvey={handleEditingSurveyInList}
      />;
    buttonText = "Return to list";
  } else if (selectedSurvey != null && questionsList) {
    console.log(questionsList);
    currentlyVisibleState =
      <VariableDetail
        survey={selectedSurvey}
        surveyAnswers={answersList}
        currentQuestions={questionsList}
        currentUserEmail={props.userEmail}
        onClickingSend={handleSendingSurvey}
        onClickingEdit={handleEditClick}
        onClickingDelete={handleDeleteSurvey} />;
    buttonText = "Return to list";
  } else if (formVisibleOnPage) {
    currentlyVisibleState =
      <NewSurvey
        onNewSurveyCreation={handleAddingNewSurveyToList}
        currentUserEmail={props.userEmail} />;
    buttonText = "Return to list";
  } else if (variableForm) {
    currentlyVisibleState =
      <NewVariableSurvey
        onNewSurveyCreation={handleAddingNewSurveyToList}
        currentUserEmail={props.userEmail}
      />;
  } else if (dashboardDisplay) {
    currentlyVisibleState =
      <DashBoard
        currentUserEmail={props.userEmail}
        mainList={mainSurveyList}
        onSurveySelection={handleChangingSelectedSurvey}
      />;
    buttonText = "Return to list";
  } else {
    currentlyVisibleState = <SurveyList
      onSurveySelection={handleChangingSelectedSurvey}
      surveyList={mainSurveyList}
      onDashboardClick={handleDashboardClick}
    // addQuestion={addQuestionToSurvey}
    />;
    buttonText = "New Survey";
  }
  return (
    <React.Fragment>
      {currentlyVisibleState}
      {props.userEmail ? <button onClick={handleClick}>{buttonText}</button> : null}
    </React.Fragment>
  );
}

export default SurveyControl;
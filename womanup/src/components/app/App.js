import './App.css';
import React from 'react';
import { Home } from '../../pages/Home';
import { Route, Routes } from 'react-router-dom';
import { CreateTask } from '../../pages/CreateTask';
import { EditTask } from '../../pages/EditTask';
import { db } from '../../firebase/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';

export const AppContext = React.createContext({});

const App = () => {
  const [currentEditObject, setCurrentEditObject] = React.useState({});
  const [tasks, setTasks] = React.useState([]);

  const getData = async () => {
    try {
      const dataRef = collection(db, 'tasks');
      const result = await getDocs(dataRef);
      const data = [];
      result.forEach((doc) => {
        data.push(doc.data());
      });
      setTasks(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const postData = async (object) => {
    try {
      await setDoc(doc(db, 'tasks', `${object.id}`), {
        id: object.id,
        header: object.header,
        description: object.description,
        date: object.date,
        status: object.status,
        files: object.files,
      });
    } catch (error) {
      throw new ErrorEvent(error);
    }
  };

  const onClickCompleteTask = async (object) => {
    try {
      const taskDocRef = doc(db, 'tasks', object.id);
      await updateDoc(taskDocRef, {
        status: object.status,
      });
      setTasks((prev) => prev.filter((item) => item.id !== object.id));
      setTasks((prev) => [...prev, object]);
    } catch (error) {
      throw new Error(error);
    }
  };

  const onClickSetTasks = (object) => {
    setTasks((prev) => [object, ...prev]);
    postData(object);
  };

  const onClickEditTasks = async (object) => {
    const taskDocRef = doc(db, 'tasks', object.id);
    try {
      await updateDoc(taskDocRef, {
        header: object.header,
        description: object.description,
        date: object.date,
        status: object.status,
        files: object.files,
      });
      const index = tasks.findIndex((task) => object.id === task.id);
      setTasks((prev) => [...prev.slice(0, index), object, ...prev.splice(index + 1, prev.length)]);
    } catch (error) {
      throw new Error(error);
    }
  };

  const onClickDeleteTasks = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      throw new Error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          tasks,
          onClickSetTasks,
          onClickDeleteTasks,
          onClickEditTasks,
          currentEditObject,
          setCurrentEditObject,
          onClickCompleteTask,
        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/edit-task" element={<EditTask />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
};

export default App;

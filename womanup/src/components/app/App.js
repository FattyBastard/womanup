import './App.css';
import React from 'react';
import { Home } from '../../pages/Home';
import { Route, Routes } from 'react-router-dom';
import { CreateTask } from '../../pages/CreateTask';
import { EditTask } from '../../pages/EditTask';
import { db } from '../../firebase/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';

//общий контекст приложения
export const AppContext = React.createContext({});

const App = () => {
  // стейт текущей изменяемой задачи
  const [currentEditObject, setCurrentEditObject] = React.useState({});
  // стейт всех задач
  const [tasks, setTasks] = React.useState([]);

  // функция получения данных с бекенда
  const getData = async () => {
    try {
      const dataRef = collection(db, 'tasks');
      const result = await getDocs(dataRef);
      const data = [];
      result.forEach((doc) => {
        data.push(doc.data());
      });
      // установка полученных данных в стейт
      setTasks(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  // функция загрузки данных
  const postData = async (object) => {
    try {
      // запрос на загрузку данных на сервер
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

  // функция завершения задачи
  const onClickCompleteTask = async (object) => {
    try {
      const taskDocRef = doc(db, 'tasks', object.id);
      // запрос на изменения поля status на стороне firestore
      await updateDoc(taskDocRef, {
        status: object.status,
      });
      // изменения стейта на стороне клиента
      setTasks((prev) => prev.filter((item) => item.id !== object.id));
      setTasks((prev) => [...prev, object]);
    } catch (error) {
      throw new Error(error);
    }
  };

  // функция добавления задач
  const onClickSetTasks = (object) => {
    // изенения стейта на стороне клиента
    setTasks((prev) => [object, ...prev]);
    // загрузка данных на бекенд
    postData(object);
  };

  // функция редактирования задачи
  const onClickEditTasks = async (object) => {
    try {
      const taskDocRef = doc(db, 'tasks', object.id);
      // запрос на изенение задачи на firebase
      await updateDoc(taskDocRef, {
        header: object.header,
        description: object.description,
        date: object.date,
        status: object.status,
        files: object.files,
      });
      const index = tasks.findIndex((task) => object.id === task.id);
      // изенения стейта задач на стороне клиента
      setTasks((prev) => [...prev.slice(0, index), object, ...prev.splice(index + 1, prev.length)]);
    } catch (error) {
      throw new Error(error);
    }
  };

  //функция удаления задачи
  const onClickDeleteTasks = async (id) => {
    try {
      // запрос на удаление задачи из firestore
      await deleteDoc(doc(db, 'tasks', id));
      // изенения стейта задач на стороне клиента
      setTasks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      throw new Error(error);
    }
  };

  //загрузка данных из бекенда
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

import React from 'react';
import { ToDoListItem } from '../components/toDoListItem/toDoListItem';
import { Link } from 'react-router-dom';
import { AppContext } from '../components/app/App';

export const Home = () => {
  // стейт задач и контекста
  const { tasks } = React.useContext(AppContext);

  return (
    <div className="wrapper">
      <div className="wrapper-list">
        <ul className="todo-list">
          {tasks.map((task, index) => {
            return <ToDoListItem key={index} {...task} />;
          })}
        </ul>
      </div>
      <Link to="/create-task">
        <button className="add-btn">Добавить</button>
      </Link>
    </div>
  );
};

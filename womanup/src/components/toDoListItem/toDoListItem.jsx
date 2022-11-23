import React from 'react';
import { AppContext } from '../../components/app/App';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const ToDoListItem = ({ header, date, description, id, files, status }) => {
  const checkDate = (date) => {
    const currentTime = dayjs(dayjs().format('DD.MM.YYYY'), 'DD.MM.YYYY');
    const postTime = dayjs(date, 'DD.MM.YYYY');

    return postTime.diff(currentTime, 'day') >= 0 ? (status = true) : (status = false);
  };

  const { onClickDeleteTasks, setCurrentEditObject, onClickCompleteTask } =
    React.useContext(AppContext);

  if (status) {
    checkDate(date);
  }

  return (
    <li className={status ? 'todo-list-item' : 'todo-list-item disabled-item'}>
      <ul className="item-list">
        <li className="data-list-item">
          <h1 className="title">{header}</h1>
        </li>
        <li className="data-list-item">
          <h4>Активно до:</h4>
          <p className="list-item-date">{date}</p>
        </li>
        <li className="data-list-item">
          <h4>Описание:</h4>
          <p className="description">{description}</p>
        </li>
        <li className="data-list-item">
          <h4>Вложенные файлы:</h4>
          <ul className="upload-files-list">
            {files.map((file, index) => {
              return <li key={index}> {file}</li>;
            })}
          </ul>
        </li>
        <li className="data-list-item">
          <h4>Идентификатор задачи:</h4>
          <p className="text">№{id}</p>
        </li>
      </ul>
      <div className="button-area">
        <button
          className={status ? `complete-btn` : 'disabled'}
          disabled={!status}
          onClick={() =>
            onClickCompleteTask({
              header,
              date,
              description,
              id,
              files,
              status: false,
            })
          }>
          {status ? 'Завершить' : 'Завершено'}
        </button>
        <button onClick={() => onClickDeleteTasks(id)} className="delete-btn">
          Удалить
        </button>

        <Link to="/edit-task">
          <button
            disabled={!status}
            onClick={() => setCurrentEditObject({ header, date, description, id, files, status })}
            className={status ? `edit-btn` : 'disabled'}>
            Изменить
          </button>
        </Link>
      </div>
    </li>
  );
};

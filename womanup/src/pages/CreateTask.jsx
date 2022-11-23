import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../components/app/App';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { v4 as uuid } from 'uuid';

dayjs.extend(customParseFormat);

export const CreateTask = () => {
  // функция изменения стейта задач
  const { onClickSetTasks } = React.useContext(AppContext);
  // сотсояния всех полей формы
  const [header, setHeader] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [files, setFiles] = React.useState([]);
  // статус валидности формы
  const [formValid, setFormValid] = React.useState(false);

  // проверка формы при изменении обязательных полей
  React.useEffect(() => {
    const formValidation = () => {
      if (header && description && dayjs(date, 'DD.MM.YYYY').isValid()) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    };
    formValidation();
  }, [header, date, description]);

  return (
    <div className="wrapper">
      <ul className="create-task">
        <li className="create-task-item">
          <h5>Заголовок</h5>
          <input
            value={header}
            onChange={(event) => {
              setHeader(event.target.value);
            }}
            type="text"
            placeholder="Введите название задачи"
          />
        </li>
        <li className="create-task-item">
          <h5>Описание</h5>
          <textarea
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            placeholder="Введите описание"
            name=""
            id=""
            cols="30"
            rows="10"></textarea>
        </li>
        <li className="create-task-item">
          <h5>Дата завершения</h5>
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            type="text"
            placeholder="Введите дату завершения задачи: дд.мм.гггг"
          />
        </li>
        <li className="create-task-item">
          <input
            value={''}
            onChange={(event) => setFiles((prev) => [...prev, event.target.files[0].name])}
            type="file"
            id="upload-btn"
            hidden
          />
          <label htmlFor="upload-btn">
            Загрузить файлы
            <svg
              className="upload"
              width="12"
              height="12"
              viewBox="0 0 494 512"
              fill="white"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M487.6 204.8C483.599 200.801 478.174 198.554 472.517 198.554C466.861 198.554 461.435 200.801 457.435 204.8L225.072 438.166C215.167 448.072 203.408 455.93 190.466 461.292C177.525 466.654 163.653 469.414 149.645 469.415C121.353 469.417 94.2199 458.18 74.2133 438.176C54.2068 418.173 42.9662 391.041 42.9642 362.749C42.9622 334.458 54.199 307.324 74.2027 287.318L299.248 61.3549C311.282 49.5126 327.508 42.9052 344.391 42.9719C361.275 43.0387 377.448 49.7742 389.388 61.7113C401.328 73.6483 408.067 89.8199 408.138 106.703C408.208 123.587 401.605 139.814 389.765 151.851L164.72 377.814C160.661 381.702 155.258 383.872 149.637 383.872C144.017 383.872 138.613 381.702 134.555 377.814C130.555 373.813 128.309 368.388 128.309 362.731C128.309 357.074 130.555 351.649 134.555 347.648L334.917 146.368C338.803 142.345 340.954 136.956 340.905 131.362C340.856 125.769 338.613 120.418 334.657 116.463C330.702 112.507 325.351 110.264 319.758 110.215C314.164 110.167 308.776 112.317 304.752 116.203L104.389 317.483C98.4452 323.426 93.7301 330.482 90.5131 338.247C87.2961 346.013 85.6403 354.336 85.6403 362.742C85.6403 371.147 87.2961 379.47 90.5131 387.236C93.7301 395.001 98.4452 402.057 104.389 408C116.584 419.637 132.792 426.13 149.648 426.13C166.504 426.13 182.712 419.637 194.907 408L419.931 182.016C439.515 161.927 450.395 134.93 450.215 106.875C450.036 78.8203 438.81 51.9656 418.97 32.1287C399.131 12.2918 372.274 1.06997 344.219 0.894186C316.164 0.718401 289.169 11.6028 269.083 31.1895L44.0373 257.152C16.0305 285.159 0.296386 323.145 0.296387 362.752C0.296387 402.36 16.0305 440.345 44.0373 468.352C72.0442 496.359 110.03 512.093 149.637 512.093C189.245 512.093 227.23 496.359 255.237 468.352L487.6 235.051C489.593 233.068 491.175 230.712 492.254 228.116C493.333 225.52 493.889 222.737 493.889 219.926C493.889 217.114 493.333 214.331 492.254 211.735C491.175 209.139 489.593 206.783 487.6 204.8Z"
                fill="white"
              />
            </svg>
          </label>
          <ul className="upload-files">
            {files.map((file, index) => {
              return (
                <li
                  onClick={(event) => {
                    setFiles((prev) => prev.filter((item) => item !== event.target.innerText));
                  }}
                  key={index}
                  className="upload-files-item">
                  {' '}
                  {file}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>

      <Link to="/">
        <button
          onClick={() =>
            onClickSetTasks({
              id: uuid(),
              header,
              description,
              date,
              files,
              status: true,
            })
          }
          disabled={!formValid}
          className={formValid ? 'add-btn' : 'disabled-add'}>
          Добавить
        </button>
      </Link>
    </div>
  );
};

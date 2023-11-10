import React, { useState } from "react";

const ReviewForm = () => {
  const [onFocusStatus, setInFocusStatus] = useState({
    review: false,
  });

  const selectMuscleGroupHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  const [reviewValue, setReviewValue] = useState("");

  const changeLoginHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setReviewValue(e.currentTarget.value);
  };

  const focusElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus({ ...onFocusStatus, [e.target.id]: true });
  };

  const focusOutElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus({ ...onFocusStatus, [e.target.id]: false });
  };

  return (
    <form
      action=""
      className=" flex flex-col my-5 px-2 py-2 shadow-cardElementShadow mx-5 border-solid border-2"
    >
      <select
        className=" bg-secoundaryColor w-3/4  py-3 px-4 mx-1 rounded-md shadow-cardElementShadow border-solid border-2"
        onChange={selectMuscleGroupHandler}
        name=""
        id=""
      >
        <option value="0">Оцените упражнение</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <div className=" relative py-4">
        <textarea
          onChange={changeLoginHandler}
          onFocus={focusElHandler}
          onBlur={focusOutElHandler}
          className=" w-11/12 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
          id="review"
          // type="text"
          value={reviewValue}
          cols={40}
          rows={6}
        />
        <span>
          <label
            htmlFor="email"
            className={` absolute transition-all ease-in-out ${
              onFocusStatus.review || reviewValue.length > 0
                ? "z-10 top-1 left-0  bg-white   scale-75"
                : " top-1/3 left-2"
            }`}
          >
            Отзыв
          </label>
        </span>
      </div>
      <button className=" text-slate-50 w-1/3 font-bold shadow-cardElementShadow min-w-max py-2 px-6 rounded bg-buttonColor hover:bg-buttonHoverColor">
        {" "}
        Оценить
      </button>
    </form>
  );
};

export default ReviewForm;

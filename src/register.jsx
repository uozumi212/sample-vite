export const StudyRegister = (props) => {
  const { studyText, studyTime , onClickRegister, handleChange } = props;

  return (
    <>
      <div className="p-5">
        <label htmlFor="">学習内容</label>
        <input type="text" name="studyText" value={studyText} onChange={handleChange} className="ml-4 w-8/12 border-blue-400 border-2 rounded-md" />
      </div>
      <div className="p-5">
        <label htmlFor="">学習時間</label>
        <input type="number" name="studyTime" value={studyTime} onChange={handleChange} className="ml-4 w-8/12 border-blue-400 border-2 rounded-md"/>
        <span className="ml-4">時間</span>
      </div>
      <div className="p-5">
          <p>入力されている学習内容：{studyText}</p>
          <p className="pt-4">入力されている時間：{studyTime ? `${studyTime}時間`: ``}</p>
          <p></p>
      </div>

      {/* {records.map((record, index) => (
            <p key={index} className="pl-5 pt-2">{record.title} {record.time}時間</p>
      ))} */}


    </>
  );
};

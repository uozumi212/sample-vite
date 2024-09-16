import { useEffect, useState } from 'react'
import { StudyRegister } from './register';
import './style.css'

export const StudyInput = () => {

  // 学習内容,学習時間
  const [studyText, setStudyText] = useState('');
  const [studyTime, setStudyTime] = useState('');

  // 記録用
  const [records, setRecords] = useState([]);

  // エラーメッセージ用
  const [error, setError] = useState('');

  // 時間カウント用
  const [time, setTime] = useState(0);

  // const records = [
  //   { title: "勉強の記録1", time: 1},
  //   { title: "勉強の記録2", time: 2},
  //   { title: "勉強の記録3", time: 5},
  // ]

    // const studyTextChange = (event) => {
    //   setStudyText(event.target.value);
    // };

    // const studyTimeChange = (event) => {
    //   setStudyTime(event.target.value);
    // };

    const studyChange = (event) => {
      const { name , value } = event.target;
      if (name === 'studyText') {
        setStudyText(value);
      } else if (name === 'studyTime') {
        setStudyTime(value);
      }
    };

    const totalTime = (records) => {
      return records.reduce((total, record) => total + Number(record.time),0);
    };

    const onClickRegister = () => {
      if (studyText && studyTime) {
        const newRecords = [...records , {title: studyText, time: studyTime}];
        console.log(newRecords);
        setRecords(newRecords);
        setStudyText('');
        setStudyTime('');
        setError('');
      } else {
        setError('入力されていない項目があります');
      }
    };

    useEffect(() => {
      setTime(totalTime(records));
    }, [records]);

  return (
    <>
      <header className="text-center">
        <h1 className="title text-3xl font-bold text-white bg-blue-300 p-2">学習記録一覧</h1>
      </header>
      <div className="rounded-sm border-2 border-blue-200 justify-center mx-auto w-1/3 mt-8">
        <StudyRegister
          studyText={studyText}
          studyTime={studyTime}
          onClickRegister={onClickRegister}
          studyChange={studyChange}
          records={records}
        />

        {error && (
           <p className="text-red-400 my-5 ml-3 text-lg">{error}</p>
        )}
        <p className="ml-4 mt-3">合計時間：{time}/1000</p>
      </div>

    </>
  );
};

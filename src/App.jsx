import { useEffect, useState } from 'react';
import { StudyRegister } from './register';
import { getAllStudies } from './utils/supabaseFunction';
import './style.css';

export const StudyInput = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [fetchError, setFetchError] = useState(null);

  // 学習内容,学習時間
  const [studyText, setStudyText] = useState('');
  const [studyTime, setStudyTime] = useState('');

  // 記録用
  const [records, setRecords] = useState([]);

  // エラーメッセージ用
  const [error, setError] = useState('');

  // 時間カウント用
  const [time, setTime] = useState(0);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        setLoading(true);
        const studies = await getAllStudies();
        setStudies(studies);
        console.log(studies);
      } catch (error) {
        console.error('error', error);
      } finally {
        console.log('取得完了');
        setLoading(false);
      }
    };
    fetchStudies();
  }, []);

  useEffect(() => {
    setTime(calculateTotalTime(studies));
  }, [studies]);

  useEffect(() => {
    setTime(totalTime(records));
  }, [records]);

  // useEffect(() => {
  //   const fetchStudies = async () => {
  //     try {
  //       setLoading(true);
  //       const studies = await getAllStudies();
  //       if (Array.isArray(studies)) {
  //         setStudies(studies);
  //       } else {
  //         throw new Error('Data is not an array');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching studies:', error);
  //       setFetchError('データの取得に失敗しました');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchStudies();
  // }, []);

  // if (fetchError) return <div>Error: {fetchError}</div>;

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'studyText') {
      setStudyText(value);
    } else if (name === 'studyTime') {
      setStudyTime(value);
    }
  };

  // studies の合計時間を計算する関数
  const calculateTotalTime = (studiesArray) => {
    return studiesArray.reduce((total, study) => total + Number(study.time), 0);
  };

  const totalTime = (records) => {
    return records.reduce(
      (total, record) => total + Number(record.time) + Number(),
      0
    );
  };

  const onClickRegister = () => {
    if (studyText && studyTime) {
      const newRecords = [...records, { title: studyText, time: studyTime }];
      console.log(newRecords);
      setRecords(newRecords);
      setStudyText('');
      setStudyTime('');
      setError('');
    } else {
      setError('入力されていない項目があります');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <header className="text-center">
        <h1 className="title text-3xl font-bold text-white bg-blue-300 p-2">
          学習記録一覧
        </h1>
      </header>
      <div className="rounded-sm border-2 border-blue-200 justify-center mx-auto w-1/3 mt-8">
        <StudyRegister
          studyText={studyText}
          studyTime={studyTime}
          onClickRegister={onClickRegister}
          handleChange={handleChange}
          records={records}
        />
        <ul>
          {studies.map((study, index) => (
            <li key={study.id || index}>
              {study.title}：{study.time}時間
            </li>
          ))}
        </ul>

        {error && <p className="text-red-400 my-5 ml-3 text-lg">{error}</p>}
        <p className="ml-4 mt-3">合計時間：{time}/1000</p>
      </div>
    </>
  );
};

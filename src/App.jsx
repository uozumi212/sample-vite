import { useEffect, useState } from 'react';
import { StudyRegister } from './register';
import { getAllStudies, addStudy, deleteStudy } from './utils/supabaseFunction';
import './style.css';

export const StudyInput = () => {
  // const [allStudies, setAllStudies] = useState([]);
  // const [studies, setStudies] = useState([]);
  const [allStudies, setAllStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [fetchError, setFetchError] = useState(null);

  // 学習内容,学習時間
  const [studyText, setStudyText] = useState('');
  const [studyTime, setStudyTime] = useState('');

  // 記録用
  // const [records, setRecords] = useState([]);

  // エラーメッセージ用
  const [error, setError] = useState('');

  // 時間カウント用
  // const [time, setTime] = useState(0);

  useEffect(() => {
    fetchStudies();
  }, []);

  useEffect(() => {
    console.log('allStudies updated', allStudies);
  }, [allStudies]);

    const fetchStudies = async () => {
      try {
        setLoading(true);
        const studies = await getAllStudies();
        setAllStudies(studies);
        console.log(studies);
      } catch (error) {
        console.error('error', error);
      } finally {
        console.log('取得完了');
        setLoading(false);
      }
    };

  // useEffect(() => {
  //   setTime(calculateTotalTime(studies));
  // }, [studies]);



  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'studyText') {
      setStudyText(value);
    } else if (name === 'studyTime') {
      setStudyTime(value);
    }
  };

  // studies の合計時間を計算する関数
  // const calculateTotalTime = (studiesArray) => {
  //   return studiesArray.reduce((total, study) => total + Number(study.time), 0);
  // };

  // const totalTime = (records) => {
  //   return records.reduce(
  //     (total, record) => total + Number(record.time) + Number(),
  //     0
  //   );
  // };

  const onClickRegister = async () => {
    if (studyText && studyTime) {
      const newStudy = { title: studyText, time: Number(studyTime) };
      console.log(newStudy);
      const addedStudy = await addStudy(newStudy);
      setAllStudies(prevStudies => [...prevStudies, addedStudy]);
      await fetchStudies(); //最新のデータを取得
      setStudyText('');
      setStudyTime('');
      setError('');
    } else {
      setError('入力されていない項目があります');
    }
  };

  const totalTime = allStudies.reduce((total, study) => total + (study && study.time ?  Number(study.time) : 0), 0);

  const onClickDelete = async(id) => {
    try {
      await deleteStudy(id);
      setAllStudies(prevStudies => prevStudies.filter(study => study.id !== id));
    } catch (error) {
      console.error('delete error', error);
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
      <div className="rounded-lg border-4 border-blue-200 justify-center mx-auto sm:w-1/3 w-11/12 mt-24">
        <StudyRegister
          studyText={studyText}
          studyTime={studyTime}
          onClickRegister={onClickRegister}
          handleChange={handleChange}
          // records={records}
        />
        <ul>
         {error && <p className="text-red-400 my-3 ml-3 text-lg">{error}</p>}
          {allStudies.map((study) => study && (
            <div key={study.id} className="flex pt-6 justify-around">
              <ul>
                <li className="p-2 text-lg" key={study.id || index}>
                  {study.title}：{study.time}時間
                </li>
              </ul>
              <button onClick={() => onClickDelete(study.id)} className="bg-black text-white py-1 px-6 border rounded-lg">削除</button>
            </div>
          ))}
        </ul>

        <div className="flex mt-8 justify-around items-center">
          <p className="ml-4 mt-3 font-bold">合計時間：{totalTime}/1000</p>
          <div className="mt-3 mb-3 sm:w-1/5 w-2/5 text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-lg cursor-pointer">
            <button onClick={onClickRegister}>登録</button>
          </div>
        </div>
      </div>
    </>
  );
};

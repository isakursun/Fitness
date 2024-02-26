import { createContext, useState } from "react";
import { options, youtubeOptions } from "../utils/options";
import axios from "axios";

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  //! egzersiz detaylarını tutacak olan state
  const [exerciseDetail, setExerciseDetail] = useState({});
  //! egzersiz videolarını tutacak olan state
  const [exerciseVideos, setExerciseVideos] = useState([]);

  //! bütün egzersizleri aldığım fonksiyon
  const getExercises = async () => {
    const response = await axios.request(
      "https://exercisedb.p.rapidapi.com/exercises",
      options
    );
    const data = await response.data;
    setExercises(data);
  };

  //! inputa girilen değere göre dönen sonuçları aldığım fonksiyon
  const handleSearch = async (search) => {
    console.log(search);
    if (search) {
      const response = await axios.request(
        "https://exercisedb.p.rapidapi.com/exercises",
        options
      );
      const data = await response.data;
      console.log(data);
      const searchedExercises = data.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      console.log(searchedExercises);

      setExercises(searchedExercises);
    }
  };

  //! vücut bölgelerini aldığım fonksiyon
  const bodyPartsData = async () => {
    const response = await axios.request(
      "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
      options
    );
    const bodyPartsData = response.data;
    setBodyParts(bodyPartsData);
  };

  //! vücut bölgelerine göre istek attığım fonksiyon
  const bodyPartExercises = async (param) => {
    const response = await axios.request(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${param}`,
      options
    );
    const data = await response.data;
    setExercises(data);
  };

  //! egzersiz detaylarını aldığım fonk.
  const getExerciseData = async (id) => {
    const response = await axios.get(
      `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
      options
    );
    const exerciseDetailData = response.data;
    setExerciseDetail(exerciseDetailData);

    //! videoları alma isteği
    const response2 = await axios.request(
      `https://youtube-search-and-download.p.rapidapi.com/search?query=${exerciseDetailData.name}`,
      youtubeOptions
    );
    const exerciseVideoData = response2.data;
    setExerciseVideos(exerciseVideoData.contents);
  
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        getExercises,
        handleSearch,
        bodyPartsData,
        bodyParts,
        setBodyParts,
        bodyPart,
        setBodyPart,
        bodyPartExercises,
        getExerciseData,
        exerciseDetail,
        setExerciseDetail,
        exerciseVideos,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

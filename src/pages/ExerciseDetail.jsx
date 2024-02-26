import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import { useParams } from "react-router-dom";
import { ExerciseContext } from "../store/ExerciseContext";

const ExerciseDetail = () => {
  const { id } = useParams();
  //! context aboneliği
  const { getExerciseData, exerciseDetail, exerciseVideos } =
    useContext(ExerciseContext);

  //! detay verileri sadece bu bileşeni ilgilendirdiği için veri çekme isteğini burada yaptım
  //! detay verilerini çekme
  useEffect(() => {
    getExerciseData(id);
  }, [id]);

  if (!exerciseDetail && exerciseVideos) return <p>Loading...</p>;

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
    </Box>
  );
};

export default ExerciseDetail;

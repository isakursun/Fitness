import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ExerciseContext } from "../store/ExerciseContext";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = () => {
  //! context aboneliği
  const { exercises, handleSearch, bodyPartsData } =
    useContext(ExerciseContext);
  //! inputtaki değeri tutacak olan state
  const [search, setSearch] = useState("");

  useEffect(() => {
    bodyPartsData();
  }, []);


  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={() => {
            handleSearch(search), setSearch(""),window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });;
          }}
        >
          Search
        </Button>
      </Box>
      {/* kategoriler */}
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar />
      </Box>
    </Stack>
  );
};

export default SearchExercises;

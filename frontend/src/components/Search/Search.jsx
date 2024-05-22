import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { coursesContext } from "../../contexts/coursesContext";
import "./search.css";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { getAllCourses, courses } = React.useContext(coursesContext);
  const navigate = useNavigate();

  let options = courses.map((option) => option.course_name);

  React.useEffect(() => {
    getAllCourses();
    console.log(courses);
  }, []);

  const handleCourseSelect = (event, value) => {
    const selectedCourse = courses.find(
      (course) => course.course_name === value
    );
    if (selectedCourse) {
      navigate(`/courses/${selectedCourse.id}`);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={options}
        onChange={handleCourseSelect}
        renderInput={(params) => (
          <TextField
            className="search_input"
            {...params}
            label="Search..."
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}

import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard'

const Exercises = ({exercises, setExercises, bodyPart}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const exercisesPerPage = 9

  //Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (event, value) => {
    setCurrentPage (value)
    window.scrollTo({top: 1800, behavior: 'smooth'})
  }

  useEffect(()=>{
    const fetchCategoriesData = async () =>{

      if(bodyPart === 'all'){
        const exercisesData =  await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)
        setExercises(exercisesData)
      }else{
        const exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions)
        setExercises(exercisesData)
      }
    }
    fetchCategoriesData()
    
  }, [bodyPart])

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px" >
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>
      <Stack direction="row" sx={{ gap: { lg: '50px', xs: '50px' } }} flexWrap="wrap" justifyContent="center" >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard 
            key={index}
            exercise={exercise}
          />
        ))}
      </Stack>
      <Stack mt='100px' alignItems='center'>
        {exercises.length > 9 && (
          <Pagination
            color='standard'
            shape='rounded'
            count={Math.ceil(exercises.length/exercisesPerPage)}
            size='large'
            page={currentPage}
            onChange={paginate}
          />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises
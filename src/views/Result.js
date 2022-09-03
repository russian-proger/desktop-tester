import React from 'react';

import {
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import questions from '../../assets/questions.json';

export default function Main(props) {

  const OnStart = () => {
    // Choosing 15 random questions
    const selectedQuestions = questions.slice().sort(() => Math.random() - 0.5).slice(0, 15);
    
    const params = ({
      questions: selectedQuestions
    });

    props.onSetView("test", params);
  }

  return (
    <Container maxWidth="sm">
      <Typography marginTop={2} marginBottom={7} variant="h4" textAlign="center"> Тестирование по теме охрана труда</Typography>
      <Stack spacing={1}>
        <Divider />
        <Button variant="contained" size="large" onClick={OnStart}>Начать тест</Button>
        <Button variant="contained" size="large" onClick={() => window.close()}>Выйти</Button>
      </Stack>
    </Container>
  )
}
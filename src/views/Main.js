import React from 'react';

import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import questions from '../../assets/questions.json';
import Background from '../components/Background';

export default function Main(props) {

  const OnStart = () => {
    // Choosing 15 random questions
    const selectedQuestions = questions.slice().sort(() => Math.random() - 0.5).slice(0, 15);
    // const selectedQuestions = questions.slice();

    const params = ({
      questions: selectedQuestions
    });

    props.onSetView("test", params);
  }

  return (
    <Container className="view-container" maxWidth="sm">
      {/* <Background /> */}
      <Typography marginTop={5} marginBottom={10} variant="h4" textAlign="center"> Тестирование по теме охрана труда</Typography>
      <Box >
        <Stack spacing={1}>
          <Button variant="contained" size="large" onClick={OnStart}>Начать тест</Button>
          <Button variant="contained" size="large" onClick={() => window.close()}>Выйти</Button>
        </Stack>
      </Box>
    </Container>
  )
}
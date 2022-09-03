import React from 'react';

import {
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

import questions from '../../assets/questions.json';
import { Box } from '@mui/system';

export default function Main(props) {
  const answers = props.answers;
  const questions = props.questions;
  console.log(answers);

  const correctAnswersCnt = React.useMemo(() => {
    let result = 0;
    console.log(questions);
    answers.forEach((v, i) => {
      console.log(questions[i].options, v);
      if (questions[i].options[v].correct) {
        result++;
      }
    });

    return result;
  }, [props.answers, props.questions]);

  const OnStart = () => {
    // Choosing 15 random questions
    const selectedQuestions = questions.slice().sort(() => Math.random() - 0.5).slice(0, 15);
    
    const params = ({
      questions: selectedQuestions
    });

    props.onSetView("test", params);
  }

  const ToMainMenu = () => {
    props.onSetView("main");
  }

  return (
    <Container className="view-container" maxWidth="sm">
      <Typography marginTop={2} marginBottom={7} variant="h4" textAlign="center">{correctAnswersCnt / answers.length >= 0.5 ? "Зачёт!" : "Незачёт"}</Typography>
      <Typography marginTop={2} marginBottom={7} variant="h4" textAlign="center">Результат - {parseInt(correctAnswersCnt / answers.length * 100)}%</Typography>
      <Stack spacing={1}>
        <Divider />
        <Button variant="contained" size="large" onClick={ToMainMenu}>В главное меню</Button>
      </Stack>
      <Typography marginTop={2} marginBottom={4} display="block" variant="overline">Ваши ответы</Typography>

      { React.useMemo(() => {
        return (
        <>
          {questions.map((question, q_index) => (
            <Box key={q_index} marginBottom={3}>
              <FormControl>
                <FormLabel>Вопрос {q_index+1}. {question.question}</FormLabel>
                <RadioGroup>
                {question.options.map((opt, opt_index) => (
                  <FormControlLabel
                    className="test-radio-option"
                    style={{
                      background: (opt.correct ? "#b2ffb2" : (answers[q_index] == opt_index ? "#ff8181" : "transparent"))
                    }}
                    key={opt_index}
                    value={opt_index}
                    control={<Radio />}
                    label={opt.title}
                    checked={answers[q_index] == opt_index}
                  />
                ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
        </>
        )
      }, props.answers, [props.questions])}
    </Container>
  )
}
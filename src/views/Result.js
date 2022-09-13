import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  ImageList,
  ImageListItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Background from '../components/Background';

import questions from '../../assets/questions.json';
import { Box } from '@mui/system';

export default function Result(props) {
  const answers = props.answers;
  const questions = props.questions;

  const correctAnswersCnt = React.useMemo(() => {
    let result = 0;
    answers.forEach((v, i) => {
      if (questions[i].options[v].correct) {
        result++;
      }
    });

    return result;
  }, [props.answers, props.questions]);

  const ToMainMenu = () => {
    props.onSetView("main");
  }

  const passed = correctAnswersCnt / answers.length >= 0.5;

  return (
    <Container className="view-container" maxWidth="sm">
      <Typography marginTop={1} marginBottom={1} variant="h6" textAlign="left">
        ФИО: {props.person.name}
      </Typography>
      <Typography marginBottom={3} variant="h6" textAlign="left">
        Структурное подразделение: {props.person.department}
      </Typography>
      <Paper elevation={0} style={{
        height: "200px",
        overflow: "hidden"
      }} position="relative">
        <Box display="flex">
          <Box style={{
            background: (passed ? "#4caf50" : "#e53935"),
          }} width="200px">
            <Typography lineHeight="200px" variant="h2" color="white" textAlign="center">{parseInt(correctAnswersCnt / answers.length * 100)}%</Typography>
          </Box>
          <Box style={{
            flexGrow: 1
          }}>
            <Typography style={{background: "#ebebeb"}} lineHeight="200px" color="#6a6a6a" variant="h2" textAlign="center">{passed ? "Зачёт!" : "Незачёт"}</Typography>
          </Box>
        </Box>
      </Paper>
      <Stack marginTop={2} spacing={1}>
        <Button variant="contained" size="large" onClick={ToMainMenu}>В главное меню</Button>
      </Stack>
      <Typography marginTop={5} marginBottom={2} variant="h4" textAlign="center">Ваши ответы</Typography>

      { React.useMemo(() => {
        return (
        <>
          {questions.map((question, q_index) => (
            <Box key={q_index} marginTop={2} marginBottom={3}>
              <FormControl fullWidth>
                <FormLabel>Вопрос {q_index+1}. {question.question}</FormLabel>

                {question.attachments &&
                <Box marginTop={2} marginBottom={2} >
                  <Accordion
                    variant="outlined"
                    elevation={0}
                    square
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      Иллюстрации
                    </AccordionSummary>
                    <AccordionDetails>
                      <ImageList sx={{ width: '100%' }} cols={question.attachments.length}>
                        {question.attachments.map((image) => (
                          <ImageListItem key={image}>
                            <img
                              src={`images/${image}`}
                              srcSet={`images/${image}`}
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </AccordionDetails>
                  </Accordion>
                </Box>
                }
                <RadioGroup>
                {question.options.map((opt, opt_index) => (
                  <FormControlLabel
                    className="test-radio-option"
                    style={{
                      marginLeft: 0,
                      marginRight: 0,
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
              {q_index != question.length - 1 && <Divider />}
            </Box>
          ))}
        </>
        )
      }, props.answers, [props.questions])}
    </Container>
  )
}
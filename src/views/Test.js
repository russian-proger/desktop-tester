import React from 'react';

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

import Timer from '../components/Timer';

export default function Test(props) {
  const [state, setState] = React.useState({
    currentQuestionID: 0,
    currentAnswerID: null,
  });

  const [answers, setAnswers] = React.useState(new Array(props.questions.length).fill(null));

  const OnSelectAnswer = (id) => {
    setState({...state, currentAnswerID: id});
  }

  const OnSubmit = () => {
    const newAnswers = answers.slice();
    newAnswers[state.currentQuestionID] = state.currentAnswerID;
    
    if (state.currentQuestionID == props.questions.length - 1) {
      props.onSetView("result", {
        answers: newAnswers,
        questions: props.questions,
      });
    } else {
      setState({
        ...state,
        currentAnswerID: null,
        currentQuestionID: state.currentQuestionID + 1
      });
      setAnswers(newAnswers);
    }
  }

  React.useEffect(() => {
    const handler = (ev) => {
      if (ev.key == "Enter" && state.currentAnswerID !== null) {
        OnSubmit();
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const question = props.questions[state.currentQuestionID];

  return (
    <Container className="view-container" maxWidth="sm">
      <LinearProgress variant="determinate" value={(state.currentQuestionID + 1) / props.questions.length * 100} />
      <Box margin={1} sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Chip label={`${state.currentQuestionID + 1} из ${props.questions.length}`} />
        <Typography paddingTop={1}>Тестирование</Typography>
        <Chip label={<Timer />} />
      </Box>
      <Divider />
      <Box marginTop={3} padding={1}>
        <Typography variant="h5">{question.question}</Typography>
      </Box>
      <Box padding={1}>
        <FormControl>
          <FormLabel>Варианты ответа</FormLabel>
          <RadioGroup>
          {question.options.map((opt, index) => (
            <FormControlLabel
              className="test-radio-option"
              key={index}
              value={index}
              control={<Radio />}
              label={opt.title}
              onClick={() => OnSelectAnswer(index)}
              checked={state.currentAnswerID == index}
            />
          ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box className="test-action-group">
        <Container maxWidth="sm">
          <Button
            onClick={OnSubmit}
            disabled={state.currentAnswerID === null}
            style={{width: "100%"}}
            variant="contained"
            size="large"
          >Ответить</Button>
        </Container>
      </Box>
    </Container>
  )
}
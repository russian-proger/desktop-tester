import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import questions from '../../assets/questions.json';
import Background from '../components/Background';

/** @param {Array} mas */
function GetRandomElements(mas, cnt) {
  let result = [];
  let used = new Array(mas.length).fill(0);
  let n = mas.length;
  while (cnt--) {
    let k = parseInt(Math.random() * n);
    let i = 0;
    while (k != 0) {
      if (!used[i]) {
        --k;
      }
      ++i;
    }
    while (used[i]) ++i;
    used[i] = 1;
    result.push(mas[i]);
    n--;
  }
  return result;
}

export default function Main(props) {
  const [personalFormState, setPersonalFormState] = React.useState({
    isOpen: false,
    name: "",
    department: ""
  });

  const OnStart = () => {
    // Choosing 15 random questions
    const selectedQuestions = GetRandomElements(questions.slice().sort(() => Math.random() - 0.5), 15);

    const params = ({
      questions: selectedQuestions,
      person: {...personalFormState}
    });

    props.onSetView("test", params);
  }

  const OpenPersonalForm = () => {
    setPersonalFormState({...personalFormState, isOpen: true});
  }

  const ClosePersonalForm = () => {
    setPersonalFormState({...personalFormState, isOpen: false});
  }

  return (
    <Container className="view-container" maxWidth="sm">
      <Typography marginTop={5} variant="h3" textAlign="center">Тестирование</Typography>
      <Typography marginTop={5} marginBottom={10} variant="h4" textAlign="center">Охрана труда</Typography>
      <Box >
        <Stack spacing={1}>
          <Button variant="contained" size="large" onClick={OpenPersonalForm}>Начать тест</Button>
          <Button variant="contained" size="large" onClick={() => window.close()}>Выйти</Button>
        </Stack>
      </Box>
      <Dialog open={personalFormState.isOpen} onClose={ClosePersonalForm}>
        <DialogTitle>Укажите свои данные</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <TextField
            value={personalFormState.name}
            onChange={(ev) => setPersonalFormState({...personalFormState, name: ev.currentTarget.value})}
            margin="dense"
            autoFocus
            label="ФИО"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={personalFormState.department}
            onChange={(ev) => setPersonalFormState({...personalFormState, department: ev.currentTarget.value})}
            margin="dense"
            label="Структурное подразделение"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={ClosePersonalForm}>Отмена</Button>
          <Button
            disabled={personalFormState.name.length < 3 || personalFormState.department.length < 3}
            onClick={OnStart}
          >Начать тестирование</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

//Third-Party Imports
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";

//Internal Imports
import { gameApiService } from '../../services/gameApi';
import { ToastMessage } from './ToastMessage';

export default function GameForm() {
  const [gameState, setGameState] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  const validationSchema = Yup.object().shape({
    word: Yup.string().required("Word is required")
  });

  const formik = useFormik({
    initialValues: { word: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!gameState) {
          const newGame = await gameApiService.newGame();
          setGameState(newGame);
          setToast({ show: true, message: 'New game created!', variant: 'success' });
        } else {
          const result = await gameApiService.submitGuess(gameState.id, values.word);
          setGameState(result);
          setToast({ show: true, message: result.result, variant: 'success' });
        }
        resetForm();
      } catch (error) {
        setToast({ show: true, message: error.response?.data?.message || 'An error occurred', variant: 'danger' });
      }
    },
  });

  return (
    <Container>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formWord">
          <Form.Label>Guess a word</Form.Label>
          <Form.Control
            name="word"
            type="text"
            placeholder="Enter your guess"
            onChange={formik.handleChange}
            value={formik.values.word}
            isInvalid={formik.touched.word && !!formik.errors.word}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.word}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          {gameState ? 'Submit Guess' : 'Start New Game'}
        </Button>
        {gameState && (
          <div>
            <p>Original Word: {gameState.original_word}</p>
            <p>Scrambled Word: {gameState.scramble_word}</p>
            <p>Remaining Words: {gameState.remaining_words}</p>
          </div>
        )}

      </Form>
    </Container>
  );
}
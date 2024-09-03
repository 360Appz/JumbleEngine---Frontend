
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';

jest.mock('../services/gameApi', () => ({
  gameApiService: {
    newGame: jest.fn(),
    submitGuess: jest.fn(),
  },
}));

jest.mock('../components/Testing/ToastMessage', () => ({
  ToastMessage: jest.fn(() => null),
}));

let GameForm;
let gameApiService;

beforeAll(async () => {
  const module = await import('../components/Testing/GameForm');
  GameForm = module.default;
  gameApiService = (await import('../services/gameApi')).gameApiService;
});

describe('GameForm', () => {
  it('renders correctly', () => {
    render(<GameForm />);
    expect(screen.getByText('Start New Game')).toBeInTheDocument();
  });

  it('starts a new game when form is submitted', async () => {
    gameApiService.newGame.mockResolvedValue({
      id: '123',
      original_word: 'test',
      scramble_word: 'tset',
      remaining_words: 5
    });

    render(<GameForm />);
    
    // Fill in the required word field
    const wordInput = screen.getByLabelText('Guess a word');
    fireEvent.change(wordInput, { target: { value: 'test' } });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByText('Start New Game'));
    });

    // Wait for the state to update
    await waitFor(() => {
      expect(screen.getByText('Original Word: test')).toBeInTheDocument();
    });

    expect(screen.getByText('Scrambled Word: tset')).toBeInTheDocument();
    expect(screen.getByText('Remaining Words: 5')).toBeInTheDocument();
  });
});

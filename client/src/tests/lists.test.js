// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
import QuoteListManager from '../Quotes/QuoteListManager';
import configureStore from 'redux-mock-store'; // Assuming you're using Redux with mock store
import { Provider } from 'react-redux';
const mockStore = configureStore([]);

// Mocking quotesSlice functions
jest.mock('../Quotes/quotesSlice', () => ({
  addList: jest.fn(),
  updateList: jest.fn(),
  deleteList: jest.fn(),
  addQuote: jest.fn(),
  updateQuote: jest.fn(),
  deleteQuote: jest.fn(),
}));

// Mocking CSS file import
jest.mock('../styles/QuoteListManager.css', () => ({}));
test('renders QuoteListManager component without crashing', () => {
  const store = mockStore({
    quotes: {
      quoteLists: [], // Add any initial state needed for testing
    },
  });

  render(
    <Provider store={store}>
      <QuoteListManager />
    </Provider>
  );
});

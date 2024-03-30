import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quoteLists: [],
  nextListId: 1,
};

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    addList(state, action) {
      state.quoteLists.push({
        id: state.nextListId++,
        name: action.payload,
        quotes: [],
      });
    },
    updateList(state, action) {
      const { id, newList } = action.payload;
      const listIndex = state.quoteLists.findIndex((list) => list.id === id);
      if (listIndex !== -1) {
        state.quoteLists[listIndex] = {
          ...state.quoteLists[listIndex],
          ...newList,
        };
      }
    },
    deleteList(state, action) {
      const id = action.payload;
      state.quoteLists = state.quoteLists.filter((list) => list.id !== id);
    },
    addQuote(state, action) {
      const { listId, quote } = action.payload;
      const listIndex = state.quoteLists.findIndex(
        (list) => list.id === listId
      );
      if (listIndex !== -1) {
        const nextQuoteId = state.quoteLists[listIndex].quotes.length + 1; // Generate unique id
        state.quoteLists[listIndex].quotes.push({ id: nextQuoteId, ...quote }); // Add quote with unique id
      }
    },
    updateQuote(state, action) {
      const { listId, quoteId, updatedQuote } = action.payload;
      const listIndex = state.quoteLists.findIndex(
        (list) => list.id === listId
      );
      if (listIndex !== -1) {
        const quoteIndex = state.quoteLists[listIndex].quotes.findIndex(
          (quote) => quote.id === quoteId
        );
        if (quoteIndex !== -1) {
          state.quoteLists[listIndex].quotes[quoteIndex] = {
            ...state.quoteLists[listIndex].quotes[quoteIndex],
            ...updatedQuote,
          };
        }
      }
    },
    deleteQuote(state, action) {
      const { listId, quoteId } = action.payload;
      const listIndex = state.quoteLists.findIndex(
        (list) => list.id === listId
      );
      if (listIndex !== -1) {
        state.quoteLists[listIndex].quotes = state.quoteLists[
          listIndex
        ].quotes.filter((quote) => quote.id !== quoteId);
      }
    },
  },
});

export const {
  addList,
  updateList,
  deleteList,
  addQuote,
  updateQuote,
  deleteQuote,
} = quotesSlice.actions;
export default quotesSlice.reducer;

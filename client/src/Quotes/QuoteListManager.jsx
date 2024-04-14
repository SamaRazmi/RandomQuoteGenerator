import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  addList,
  updateList,
  deleteList,
  addQuote,
  updateQuote,
  deleteQuote,
} from './quotesSlice';
import '../styles/QuoteListManager.css';

function QuoteListManager() {
  const [inputValue, setInputValue] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [quoteCategory, setQuoteCategory] = useState(''); // New state for category
  const [selectedListId, setSelectedListId] = useState('');
  const [editListIds, setEditListIds] = useState([]);
  const [editQuoteIds, setEditQuoteIds] = useState([]);
  const [editListName, setEditListName] = useState('');
  const [editQuoteText, setEditQuoteText] = useState('');
  const [editQuoteAuthor, setEditQuoteAuthor] = useState('');
  const [editQuoteCategory, setEditQuoteCategory] = useState(''); // New state for category
  const [searchQuery, setSearchQuery] = useState('');

  const apiUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api'
      : 'https://crandomquotegenerator.onrender.com/api';

  // eslint-disable-next-line no-unused-vars
  const [lists, setLists] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedListIds, setSelectedListIds] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedListNames, setSelectedListNames] = useState([]);

  const fetchLists = async () => {
    try {
      const response = await axios.get(`${apiUrl}/lists`);
      console.log('Fetched Data:', response.data);
      setLists(response.data);

      // Extract list IDs and names from the response data
      const ids = response.data.map((list) => list._id);
      const names = response.data.map((list) => list.name);
      setSelectedListIds(ids);
      setSelectedListNames(names);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  useEffect(() => {
    fetchLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Log all selectedListIds after the useEffect
  console.log('All Selected List IDs:', selectedListIds);
  console.log('Lists:', lists);
  console.log('Names of Lists:');
  lists.forEach((list) => {
    console.log('this list is:', list.name, 'quote of list is::', list.quote);
  });

  const dispatch = useDispatch();
  const quoteLists = useSelector((state) => state.quotes.quoteLists);

  const handleDeleteList = (id) => {
    // Dispatch delete action if necessary
    dispatch(deleteList(id));

    // Filter out the deleted list from editListIds
    setEditListIds(editListIds.filter((listId) => listId !== id));

    // Filter out the quotes belonging to the deleted list from editQuoteIds
    setEditQuoteIds(editQuoteIds.filter((quoteId) => quoteId !== id));

    // Make axios request to delete the list
    axios
      .delete(`${apiUrl}/lists/${id}`)
      .then((response) => {
        console.log('List deleted successfully:', response.data);
        // Update state to remove the deleted list
        setLists((prevLists) => prevLists.filter((list) => list._id !== id));

        // Update selectedListIds and selectedListNames to remove the deleted list
        setSelectedListIds(
          selectedListIds.filter((selectedId) => selectedId !== id)
        );
        setSelectedListNames((prevNames) =>
          prevNames.filter((name, index) => selectedListIds[index] !== id)
        );
        // Handle success, if needed
      })
      .catch((error) => {
        console.error('Error deleting list:', error);
        console.log('Error response:', error.response); // Log error response
        // Handle error, if needed
      });
  };

  const handleAddList = () => {
    if (inputValue.trim() !== '') {
      const requestData = { name: inputValue };

      axios
        .post(`${apiUrl}/lists`, requestData)
        .then((response) => {
          console.log('List added:', response.data);
          // Update local state
          setLists([...lists, response.data]); // Add the new list to the local state
          setInputValue('');

          // Update selectedListIds and selectedListNames with the new list
          setSelectedListIds([...selectedListIds, response.data._id]);
          setSelectedListNames([...selectedListNames, response.data.name]);
        })
        .catch((error) => {
          console.error('Error adding list:', error);
          // Handle error, if needed
        });
    }
  };
  const handleUpdateList = (id, newName) => {
    if (newName.trim() !== '') {
      const requestData = { name: newName };

      axios
        .put(`${apiUrl}/lists/${id}`, requestData)
        .then((response) => {
          console.log('List updated:', response.data);
          // Update local state with the new value
          const updatedLists = lists.map((list) => {
            if (list._id === id) {
              return { ...list, name: newName };
            }
            return list;
          });
          setLists(updatedLists);
          // Optionally, you can dispatch an action to update your Redux store
          dispatch(updateList(response.data)); // Assuming updateList action updates Redux store
          setEditListIds(editListIds.filter((listId) => listId !== id));
        })
        .catch((error) => {
          console.error('Error updating list:', error);
          // Handle error, if needed
        });
    }
  };
  const handleAddQuote = () => {
    if (
      quoteText.trim() !== '' &&
      quoteAuthor.trim() !== '' &&
      quoteCategory.trim() !== '' && // Ensure category is not empty
      selectedListId !== ''
    ) {
      const requestData = {
        text: quoteText,
        author: quoteAuthor,
        category: quoteCategory,
      };

      axios
        .post(`${apiUrl}/lists/${selectedListId}/quotes`, requestData)
        .then((response) => {
          console.log('Quote added:', response.data);

          // After successfully adding the quote, fetch the updated list data
          fetchLists(); // This will refetch the lists from the server and update the UI

          // Reset input fields
          setQuoteText('');
          setQuoteAuthor('');
          setQuoteCategory('');
          setSelectedListId(''); // Reset selected list ID after adding the quote
        })
        .catch((error) => {
          console.error('Error adding quote:', error);
          console.log('the id is:', selectedListId);
          // Handle error, if needed
        });
    }
  };
  const handleUpdateQuote = (
    listId,
    quoteId,
    newText,
    newAuthor,
    newCategory
  ) => {
    if (
      newText.trim() !== '' &&
      newAuthor.trim() !== '' &&
      newCategory.trim() !== ''
    ) {
      // Dispatch action to update quote if necessary
      dispatch(
        updateQuote({
          listId,
          quoteId,
          updatedQuote: {
            text: newText,
            author: newAuthor,
            category: newCategory,
          },
        })
      );

      // Filter out the edited quote from editQuoteIds
      setEditQuoteIds(editQuoteIds.filter((id) => id !== quoteId));

      // Make axios request to update the quote
      axios
        .put(`${apiUrl}/lists/${listId}/quotes/${quoteId}`, {
          text: newText,
          author: newAuthor,
          category: newCategory,
        })
        .then((response) => {
          console.log('Quote updated successfully:', response.data);
          // Update state with the updated quote data
          setLists((prevLists) =>
            prevLists.map((list) =>
              list._id === listId
                ? {
                    ...list,
                    quotes: list.quotes.map((quote) =>
                      quote._id === quoteId
                        ? {
                            ...quote,
                            text: newText,
                            author: newAuthor,
                            category: newCategory,
                          }
                        : quote
                    ),
                  }
                : list
            )
          );
          // Handle success, if needed
        })
        .catch((error) => {
          console.error('Error updating quote:', error);
          console.log('Error response:', error.response); // Log error response
          // Handle error, if needed
        });
    }
  };

  const handleDeleteQuote = (listId, quoteId) => {
    // Dispatch delete action if necessary
    dispatch(deleteQuote({ listId, quoteId }));

    // Make axios request to delete the quote
    axios
      .delete(`${apiUrl}/lists/${listId}/quotes/${quoteId}`)
      .then((response) => {
        console.log('Quote deleted successfully:', response.data);
        // Update state to remove the deleted quote
        setLists((prevLists) =>
          prevLists.map((list) =>
            list._id === listId
              ? {
                  ...list,
                  quotes: list.quotes.filter((quote) => quote._id !== quoteId),
                }
              : list
          )
        );
        // Handle success, if needed
      })
      .catch((error) => {
        console.error('Error deleting quote:', error);
        console.log('Error response:', error.response); // Log error response
        // Handle error, if needed
      });
  };
  const handleSaveLocal = (list) => {
    // Retrieve existing lists from local storage
    let savedLists = JSON.parse(localStorage.getItem('savedLists')) || [];

    // Add the new list to savedLists
    savedLists.push(list);

    // Save the updated savedLists to local storage
    localStorage.setItem('savedLists', JSON.stringify(savedLists));
    alert('List saved to local storage!');
  };
  const handleSearchList = () => {
    const foundList = quoteLists.find(
      (list) => list.name.toLowerCase() === searchQuery.toLowerCase()
    );

    // Retrieve saved lists from local storage
    const savedLists = JSON.parse(localStorage.getItem('savedLists')) || [];

    // Check if the list exists in saved lists
    const savedList = savedLists.find(
      (list) => list.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (savedList) {
      // Check if the list exists in Redux store
      if (!foundList) {
        // Dispatch actions to add the list to Redux store
        dispatch(addList(savedList.name));
        dispatch(
          addQuote({
            listId: savedList._id, // Corrected: Use savedList._id instead of savedList.id
            quote: {
              text: savedList.quoteText,
              author: savedList.quoteAuthor,
              category: savedList.quoteCategory,
            },
          })
        );
        // Update local state to reflect the added list
        setLists([...lists, savedList]);

        // Update selectedListIds and selectedListNames with the new list
        setSelectedListIds([...selectedListIds, savedList._id]);
        setSelectedListNames([...selectedListNames, savedList.name]);

        setSelectedListId(savedList._id.toString());
        return; // Exit function to prevent alert
      }
    }

    if (foundList) {
      setSelectedListId(foundList.id.toString());
    } else {
      alert('List not found!');
    }
  };
  const renderLists = () => {
    const allLists = [...lists, ...quoteLists]; // Combine lists from state and Redux store

    return allLists.map((list) => {
      const listName = list.name || list.listName || '';
      console.log('List name:', listName);

      return (
        <div key={list._id} className="list-container">
          <div className="list-item">
            {editListIds.includes(list._id) ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editListName}
                  onChange={(e) => setEditListName(e.target.value)}
                />
                <button
                  className="button-style"
                  onClick={() => handleUpdateList(list._id, editListName)}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>{listName}</span>
                <div className="button-container">
                  <button
                    className="button-style"
                    onClick={() => {
                      setEditListName(listName);
                      setEditListIds([...editListIds, list._id]);
                    }}
                  >
                    Edit List
                  </button>
                  <button
                    className="button-style"
                    onClick={() => handleDeleteList(list._id)}
                  >
                    Delete List
                  </button>
                  <button
                    className="button-style"
                    onClick={() => handleSaveLocal(list)}
                  >
                    Save Local
                  </button>
                </div>
              </>
            )}
          </div>
          <ul className="quote-list">
            {list.quotes.map((quote) => (
              <li key={quote._id} className="quote-item">
                <div className="edit-container">
                  {editQuoteIds.includes(quote._id) ? (
                    <div>
                      <input
                        type="text"
                        value={editQuoteText}
                        onChange={(e) => setEditQuoteText(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editQuoteAuthor}
                        onChange={(e) => setEditQuoteAuthor(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editQuoteCategory}
                        onChange={(e) => setEditQuoteCategory(e.target.value)}
                      />
                      <button
                        className="button-style"
                        onClick={() =>
                          handleUpdateQuote(
                            list._id,
                            quote._id,
                            editQuoteText,
                            editQuoteAuthor,
                            editQuoteCategory
                          )
                        }
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="empty circle"></span>
                      {quote.text} - {quote.author} - {quote.category}
                      <div className="button-container">
                        <button
                          className="button-style"
                          onClick={() => {
                            setEditQuoteText(quote.text);
                            setEditQuoteAuthor(quote.author);
                            setEditQuoteCategory(quote.category);
                            setEditQuoteIds([...editQuoteIds, quote._id]);
                          }}
                        >
                          Edit Quote
                        </button>
                        <button
                          className="button-style"
                          onClick={() => handleDeleteQuote(list._id, quote._id)}
                        >
                          Delete Quote
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };
  return (
    <div className="quote-list-manager">
      <div className="add-list-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter list name"
        />
        <button className="button-style" onClick={handleAddList}>
          Add List
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search list by name(LocalStorage)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="button-style"
        />
        <button className="button-style" onClick={handleSearchList}>
          Search
        </button>
      </div>

      <div className="add-quote-section">
        <input
          type="text"
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          placeholder="Enter quote"
        />
        <input
          type="text"
          value={quoteAuthor}
          onChange={(e) => setQuoteAuthor(e.target.value)}
          placeholder="Enter author"
        />
        <input
          type="text" // Input field for category
          value={quoteCategory}
          onChange={(e) => setQuoteCategory(e.target.value)}
          placeholder="Enter category"
        />
        <div>
          <select
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
          >
            <option value="">Select a list</option>
            {selectedListIds.map((id, index) => (
              <option key={index} value={id}>
                {selectedListNames[index]}
              </option>
            ))}
          </select>
        </div>
        <button className="button-style" onClick={handleAddQuote}>
          Add Quote
        </button>
      </div>

      <div className="list-manager-section">
        <h1>Quote List Manager</h1>
        {renderLists()}
      </div>
    </div>
  );
}

export default QuoteListManager;

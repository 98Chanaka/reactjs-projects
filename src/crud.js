import React, { useState } from 'react';

const CrudApp = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && description) {
      if (editingItemId !== null) {
        // Update existing item
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editingItemId ? { ...item, title, description } : item
          )
        );
        setEditingItemId(null);
      } else {
        // Add new item
        const newItem = { id: new Date().getTime(), title, description };
        setItems((prevItems) => [...prevItems, newItem]);
      }
      setTitle('');
      setDescription('');
    }
  };

  const handleEdit = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setEditingItemId(itemId);
    }
  };

  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <button type="submit">{editingItemId !== null ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> - {item.description}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudApp;
import React, { useState } from 'react';
import '../styles/Lists.css';

const initialLists = [
  {
    name: 'Weekly Chores',
    icon: 'listIcons/broom.png',
    itemCount: 2,
    color: '#ffe8a1',
    items: [
      { text: 'Sweep floor', done: false },
      { text: 'Take out trash', done: true },
    ],
  },
  {
    name: 'Meal Prep',
    icon: 'listIcons/meal-prep.png',
    itemCount: 5,
    color: '#d4f5a1',
    items: [
      { text: 'Chop onions', done: true },
      { text: 'Boil rice', done: false },
      { text: 'Grill chicken', done: false },
      { text: 'Wash veggies', done: true },
      { text: 'Pack containers', done: false },
    ],
  },
];

export default function ListsPage() {
  const [lists, setLists] = useState(initialLists);
  const [showModal, setShowModal] = useState(false);
  const [newList, setNewList] = useState({ name: '', icon: '', color: '#fff7dc', items: [] });
  const [newItemText, setNewItemText] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  const handleDelete = (name) => {
    setLists(lists.filter((list) => list.name !== name));
  };

  const handleSave = () => {
    if (newList.name && newList.icon) {
      setLists([...lists, { ...newList, itemCount: newList.items.length }]);
      setNewList({ name: '', icon: '', color: '#fff7dc', items: [] });
      setNewItemText('');
      setShowModal(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const toggleItem = (index) => {
    const updated = [...selectedList.items];
    updated[index].done = !updated[index].done;
    setSelectedList({ ...selectedList, items: updated });
  };

  const addItemToList = (text) => {
    const updated = [...selectedList.items, { text, done: false }];
    setSelectedList({ ...selectedList, items: updated });
  };

  const handleAddItemToNewList = () => {
    if (newItemText.trim()) {
      setNewList({
        ...newList,
        items: [...newList.items, { text: newItemText.trim(), done: false }]
      });
      setNewItemText('');
    }
  };

  return (
    <div className="lists-container">
      <header className="lists-header">
        <h1><b>My Lists</b></h1>
        
      </header>
      <div className='list-button'>
        <button className="new-list-button" onClick={() => setShowModal(true)}>+ New List</button>
      </div>
      
      

      <section className="list-items">
        {lists.map((list) => (
          <div
            className="list-card"
            style={{ backgroundColor: list.color }}
            key={list.name}
            onClick={() => setSelectedList(list)}
          >
            <img src={list.icon} alt={list.name} className="list-icon" />
            <div className="list-info">
              <h3>{list.name}</h3>
              <p>{list.itemCount} items</p>
            </div>
            <input type="checkbox" />
            <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(list.name); }}>🗑️</button>
          </div>
        ))}
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content add-modal" onClick={(e) => e.stopPropagation()}>
            <h3><b>Add New List</b></h3>

            <div className="modal-grid">
              <div className="modal-left">
                <div
                  className="tile-preview"
                  style={{ backgroundColor: newList.color || '#fff7dc' }}
                >
                  {newList.icon ? (
                    <img src={newList.icon} alt="preview" />
                  ) : (
                    <span>📝</span>
                  )}
                  <div style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>
                    {newList.name || <b>List Name</b>}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="List Name"
                  value={newList.name}
                  onChange={(e) => setNewList({ ...newList, name: e.target.value })}
                />

                <h4>Tile Color</h4>
                <div className="tile-color-picker">
                  {["#ffe893", "#dbebac", "#bae7e1", "#ffdfa4", "#fed9bb"].map((color) => (
                    <div
                      key={color}
                      className={`color-option ${newList.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewList({ ...newList, color })}
                    />
                  ))}
                </div>

                <h4>Icon</h4>
                <div className="icon-grid">
                  {[
                    '/listIcons/broom.png',
                    '/listIcons/meal-prep.png',
                    '/listIcons/cart.png',
                    '/listIcons/pan.png',
                    '/listIcons/clipboard.png',
                    '/listIcons/chef.png'
                  ].map((iconPath) => (
                    <img
                      key={iconPath}
                      src={iconPath}
                      alt="icon"
                      onClick={() => setNewList({ ...newList, icon: iconPath })}
                      style={{
                        border: newList.icon === iconPath ? '2px solid #333' : '2px solid transparent'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-right">
                <h4>List Items</h4>
                <div className="item-preview-box">
                <ul className="checklist">
                  {newList.items.map((item, idx) => (
                    <li key={idx} style={{ backgroundColor: newList.color }} className="checklist-item">
                      <input
                        type="checkbox"
                        checked={item.done}
                        readOnly
                      />
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => {
                          const updatedItems = [...newList.items];
                          updatedItems[idx].text = e.target.value;
                          setNewList({ ...newList, items: updatedItems });
                        }}
                        className="list-item-input"
                        placeholder="List item"
                      />
                    </li>
                  ))}
                </ul>
                <div
  className="checklist-item add-item-tile"
  onClick={() => {
    setNewList({
      ...newList,
      items: [...newList.items, { text: '', done: false }]
    });
  }}
>
  + Add Item
</div>


                </div>
                



              </div>
            </div>

            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedList && (
        <div className="modal-overlay" onClick={() => setSelectedList(null)}>
          <div className="modal-content add-modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedList(null)}>← Back</button>
            <h2>{selectedList.name}</h2>
            <ul className="checklist">
              {selectedList.items.map((item, idx) => (
                <li key={idx}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleItem(idx)}
                    />
                    <span className={item.done ? 'done' : ''}>{item.text}</span>
                  </label>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="New item"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  addItemToList(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Grocery.module.css";


export default function GroceryList() {
  const [items, setItems] = useState(['***Not connected to database yet***']);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewItem = () => {
    if (!inputValue.trim()) {
      alert("You must write something!");
      return;
    }
    setItems([...items, inputValue]);
    setInputValue('');
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const toggleChecked = (index) => {
    const newItems = [...items];
    newItems[index] = { text: newItems[index].text || newItems[index], checked: !newItems[index].checked };
    setItems(newItems);
  };

  return (
    <div className={styles.body}>
      <div id="myDIV" className={styles.header}>
        <h2>My Grocery List</h2>
        <input
          type="text"
          id="myInput"
          placeholder="Ingredient..."
          value={inputValue}
          onChange={handleInputChange}
          className={styles.input}
        />
        <span onClick={addNewItem} className={styles.addBtn}>Add</span>
      </div>

      <ul id="myUL" className={styles.ul}>
        {items.map((item, index) => (
          <li
            key={index}
            className={item.checked ? styles.checked : ''}
            onClick={() => toggleChecked(index)}
          >
            {item.text || item}
            <span
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation();
                removeItem(index);
              }}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

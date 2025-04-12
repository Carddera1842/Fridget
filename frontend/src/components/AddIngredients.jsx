import React, { useState } from 'react';
import '../styles/Ingredients.css';

const initialIngredients = [
  { name: 'Carrot', icon: '/ingredientIcons/carrot.png', quantity: '2 whole' },
  { name: 'Milk', icon: '/ingredientIcons/milk.png', quantity: '1 cup' },
  { name: 'Bell Pepper', icon: '/ingredientIcons/bell-pepper.png', quantity: '1 sliced' },
  { name: 'Cheese', icon: '/ingredientIcons/cheese.png', quantity: '100g' },
  { name: 'Eggs', icon: '/ingredientIcons/eggs.png', quantity: '3' },
  { name: 'Apple', icon: '/ingredientIcons/apple.png', quantity: '2' },
  { name: 'Broccoli', icon: '/ingredientIcons/broccoli.png', quantity: '1 bunch' },
  { name: 'Onion', icon: '/ingredientIcons/onion.png', quantity: '1' },
  { name: 'Spinach', icon: '/ingredientIcons/spinach.png', quantity: '2 handfuls' },
  { name: 'Chicken', icon: '/ingredientIcons/chicken.png', quantity: '1 breast' },
  { name: 'Tomato', icon: '/ingredientIcons/tomato.png', quantity: '2' }
];

const recipes = [
  {
    title: 'Spinach Frittata',
    img: 'https://via.placeholder.com/150',
    ingredients: '6 of 8',
    time: '40 m',
  },
  {
    title: 'Scrambled Eggs',
    img: 'https://via.placeholder.com/150',
    ingredients: '3 of 3',
    time: '10 s',
  },
  {
    title: 'Vegetable Stir Fry',
    img: 'https://via.placeholder.com/150',
    ingredients: '7 of 9',
    time: '25 s',
  },
];

function AddIngredients() {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ name: '', icon: '', color: '' });

  const handleTileClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeModal = () => {
    setSelectedIngredient(null);
  };

  const handleEdit = () => {
    alert('Edit feature coming soon!');
  };

  const handleDelete = () => {
    alert('Delete feature coming soon!');
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewIngredient({ name: '', icon: '', color: '' });
  };

  const handleSaveNewIngredient = () => {
    if (newIngredient.name && newIngredient.icon) {
      setIngredients([...ingredients, { ...newIngredient, quantity: '1' }]);
      closeAddModal();
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="fridge-container">
      <header className="fridge-header">
        <h1><b>My Fridge</b></h1>
      </header>

      <section className="ingredients-section">
        <div className="ingredients-scroll">
          {ingredients.map((item, idx) => (
            <div key={idx} className="ingredient-tile" onClick={() => handleTileClick(item)} style={{ backgroundColor: item.color || '#fff5d7' }}>
              <img className="ingredient-icon" src={item.icon} alt={item.name} />
              <div className="ingredient-name">{item.name}</div>
            </div>
          ))}
          <div className="ingredient-tile add-more" onClick={openAddModal}>+</div>
        </div>
      </section>

      <section className="recipes-section">
        <h2 className="fridge-header">Recipes You Can Make</h2>
        <div className="recipes-list">
          {recipes.map((recipe, idx) => (
            <div key={idx} className="recipe-card">
              <img src={recipe.img} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>You have {recipe.ingredients} ingredients</p>
              <div className="recipe-footer">
                <span>{recipe.time}</span>
                <button>View Recipe</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedIngredient && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedIngredient.name}</h3>
            <img className="modal-icon" src={selectedIngredient.icon} alt={selectedIngredient.name} />
            <p><strong>Quantity:</strong> {selectedIngredient.quantity}</p>
            <p><strong>Tags:</strong> Fresh, Organic</p>
            <div className="modal-actions">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="modal-content add-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Ingredient</h3>

            <div
              className="tile-preview"
              style={{ backgroundColor: newIngredient.color || '#fff1d6' }}
            >
              {newIngredient.icon ? (
                <img src={newIngredient.icon} alt="preview" />
              ) : (
                <span>🍴</span> 
              )}
              <div style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>
                {newIngredient.name || 'Name'}
              </div>
            </div>

            <h4>Tile Color</h4>
            <div className="tile-color-picker">
              {['#fff1d6', '#ffe4e1', '#fffac8', '#f0e1ff', '#d7f7e4'].map((color) => (
                <div
                  key={color}
                  className={`color-option ${
                    newIngredient.color === color ? 'selected' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNewIngredient({ ...newIngredient, color })}
                />
              ))}
            </div>

            <h4>Ingredient Name</h4>
            <input
              type="text"
              placeholder="e.g. Banana"
              value={newIngredient.name}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, name: e.target.value })
              }
            />

            <h4>Icon</h4>
            <div className="icon-grid">
              {[
                '/ingredientIcons/apple.png',
                '/ingredientIcons/banana.png',
                '/ingredientIcons/bell-pepper.png',
                '/ingredientIcons/bread.png',
                '/ingredientIcons/broccoli.png',
                '/ingredientIcons/carrot.png',
                '/ingredientIcons/cheese.png',
                '/ingredientIcons/chicken.png',
                '/ingredientIcons/chili.png',
                '/ingredientIcons/eggs.png',
                '/ingredientIcons/instant-noodles.png',
                '/ingredientIcons/lettuce.png',
                '/ingredientIcons/milk.png',
                '/ingredientIcons/onion.png',
                '/ingredientIcons/pasta.png',
                '/ingredientIcons/potato.png',
                '/ingredientIcons/spinach.png',
                '/ingredientIcons/strawberry.png',
                '/ingredientIcons/sugar.png',
                '/ingredientIcons/sweet-potato.png',
                '/ingredientIcons/tomato.png',
              ].map((iconPath) => (
                <img
                  key={iconPath}
                  src={iconPath}
                  alt="icon"
                  onClick={() =>
                    setNewIngredient({ ...newIngredient, icon: iconPath })
                  }
                  style={{
                    border:
                      newIngredient.icon === iconPath
                        ? '2px solid #333'
                        : '2px solid transparent',
                  }}
                />
              ))}
            </div>

            <div className="modal-actions" style={{ marginTop: '1rem' }}>
              <button onClick={handleSaveNewIngredient}>Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AddIngredients;
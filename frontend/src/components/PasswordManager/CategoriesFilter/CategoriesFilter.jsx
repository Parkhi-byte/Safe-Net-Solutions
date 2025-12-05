import React, { useState } from 'react';
import { usePassword } from '../../../contexts/PasswordContext';
import styles from './CategoriesFilter.module.css';

const CategoriesFilter = () => {
  const { selectedCategory, setSelectedCategory, getCategories } = usePassword();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const categories = getCategories();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      // In a real app, this would add to the categories list
      // For now, we'll just close the form
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'All': '#666666',
      'Work': '#1a4d7a',
      'Social': '#00d4aa',
      'Finance': '#ff9800',
      'Shopping': '#9c27b0',
      'Entertainment': '#f44336',
      'Other': '#666666'
    };
    return colors[category] || colors['Other'];
  };

  return (
    <div className={styles.filter}>
      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategorySelect(category)}
            style={{
              '--category-color': getCategoryColor(category),
              backgroundColor: selectedCategory === category 
                ? getCategoryColor(category) 
                : 'transparent',
              color: selectedCategory === category 
                ? '#ffffff' 
                : getCategoryColor(category),
              borderColor: getCategoryColor(category)
            }}
          >
            {category}
          </button>
        ))}
        <button
          className={styles.addButton}
          onClick={() => setShowAddCategory(!showAddCategory)}
          title="Add new category"
        >
          +
        </button>
      </div>

      {showAddCategory && (
        <form className={styles.addForm} onSubmit={handleAddCategory}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className={styles.addInput}
            autoFocus
          />
          <button type="submit" className={styles.addSubmit}>
            Add
          </button>
          <button
            type="button"
            className={styles.addCancel}
            onClick={() => {
              setShowAddCategory(false);
              setNewCategory('');
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default CategoriesFilter;


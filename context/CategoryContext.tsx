import React, { createContext, useContext, useState } from "react";

export interface Category {
  id: string;
  name: string;
  repeat: string;
  repeatEnd: string;
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([
    { id: "study", name: "학업", repeat: "매일", repeatEnd: "안함" },
    { id: "exercise", name: "운동", repeat: "매일", repeatEnd: "안함" },
  ]);

  const addCategory = (category: Category) => {
    setCategories((current) => {
      if (current.some((item) => item.id === category.id)) return current;
      return [...current, category];
    });
  };

  const updateCategory = (category: Category) => {
    setCategories((current) =>
      current.map((item) => (item.id === category.id ? category : item))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((current) => current.filter((item) => item.id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, updateCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoryContext);
}

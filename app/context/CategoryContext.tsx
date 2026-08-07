import React, {
  createContext,
  useContext,
  useState,
} from "react";

interface CategoryContextType {

  categories: string[];

  addCategory: (
    category: string
  ) => void;

  deleteCategory: (
    category: string
  ) => void;

}

const CategoryContext =
createContext<CategoryContextType>(
{} as CategoryContextType
);

export function CategoryProvider({
  children,
}:{
  children: React.ReactNode;
}){

  const [categories,setCategories]=
  useState([
    "학업",
    "운동",
  ]);

  const addCategory=(category:string)=>{

    if(
      categories.includes(category)
    ){
      return;
    }

    setCategories((prev)=>[
      ...prev,
      category,
    ]);

  };

  const deleteCategory=(
    category:string
  )=>{

    setCategories((prev)=>
      prev.filter(
        (item)=>
        item!==category
      )
    );

  };

  return(

    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
      }}
    >

      {children}

    </CategoryContext.Provider>

  );

}

export function useCategories(){

  return useContext(
    CategoryContext
  );

}
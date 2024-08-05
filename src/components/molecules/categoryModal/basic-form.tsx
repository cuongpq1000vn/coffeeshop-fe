"use client";
import { CategoryRequest } from "@/types/dtos/categoryProduct/request/CategoryRequest";
import style from "../style/category-information.module.css";
import { SetStateAction, useEffect, useState } from "react";
import { CategoryLabel } from "@/types/CategoryLabel";
import { getAllCategory } from "@/services/CategoryService";
import { CategoryDTO } from "@/types/dtos/categoryProduct/Category";
import { PageDTO } from "@/types/Page";
type CategoryInformationProps = {
  category: CategoryRequest;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isEditMode: boolean;
};

export default function CategoryForm({
  category,
  handleInputChange,
  isEditMode,
}: Readonly<CategoryInformationProps>) {
  const [categoryOption, setCategoryOption] = useState<CategoryLabel[]>([]);
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const result: PageDTO<CategoryDTO> = await getAllCategory(0, 1000000);
        if (!result) {
          console.error("Unexpected data format:", result);
        }
        const categoryGroup: SetStateAction<CategoryLabel[]> = [];
        result.content.forEach((elm) => {
          const content = {
            value: elm.id.toString(),
            label: elm.name,
          };
          categoryGroup.push(content);
        });
        setCategoryOption(categoryGroup);
      } catch (error) {
        console.error("Failed to get all categories:", error);
      }
    };
    getAllCategories();
  }, []);

  return (
    <div>
      <hr className="mt-4 mb-4" />
      <h1 className={style.title}>Category information</h1>
      <label htmlFor="name" className={style.label}>
        Category Name
      </label>
      <input
        className={style.inputBox}
        placeholder="Category Name"
        type="text"
        id="name"
        name="name"
        value={category.name}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="category" className={style.label}>
        Category Parent
      </label>
      <select
        className={`${style.inputBox} mb-4`}
        id="parent"
        name="parent"
        value={category.parent.toString()}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Categories</option>
        {categoryOption.length > 0 ? (
          categoryOption.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No categories available
          </option>
        )}
      </select>
    </div>
  );
}

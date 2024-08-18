"use client";
import { ProductRequest } from "@/types/dtos/categoryProduct/request/ProductRequest";
import style from "../style/basic-information.module.css";
import { PageDTO } from "@/types/Page";
import { CategoryDTO } from "@/types/dtos/categoryProduct/Category";
import { getAllCategory } from "@/services/CategoryService";
import { SetStateAction, useEffect, useState } from "react";
import { CategoryLabel } from "@/types/CategoryLabel";

type BasicInformationProps = {
  product: ProductRequest;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isEditMode: boolean;
};

export default function BasicInformation({
  product,
  handleInputChange,
  isEditMode,
}: Readonly<BasicInformationProps>) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="name" className={style.label}>
          Product Name
        </label>
        <input
          className={style.inputBox}
          placeholder="Iced Coffee"
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="longDescription" className={style.label}>
          Product Long Description
        </label>
        <textarea
          id="longDescription"
          name="longDescription"
          className="block p-2.5 w-80 text-sm mb-5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Product Long Description"
          value={product.longDescription}
          onChange={handleInputChange}
        ></textarea>

        <label htmlFor="shortDescription" className={style.label}>
          Product Short Description
        </label>
        <input
          className={style.inputBox}
          placeholder="Product Short Description"
          type="text"
          id="shortDescription"
          name="shortDescription"
          value={product.shortDescription}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className={style.label}>
          Product Category
        </label>
        <select
          className={`${style.inputBox} mb-4`}
          id="category"
          name="category"
          value={product.category}
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

        <label htmlFor="note" className={style.label}>
          Note
        </label>
        <input
          className={style.inputBox}
          placeholder="Enter Note"
          type="text"
          id="note"
          name="note"
          value={product.note}
          onChange={handleInputChange}
          required
        />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="isRecommended" className={style.label}>
              Is Recommended
            </label>
            <input
              id="recommended"
              name="recommended"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              checked={product.recommended}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="isLive" className={style.label}>
              Is Live
            </label>
            <input
              id="live"
              name="live"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              checked={product.live}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

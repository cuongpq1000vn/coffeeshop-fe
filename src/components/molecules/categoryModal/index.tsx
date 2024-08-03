"use client";
import { CategoryRequest } from "@/types/dtos/categoryProduct/request/CategoryRequest";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import CategoryForm from "./basic-form";
import { MdAdd } from "react-icons/md";
import { uploadImage } from "@/services/ImageService";
import { ImageProps } from "@/types/dtos/image/ImageProps";
import style from "../style/category-modal.module.css";

type CreateCategoryModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (category: CategoryRequest) => void;
};
export default function CategoryModal({
  open,
  onClose,
  onSubmit,
}: Readonly<CreateCategoryModalProps>) {
  const [category, setCategory] = useState<CategoryRequest>({
    name: "",
    parent: 0,
    storeId: "",
    images: [],
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = event.target;
    if (type === "checkbox" || type === "radio") {
      const target = event.target as HTMLInputElement;
      setCategory((prevProduct) => ({
        ...prevProduct,
        [name]: target.checked,
      }));
    } else if (type === "number" || type === "select-one") {
      setCategory((prevProduct) => ({
        ...prevProduct,
        [name]: Number(value),
      }));
    } else {
      setCategory((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };
  const handleSubmit = () => {
    onSubmit(category);
    onClose();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        const imageUrl: ImageProps = await uploadImage(
          formData,
          "bao",
          "product"
        );
        if (!imageUrl) {
          console.error("Unexpected data format:", imageUrl);
        }
        setCategory((prevProduct) => ({
          ...prevProduct,
          images: imageUrl.links,
        }));
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Category</DialogTitle>
      <DialogContent>
        <CategoryForm
          category={category}
          handleInputChange={handleInputChange}
        />
        <hr className="mt-4 mb-4" />
        <div>
          <label htmlFor="productImage" className={style.titleImage}>
            Media (image, video or 3D models)
          </label>
          <div className="flex gap-6 mt-5">
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center">
              {category.images ? (
                <img
                  src={category.images[0]}
                  alt="Product"
                  className="object-cover w-32 h-32"
                />
              ) : (
                <input
                  type="file"
                  id="productImage"
                  className="opacity-0 absolute cursor-pointer w-32 h-32"
                  onChange={handleImageChange}
                />
              )}
            </div>
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <label
                htmlFor="productImage"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <MdAdd className="text-4xl text-gray-500" />
                <span className="text-sm text-gray-500">Upload</span>
              </label>
              <input
                type="file"
                id="productImage"
                className="opacity-0 absolute cursor-pointer w-32 h-32"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} className={style.saveButton}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import style from "../style/product-modal.module.css";
import { MdAdd } from "react-icons/md";
import BasicInformation from "./basic-form";
import { ProductRequest } from "@/types/dtos/categoryProduct/request/ProductRequest";
import { uploadImage } from "@/services/ImageService";
import { ImageProps } from "@/types/dtos/image/ImageProps";
import Image from "next/image";

type CreateProductModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: ProductRequest) => void;
  initialProduct: ProductRequest;
  isEditMode?: boolean;
};

export default function ProductModal({
  open,
  onClose,
  onSubmit,
  initialProduct,
  isEditMode = false,
}: Readonly<CreateProductModalProps>) {
  const [product, setProduct] = useState<ProductRequest>(initialProduct);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = event.target;
    if (type === "checkbox" || type === "radio") {
      const target = event.target as HTMLInputElement;
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: target.checked,
      }));
    } else if (type === "number" || type === "select-one") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: Number(value),
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
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
        setProduct((prevProduct) => ({
          ...prevProduct,
          images: imageUrl.links,
        }));
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  const handleSubmit = () => {
    onSubmit(product);
    onClose();
  };

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className={style.title}>
        {isEditMode ? "Edit Product" : "Create New Product"}{" "}
        <hr className="mt-4" />
      </DialogTitle>
      <DialogContent>
        <h1 className={style.contentHeader}>Basic Information</h1>
        <BasicInformation
          product={product}
          handleInputChange={handleInputChange}
          isEditMode={isEditMode}
        />
        <hr className="mt-4 mb-4" />
        <div>
          <label htmlFor="productImage" className={style.titleImage}>
            Media (image, video or 3D models)
          </label>
          <div className="flex gap-6 mt-5">
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center">
              {product.images[0] === "" ? (
                <Image
                  src={product.images[0]}
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
        <hr className="mt-4 mb-4" />
        <div>
          <label htmlFor="saleInfo" className={style.titleImage}>
            Sale information
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <div>
              <label htmlFor="price" className={style.label}>
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                aria-describedby="helper-text-explanation"
                className={style.inputSmaller}
                placeholder="$100.00"
                required
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="finalPrice" className={style.label}>
                Final Price
              </label>
              <input
                type="number"
                id="finalPrice"
                name="finalPrice"
                aria-describedby="helper-text-explanation"
                className={style.inputSmaller}
                placeholder="$50.00"
                required
                value={product.finalPrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="countSale" className={style.label}>
                Count Sale
              </label>
              <input
                type="number"
                id="countSale"
                name="countSale"
                aria-describedby="helper-text-explanation"
                className={style.inputSmaller}
                placeholder="Enter count sale"
                required
                value={product.countSale}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} className={style.saveButton}>
          {isEditMode ? "Save Changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

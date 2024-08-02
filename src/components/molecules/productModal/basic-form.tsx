import { ProductRequest } from "@/types/dtos/categoryProduct/request/ProductRequest";
import style from "../style/basic-information.module.css";

type BasicInformationProps = {
  product: ProductRequest;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function BasicInformation({
  product,
  handleCategoryChange,
  handleInputChange,
}: Readonly<BasicInformationProps>) {
  const categories = [
    { value: "1", label: "Category 1" },
    { value: "2", label: "Category 2" },
    { value: "3", label: "Category 3" },
  ];

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
          onChange={handleCategoryChange}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
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
              id="isRecommended"
              name="isRecommended"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              checked={product.isRecommended}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="isLive" className={style.label}>
              Is Live
            </label>
            <input
              id="isLive"
              name="isLive"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              checked={product.isLive}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

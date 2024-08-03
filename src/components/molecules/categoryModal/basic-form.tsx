import { CategoryRequest } from "@/types/dtos/categoryProduct/request/CategoryRequest";
import style from "../style/category-information.module.css";
type CategoryInformationProps = {
  category: CategoryRequest;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};
const categories = [
  { value: "1", label: "Category 1" },
  { value: "2", label: "Category 2" },
  { value: "3", label: "Category 3" },
];

export default function CategoryForm({
  category,
  handleInputChange,
}: Readonly<CategoryInformationProps>) {
  return (
    <div>
      <hr className="mt-4 mb-4" />
      <h1 className={style.title}>Category information</h1>
      <label htmlFor="name" className={style.label}>
        Category Name
      </label>
      <input
        className={style.inputBox}
        placeholder="Iced Coffee"
        type="text"
        id="name"
        name="name"
        value={category.name}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="category" className={style.label}>
        Product Category
      </label>
      <select
        className={`${style.inputBox} mb-4`}
        id="parent"
        name="parent"
        value={category.parent}
        onChange={handleInputChange}
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
    </div>
  );
}

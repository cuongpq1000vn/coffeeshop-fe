import { MetadataDTO } from "@/types/MetaData";

export type CategoryDTO = MetadataDTO & {
    name: string;
    normalizedName: string;
    storeId: string | null;
    id: number;
    parent: number | null;
    images: string[];
    children: CategoryDTO[];
  };
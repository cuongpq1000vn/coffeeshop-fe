export type PageDTO<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  pageable: PageableDTO;
};

export interface SortDTO {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface PageableDTO {
  pageNumber: number;
  pageSize: number;
  sort: SortDTO;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

type StableSortProps = [Product, number];

type SortComparator = (a: Product, b: Product) => number; 

export type SortOrder = 'asc' | 'desc';

export type Product = {
    image: string;
    title: string;
    price: number;
}

export const descendingComparator = (a: Product, b: Product, orderBy: string) => {
    if (b[orderBy as keyof Product] < a[orderBy as keyof Product]) {
      return -1;
    }
    if (b[orderBy as keyof Product] > a[orderBy as keyof Product]) {
      return 1;
    }
    return 0;
  }
  
export const getComparator = (order: SortOrder, orderBy: string) => {
  return order === 'desc'
    ? (a: Product, b: Product) => descendingComparator(a, b, orderBy)
    : (a: Product, b: Product) => -descendingComparator(a, b, orderBy);
};
  
export const stableSort = (array: Product[], comparator: SortComparator) => {
  const stabilizedThis: StableSortProps[]= array.map((el: Product, index: number) => [el, index]);
  stabilizedThis.sort((a: StableSortProps, b: StableSortProps) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: StableSortProps) => el[0]);
};
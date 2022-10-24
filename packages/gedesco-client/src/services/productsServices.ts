const baseUrl = 'https://fakestoreapi.com';

export interface ProductModel {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
} 

export const getProducts = (): Promise<ProductModel[]> => (
    fetch(`${baseUrl}/products`)
    .then((res) => res.json())
);

export const getProductsByCategory = (category: string): Promise<ProductModel[]> => (
    fetch(`${baseUrl}/products/category/${category}?sort=asc`)
    .then((res) => res.json())
);

export const getProductsCategories = (): Promise<string[]> => (
    fetch(`${baseUrl}/products/categories`)
    .then((res) => res.json())
);

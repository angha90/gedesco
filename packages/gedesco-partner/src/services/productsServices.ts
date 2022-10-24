const baseUrl = 'https://fakestoreapi.com';

export interface ProductModel {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    rating: { 
        rate: number;
        count: number;
    };
    title: string;
} 

export const getProducts = (): Promise<ProductModel[]> => (
    fetch(`${baseUrl}/products`)
    .then((res) => res.json())
);


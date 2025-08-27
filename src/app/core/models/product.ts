export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
    stock: number;
    inStock: boolean;
}

export interface Category {
    id: string;
    name: string;
}

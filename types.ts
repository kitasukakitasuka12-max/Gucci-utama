export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  rawPrice: number;
  commission: string;
  profit: string;
  colors: string[];
}

export interface Task {
  id: number;
  label: string;
  locked: boolean;
  completed: boolean;
}
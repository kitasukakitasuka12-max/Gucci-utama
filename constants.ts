import { Product } from './types';

export const WHATSAPP_NUMBER = "6281234567890"; // Replace with actual number

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Gucci Horsebit 1955 Aura mini shoulder bag",
    image: "https://picsum.photos/400/300?random=1",
    price: "100.000",
    rawPrice: 100000,
    commission: "20%",
    profit: "120.000",
    colors: ["#A78BFA", "#4B5563"] // Purple, Gray
  },
  {
    id: 2,
    name: "GG Marmont medium shoulder bag",
    image: "https://picsum.photos/400/300?random=2",
    price: "300.000",
    rawPrice: 300000,
    commission: "20%",
    profit: "360.000",
    colors: ["#FDE68A", "#1F2937", "#9CA3AF"] // Beige, Black, Gray
  },
  {
    id: 3,
    name: "Ophidia mini bag",
    image: "https://picsum.photos/400/300?random=3",
    price: "600.000",
    rawPrice: 600000,
    commission: "20%",
    profit: "750.000",
    colors: ["#92400E", "#D97706"] // Brown pattern
  },
  {
    id: 4,
    name: "GG Emblem small shoulder bag",
    image: "https://picsum.photos/400/300?random=4",
    price: "1.000.000",
    rawPrice: 1000000,
    commission: "20%",
    profit: "1.200.000",
    colors: ["#D97706", "#FCA5A5", "#FFFFFF"] 
  }
];

export const PAYMENT_METHODS = [
  "BCA", "BNI", "BRI", "Mandiri", "BJB", "BSI",
  "GoPay", "OVO", "ShopeePay", "LinkAja", "DANA", "QRIS",
  "Alfamart", "Alfamidi", "AlfaExpress", "Indomaret", "UangMe", "PayPal"
];
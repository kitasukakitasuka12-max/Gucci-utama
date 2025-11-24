import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col relative group">
      {/* Number Badge */}
      <div className="absolute top-4 left-4 z-10 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md border-2 border-white/20">
        {index + 1}
      </div>

      {/* Image Area */}
      <div className="h-48 md:h-56 overflow-hidden bg-gray-100 relative p-4 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 bg-[#0B1221] text-white flex-1 flex flex-col justify-between border-t border-slate-800">
        <div>
          <h3 className="text-sm font-medium leading-tight mb-2 line-clamp-2 h-10 text-slate-200">
            {product.name}
          </h3>
          
          <div className="flex gap-1 mb-3">
            {product.colors.map((color, i) => (
              <span 
                key={i} 
                className="w-3 h-3 rounded-full border border-slate-600" 
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 0 && <span className="text-xs text-slate-500 ml-1">+{product.colors.length}</span>}
          </div>

          <div className="space-y-1 text-xs mb-4 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">IDR price</span>
              <span className="font-bold">: {product.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Commission</span>
              <span className="font-bold text-yellow-400">: {product.commission}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">IDR profit</span>
              <span className="font-bold text-green-400">: {product.profit}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onSelect(product)}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg font-bold tracking-wide transition-colors uppercase text-sm shadow-lg shadow-blue-900/20"
        >
          Pilih
        </button>
      </div>
    </div>
  );
};
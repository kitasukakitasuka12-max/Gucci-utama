import React from 'react';
import { ArrowLeft, MessageCircle, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface DetailViewProps {
  product: Product;
  onBack: () => void;
  onConfirm: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ product, onBack, onConfirm }) => {
  
  const handleWhatsAppRedirect = () => {
    // Construct message
    const message = `Halo Admin, saya ingin mengambil pesanan tugas:
    
Nama Produk: ${product.name}
Harga: IDR ${product.price}
Komisi: ${product.commission}
Keuntungan: IDR ${product.profit}

Mohon diproses untuk tugas saya. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(url, '_blank');
    
    // Unlock next task logic
    onConfirm();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-400 hover:text-white transition-colors gap-2"
      >
        <ArrowLeft size={20} />
        <span>Kembali ke Tabel Produk</span>
      </button>

      <div className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col md:flex-row">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-full max-h-[400px] object-contain drop-shadow-xl"
          />
           <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Selected Item
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-slate-400 mb-8 text-sm">Official Gucci Business Program Selection</p>

          <div className="space-y-4 mb-10 flex-1">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
              <span className="text-slate-400">Harga Modal</span>
              <span className="text-white font-bold text-lg">IDR {product.price}</span>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
              <span className="text-slate-400">Komisi Tugas</span>
              <span className="text-yellow-400 font-bold text-lg">{product.commission}</span>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center bg-gradient-to-r from-green-900/20 to-green-900/10">
              <span className="text-green-400 font-medium">Total Keuntungan</span>
              <span className="text-green-400 font-bold text-xl">IDR {product.profit}</span>
            </div>
          </div>

          <div className="space-y-3">
             <div className="text-center text-xs text-slate-500 mb-2">
               Klik tombol di bawah untuk konfirmasi pesanan via WhatsApp
             </div>
            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-green-900/40"
            >
              <MessageCircle size={24} />
              <span>Konfirmasi via WhatsApp</span>
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
              <CheckCircle size={14} />
              <span>Secure Transaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
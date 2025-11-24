import React, { useState } from 'react';
import { Search, Package, Menu, MoreHorizontal, CreditCard } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { DetailView } from './components/DetailView';
import { PRODUCTS, PAYMENT_METHODS } from './constants';
import { Product, Task } from './types';

const App: React.FC = () => {
  // State
  const [activeTaskId, setActiveTaskId] = useState<number>(1);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [view, setView] = useState<'dashboard' | 'detail'>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize Tasks
  const tasks: Task[] = Array.from({ length: 5 }, (_, i) => {
    const id = i + 1;
    // Task 1 is always unlocked. Others depend on previous completion.
    // However, the prompt says "If user hasn't chosen product in task 1, task 2 is locked".
    // This implies sequential locking.
    const isLocked = id > 1 && !completedTasks.includes(id - 1);
    
    return {
      id,
      label: `TASK ${id}`,
      locked: isLocked,
      completed: completedTasks.includes(id)
    };
  });

  // Handlers
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  const handleTaskClick = (id: number) => {
    setActiveTaskId(id);
    setView('dashboard');
    setSelectedProduct(null);
  };

  const handleConfirmOrder = () => {
    // When user confirms (goes to WhatsApp), we mark current task as complete
    // and unlock the next one.
    if (!completedTasks.includes(activeTaskId)) {
      setCompletedTasks([...completedTasks, activeTaskId]);
    }
    // Stay on detail or go back? Usually go back to dashboard to see next task.
    // But for UX, we might keep them there or reset. Let's go back to dashboard.
    // setTimeout to allow the WhatsApp new tab to open first.
    setTimeout(() => {
        setView('dashboard');
        // Auto switch to next task if available
        if (activeTaskId < 5) {
            setActiveTaskId(activeTaskId + 1);
        }
    }, 1000);
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setSelectedProduct(null);
  };

  return (
    <div className="flex h-screen bg-[#050b14] text-white overflow-hidden font-sans">
      
      {/* Sidebar */}
      <Sidebar 
        tasks={tasks} 
        activeTaskId={activeTaskId} 
        onTaskClick={handleTaskClick} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Header */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-6 bg-[#0a1120] shrink-0 z-20">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-white">TABEL PRODUK</h1>
            <span className="text-xs text-slate-400 tracking-widest uppercase">Gucci Business Program</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700 w-64 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <input 
                type="text" 
                placeholder="Tabel Produk..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-slate-500"
              />
              <Search size={18} className="text-slate-400" />
            </div>
            
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors border border-slate-700">
              <Package size={20} className="text-slate-300" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors border border-slate-700">
              <Menu size={20} className="text-slate-300" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          
          {/* Background Gradient Effect */}
          <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-900/10 blur-[100px] pointer-events-none rounded-full transform -translate-y-1/2"></div>

          {view === 'dashboard' ? (
            <div className="max-w-7xl mx-auto flex flex-col h-full">
              
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
                {PRODUCTS.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index} 
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>

              {/* Bottom Section */}
              <div className="mt-auto grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                
                {/* Payment Methods */}
                <div className="bg-[#0f172a] rounded-xl p-6 border border-slate-800 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex flex-col items-center justify-center gap-2 text-white shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center shadow-inner">
                        <CreditCard size={32} className="text-white/90" />
                    </div>
                    <span className="font-bold tracking-widest text-sm">PAYMENT</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {PAYMENT_METHODS.map((method) => (
                      <div key={method} className="bg-white px-2 py-1 rounded text-[10px] font-bold text-slate-800 min-w-[50px] text-center shadow-sm hover:scale-105 transition-transform cursor-default">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attention Box */}
                <div className="bg-[#111827] rounded-xl p-6 border border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-slate-500">
                    <MoreHorizontal size={20} />
                  </div>
                  <h3 className="text-xl font-normal text-white mb-4">Attention</h3>
                  <p className="text-slate-400 text-sm leading-relaxed italic">
                    "Setiap pelanggan yang melanjutkan tugas pekerjaan akan secara otomatis menerima tabel produk terbaru yang telah ditentukan secara acak oleh sistem."
                  </p>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-colors"></div>
                </div>

              </div>
            </div>
          ) : (
            selectedProduct && (
              <DetailView 
                product={selectedProduct} 
                onBack={handleBackToDashboard}
                onConfirm={handleConfirmOrder}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
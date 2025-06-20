import React from 'react';
import { Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Code2 className="w-8 h-8 text-orange-500" />
            <span className="text-white font-bold text-xl">Bootcamp Dev Web</span>
          </div>
          <p className="text-slate-400">
            Transforme ta passion en carrière • Développe ton avenir
          </p>
        </div>
      </footer>
    </>
  );
};

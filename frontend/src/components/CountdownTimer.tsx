import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Minuit du jour suivant
      
      const difference = midnight.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    // Calculer immédiatement
    calculateTimeLeft();
    
    // Mettre à jour chaque seconde
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-4 rounded-xl shadow-lg border border-slate-600/30">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Zap className="w-5 h-5 text-yellow-300" />
        <span className="font-bold text-sm uppercase tracking-wide">Temps limité</span>
        <Zap className="w-5 h-5 text-yellow-300" />
      </div>
      
      <div className="text-center">
        <p className="text-sm mb-3 opacity-90">
          Les candidatures se ferment dans :
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
            <div className="text-2xl font-bold font-mono">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-xs opacity-80">heures</div>
          </div>
          
          <div className="text-2xl font-bold opacity-60">:</div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
            <div className="text-2xl font-bold font-mono">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-xs opacity-80">minutes</div>
          </div>
          
          <div className="text-2xl font-bold opacity-60">:</div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
            <div className="text-2xl font-bold font-mono text-yellow-300">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs opacity-80">secondes</div>
          </div>
        </div>
        
        <p className="text-xs mt-3 opacity-75">
          ⚡ Ne rate pas cette opportunité unique !
        </p>
      </div>
    </div>
  );
};
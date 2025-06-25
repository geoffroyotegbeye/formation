import React from 'react';
import { Play } from 'lucide-react';

// Import des images locales
import Media1 from '../../assets/images/Média1.jpeg';
import Media2 from '../../assets/images/Média.jpeg';

interface MediaTestimonyProps {
  className?: string;
}

export const MediaTestimony: React.FC<MediaTestimonyProps> = ({ className = '' }) => {
  // Données des médias avec les captures WhatsApp
  const mediaItems = [
    {
      type: 'image',
      src: Media1,
      alt: 'Capture WhatsApp 1',
      title: 'Témoignage étudiant 1',
      description: 'Retour positif sur la formation'
    },
    {
      type: 'image',
      src: Media2,
      alt: 'Capture WhatsApp 2',
      title: 'Témoignage étudiant 2',
      description: 'Retour sur l\'expérience de formation'
    },
    {
      type: 'video',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      poster: Media1, // Utilisation d'une des images comme poster pour la vidéo
      alt: 'Témoignage vidéo',
      title: 'Témoignage vidéo',
      description: 'Découvrez les retours en vidéo'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {mediaItems.map((item, index) => (
        <div key={index} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="aspect-[9/16] bg-slate-100 relative rounded-lg overflow-hidden">
            {item.type === 'video' ? (
              <>
                <video
                  className="w-full h-full object-cover"
                  poster={item.poster}
                  controls
                >
                  <source src={item.src} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-orange-500 ml-1" />
                  </div>
                </div>
              </>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <p className="font-semibold text-sm">{item.title}</p>
            {item.description && (
              <p className="text-xs opacity-90 mt-1">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaTestimony;

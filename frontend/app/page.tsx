"use client"
import { useState } from 'react';
import { CardProduct } from './components/cardProduct';

export default function Home() {
  const [isHorizontal, setIsHorizontal] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="mb-10">L&apos;outil digital à la carte pour les hébergements</h2>
      
      <div className="w-[95%] flex flex-row justify-end mb-6">
        <button 
          onClick={() => setIsHorizontal(!isHorizontal)}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          {isHorizontal ? 'Mosaïque' : 'Liste'}
        </button>
      </div>

      {/* Les cartes */}
      <div className="flex flex-row flex-wrap gap-x-6 gap-y-10">
        <CardProduct
          isHorizontal={isHorizontal} // On passe la prop isHorizontal ici
          priceOption="4,99€ / mois"
          titleCard="Gestion planning du personnel"
          descriptionCard="Petite description"
          titleBtn="En savoir +"
          srcPic="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
        />
        <CardProduct
          isHorizontal={isHorizontal}
          priceOption="9,99€ / mois"
          titleCard="Gestion de comptabilité"
          descriptionCard="Petite description"
          titleBtn="En savoir +"
          srcPic="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <CardProduct
          isHorizontal={isHorizontal}
          priceOption="4,99€ / mois"
          titleCard="Communication interne"
          descriptionCard="Petite description"
          titleBtn="En savoir +"
          srcPic="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <CardProduct
          isHorizontal={isHorizontal}
          priceOption="4,99€ / mois"
          titleCard="Gestion des Feedbacks clients"
          descriptionCard="Petite description"
          titleBtn="En savoir +"
          srcPic="https://www.hotelogix.com/images/solution-ota-list.jpg"
        />
      </div>
    </main>
  );
}

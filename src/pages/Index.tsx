import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ProductCatalog from '@/components/ProductCatalog';
import Delivery from '@/components/Delivery';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import CalculatorModal from '@/components/CalculatorModal';
import CallModal from '@/components/CallModal';

const Index = () => {
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);

  // Добавление класса visible к элементам при скролле
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Наблюдение за элементами с классом fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header onCallModalOpen={() => setCallModalOpen(true)} />
      
      <main>
        <Hero onCalculatorOpen={() => setCalculatorModalOpen(true)} />
        <About />
        <ProductCatalog onCalculatorOpen={() => setCalculatorModalOpen(true)} />
        <Delivery onCalculatorOpen={() => setCalculatorModalOpen(true)} />
        <Reviews />
      </main>
      
      <Footer />

      {/* Модальные окна */}
      <CalculatorModal 
        isOpen={calculatorModalOpen} 
        onClose={() => setCalculatorModalOpen(false)} 
      />
      <CallModal 
        isOpen={callModalOpen} 
        onClose={() => setCallModalOpen(false)} 
      />
    </div>
  );
};

export default Index;

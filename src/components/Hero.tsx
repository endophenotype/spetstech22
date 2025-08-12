import { useState, useEffect } from 'react';
import { ArrowDown, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-truck.jpg';

interface HeroProps {
  onCalculatorOpen: () => void;
}

const Hero = ({ onCalculatorOpen }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(46, 58, 89, 0.7), rgba(244, 164, 96, 0.4)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Контент */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Качественный песок и сыпучие материалы 
            <span className="text-primary block mt-2">с доставкой</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            От карьера до вашего объекта — быстро и надёжно
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onCalculatorOpen}
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-button text-lg px-8 py-6"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Рассчитать стоимость
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToNext}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6"
            >
              Узнать больше
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Индикатор прокрутки */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce-slow"></div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20"></div>
    </section>
  );
};

export default Hero;
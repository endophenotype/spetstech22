import { useEffect, useRef, useState } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import granite from '@/assets/granite.jpg';
import gravel from '@/assets/gravel.jpg';
import keramzit from '@/assets/keramzit.jpg';
import marble from '@/assets/marble.jpg';
import sand from '@/assets/sand.jpg';
import soil from '@/assets/soil.jpg';

interface ProductCatalogProps {
  onCalculatorOpen: () => void;
}

const ProductCatalog = ({ onCalculatorOpen }: ProductCatalogProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      title: 'Песок',
      variants: ['Карьерный', 'Речной', 'Сеянный'],
      price: '850',
      image: sand
    },
    {
      title: 'Мраморная крошка',
      variants: ['Крошка белая', 'Крошка чёрная', 'Крошка цветная'],
      price: '1 250',
      image: marble
    },
    {
      title: 'Гравий',
      variants: ['Фракция 5-20 мм', 'Фракция 20-40 мм', 'Фракция 40-70 мм'],
      price: '600',
      image: gravel
    },
    {
      title: 'Щебень',
      variants: ['Гранитный', 'Гравийный', 'Известняковый'],
      price: '1 250',
      image: granite
    },
    {
      title: 'Керамзит',
      variants: ['Фракция 0-5 мм', 'Фракция 5-10 мм', 'Фракция 10-20 мм'],
      price: '600',
      image: keramzit
    },
    {
      title: 'Грунт',
      variants: ['Почвогрунт', 'Планировочный', 'Растительный'],
      price: '850',
      image: soil
    }
  ];

  return (
    <section
      id="catalog"
      ref={sectionRef}
      className="py-20 bg-subtle-gradient relative"
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-6">
            Каталог материалов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Широкий ассортимент качественных сыпучих материалов для любых
            строительных задач
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <div
              key={index}
              className={`bg-card rounded-lg shadow-card hover:shadow-soft transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-accent mb-3">
                  {product.title}
                </h3>

                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                  {product.variants.map((variant, vIndex) => (
                    <li key={vIndex} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {variant}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-heading font-bold text-primary">
                    {product.price} ₽
                    <span className="text-sm text-muted-foreground">/м³</span>
                  </div>
                  <Button
                    onClick={onCalculatorOpen}
                    size="sm"
                    className="bg-secondary hover:bg-secondary-hover text-secondary-foreground"
                  >
                    <Calculator className="w-4 h-4 mr-1" />
                    Заказать
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="bg-primary/5 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-heading font-bold text-accent mb-4">
              Быстрая доставка по области
            </h3>
            <p className="text-muted-foreground mb-6">
              Доставляем материалы в течение дня по Бийску. Собственный автопарк
              самосвалов от 10 до 25 тонн.
            </p>
            <Button
              onClick={onCalculatorOpen}
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-button"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Рассчитать доставку
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
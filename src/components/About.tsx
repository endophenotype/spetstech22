import { useEffect, useRef, useState } from 'react';
import { Shield, Truck, Clock, Award } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const advantages = [
    {
      icon: Shield,
      title: "Гарантия качества",
      description: "Все материалы соответствуют ГОСТ",
    },
    {
      icon: Truck,
      title: "Цены от производителя",
      description: "Прямые поставки с карьеров без посредников",
    },
    {
      icon: Clock,
      title: "Быстрая доставка",
      description: "Работаем с 8:00 до 20:00, доставляем в удобное время",
    },
    {
      icon: Award,
      title: "Опыт с 2023 года",
      description: "Надёжный партнёр для строительных компаний",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sand-texture relative"
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-6">
            О компании Спецтех22
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Мы специализируемся на поставках высококачественных сыпучих
            материалов для строительства. Собственный автопарк и прямые договоры
            с карьерами позволяют нам предлагать лучшие цены и гарантировать
            своевременную доставку.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className={`text-center p-6 bg-card rounded-lg shadow-card hover:shadow-soft transition-all duration-500 transform hover:scale-105 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-accent mb-3">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Статистика */}
        <div
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {[
            { number: "500+", label: "Довольных клиентов" },
            { number: "10 000+", label: "Тонн материалов" },
            { number: "с 8:00 до 20:00", label: "Работаем без выходных" },
            { number: "100%", label: "Гарантия качества" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
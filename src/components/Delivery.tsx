import { useEffect, useRef, useState } from 'react';
import { Truck, MapPin, Clock, Shield, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface DeliveryProps {
  onCalculatorOpen: () => void;
}

const Delivery = ({ onCalculatorOpen }: DeliveryProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: isMobile ? 0.1 : 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  const deliveryFeatures = [
    {
      icon: Truck,
      title: "Собственный автопарк",
      description: "Самосвалы от 10 до 25 тонн для любых объёмов заказа",
    },
    {
      icon: Clock,
      title: "Быстрая доставка",
      description: "Работаем с 8:00 до 20:00, доставка в удобное время",
    },
    {
      icon: MapPin,
      title: "По Бийску",
      description: "Доставляем материалы в радиусе 100 км от Бийска",
    },
    {
      icon: Shield,
      title: "Гарантия качества",
      description: "Бережная транспортировка и сохранность груза",
    },
  ];

  const priceZones = [
    { zone: "До 30 км от Бийска", price: "2500-3500", time: "2-4 часа" },
    { zone: "30-60 км от Бийска", price: "3500-5000", time: "3-5 часов" },
    { zone: "60-100 км от Бийска", price: "5000-7500", time: "4-6 часов" },
  ];

  return (
    <section
      id="delivery"
      ref={sectionRef}
      className="py-20 bg-background relative"
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-6">
            Доставка материалов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Быстрая и надёжная доставка сыпучих материалов собственным
            автопарком по Бийску
          </p>
        </div>

        {/* Преимущества доставки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {deliveryFeatures.map((feature, index) => {
            const Icon = feature.icon;
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
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-accent mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Зоны доставки */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <h3 className="text-2xl font-heading font-bold text-accent text-center mb-8">
            Тарифы на доставку
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {priceZones.map((zone, index) => (
              <div
                key={index}
                className="bg-card rounded-lg shadow-card p-6 text-center hover:shadow-soft transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading font-bold text-accent mb-2">
                  {zone.zone}
                </h4>
                <p className="text-2xl font-heading font-bold text-primary mb-2">
                  {zone.price} ₽
                </p>
                <p className="text-sm text-muted-foreground">
                  Время доставки: {zone.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Информация о доставке */}
        <div
          className={`bg-muted rounded-lg p-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-heading font-bold text-accent mb-6">
                Как мы работаем
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent mb-1">
                      Приём заявки
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Звоните или оставляйте заявку на сайте
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent mb-1">
                      Расчёт и согласование
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Рассчитываем стоимость и согласовываем время доставки
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent mb-1">
                      Загрузка и доставка
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Загружаем материал с карьера и доставляем на объект
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent mb-1">
                      Разгрузка и оплата
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Разгружаем материал в указанном месте, принимаем оплату
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-primary/5 rounded-lg p-6 mb-6">
                <h4 className="font-heading font-bold text-accent mb-4">
                  Бесплатный расчёт стоимости
                </h4>
                <p className="text-muted-foreground mb-6">
                  Укажите материал, объём и адрес доставки — мы рассчитаем
                  точную стоимость
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

              <div className="text-sm text-muted-foreground space-y-2">
                <p>📞 Звоните: +7 (901) 645-00-00</p>
                <p>⏰ Работаем ежедневно</p>
                <p>🚛 Доставка материалов с 8:00 до 20:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
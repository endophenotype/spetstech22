import { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
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

  const reviews = [
    {
      name: 'Андрей Петров',
      company: 'ООО "СтройТех"',
      rating: 5,
      text: 'Отличное качество песка, доставили точно в срок. Водитель помог с разгрузкой в удобном месте. Цены реально ниже, чем у конкурентов. Обязательно обратимся ещё!',
      project: 'Фундамент частного дома'
    },
    {
      name: 'Елена Смирнова',
      company: 'ИП Смирнова',
      rating: 5,
      text: 'Заказывали щебень для дорожки на даче. Менеджер всё подробно объяснил, помог рассчитать нужное количество. Материал качественный, доставка быстрая.',
      project: 'Садовые дорожки'
    },
    {
      name: 'Михаил Козлов',
      company: 'СК "Монолит"',
      rating: 5,
      text: 'Работаем с Спецтех-22 уже полгода. Всегда качественные материалы, никаких задержек с доставкой. Особенно нравится, что можно заказать материал даже ночью.',
      project: 'Многоэтажное строительство'
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 5000); // автоматическое переключение каждые 5 секунд
    return () => clearInterval(interval);
  });

  return (
    <section
      id="reviews"
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
            Отзывы наших клиентов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Более 500 довольных клиентов доверяют нам поставку строительных
            материалов
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="relative">
            {/* Слайдер отзывов */}
            <div className="bg-card rounded-lg shadow-card p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-6 left-6">
                <Quote className="w-12 h-12 text-primary/20" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < reviews[currentReview].rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                  "{reviews[currentReview].text}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div>
                    <cite className="text-lg font-heading font-bold text-accent not-italic">
                      {reviews[currentReview].name}
                    </cite>
                    <p className="text-sm text-muted-foreground">
                      {reviews[currentReview].company}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      Проект: {reviews[currentReview].project}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevReview}
                      className="rounded-full w-10 h-10 p-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextReview}
                      className="rounded-full w-10 h-10 p-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Индикаторы */}
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentReview === index
                      ? "bg-primary scale-125"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Статистика внизу */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {[
            { number: "500+", label: "Довольных клиентов", icon: "👥" },
            { number: "4.9", label: "Средняя оценка", icon: "⭐" },
            { number: "98%", label: "Повторных заказов", icon: "🔄" },
            {
              number: "с 8:00 до 20:00",
              label: "Поддержка клиентов",
              icon: "📞",
            },
          ].map((stat, index) => (
            <div key={index} className="text-center bg-card/50 rounded-lg p-4">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1">
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

export default Reviews;
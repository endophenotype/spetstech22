import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import logoTruck from '@/assets/logo-truck.png';

const Footer = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [copyrightModalOpen, setCopyrightModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer id="contacts" className="bg-accent text-accent-foreground relative">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* О компании */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src={logoTruck} 
                  alt="Спецтех-22 логотип" 
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
                <div>
                  <h3 className="text-xl font-heading font-bold">Спецтех-22</h3>
                  <p className="text-sm text-accent-foreground/80">Сыпучие материалы</p>
                </div>
              </div>
              <p className="text-accent-foreground/80 text-sm leading-relaxed">
                Поставки качественных строительных материалов с собственным автопарком. 
                Работаем с 2023 года, обслужили более 500 клиентов.
              </p>
            </div>

            {/* Контакты */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">Контакты</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">+7 (901) 645-00-00</p>
                    <p className="text-sm text-accent-foreground/80">Основной номер</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">speczteh22@yandex.ru</p>
                    <p className="text-sm text-accent-foreground/80">Email для заявок</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">г. Барнаул</p>
                    <p className="text-sm text-accent-foreground/80">Алтайский край</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Режим работы */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">Режим работы</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Ежедневно</p>
                    <p className="text-sm text-accent-foreground/80">8:00 - 20:00</p>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-sm font-medium text-primary-foreground">
                    📞 Приём звонков и доставка материалов 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Услуги */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">Наши услуги</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Поставка песка и щебня
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Доставка сыпучих материалов
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Консультации по выбору
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Расчёт объёмов
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Срочная доставка
                </li>
              </ul>
            </div>
          </div>

          {/* Нижняя часть */}
          <div className="border-t border-accent-foreground/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-accent-foreground/70">
                © 2023 Спецтех-22. Все права защищены.{' '}
                <button 
                  onClick={() => setCopyrightModalOpen(true)}
                  className="text-primary hover:underline"
                >
                  Подробнее
                </button>
              </div>
              <div className="flex space-x-6 text-sm">
                <button 
                  onClick={() => setPrivacyModalOpen(true)}
                  className="text-accent-foreground/70 hover:text-primary transition-colors"
                >
                  Политика конфиденциальности
                </button>
                <span className="text-accent-foreground/70">
                  Сделано с ❤️ для строителей
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка наверх */}
        <Button
          onClick={scrollToTop}
          size="sm"
          className="scroll-to-top visible bg-primary hover:bg-primary-hover text-primary-foreground shadow-button"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      </footer>

      {/* Модальные окна */}
      <Dialog open={privacyModalOpen} onOpenChange={setPrivacyModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Политика конфиденциальности</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>
              Настоящая Политика конфиденциальности регулирует порядок обработки и использования 
              персональных данных пользователей сайта компании "Спецтех-22".
            </p>
            <h4 className="font-bold">1. Сбор информации</h4>
            <p>
              Мы собираем только ту информацию, которую вы предоставляете добровольно: 
              имя, телефон, email, адрес доставки.
            </p>
            <h4 className="font-bold">2. Использование информации</h4>
            <p>
              Персональные данные используются исключительно для обработки заказов, 
              связи с клиентами и улучшения качества обслуживания.
            </p>
            <h4 className="font-bold">3. Защита данных</h4>
            <p>
              Мы принимаем все необходимые меры для защиты ваших персональных данных 
              от несанкционированного доступа и использования.
            </p>
            <h4 className="font-bold">4. Контакты</h4>
            <p>
              По вопросам обработки персональных данных обращайтесь: speczteh22@yandex.ru
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={copyrightModalOpen} onOpenChange={setCopyrightModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Об авторских правах</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>
              Все материалы данного сайта, включая тексты, изображения, дизайн и логотипы, 
              являются объектами авторского права и принадлежат компании "Спецтех-22".
            </p>
            <p>
              Использование материалов сайта без письменного разрешения правообладателя запрещено.
            </p>
            <p>
              За нарушение авторских прав предусмотрена ответственность в соответствии 
              с действующим законодательством Российской Федерации.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
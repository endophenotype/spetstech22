import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoTruck from '@/assets/logo-truck.png';

interface HeaderProps {
  onCallModalOpen: () => void;
}

const Header = ({ onCallModalOpen }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'hero', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'delivery', label: 'Доставка' },
    { id: 'contacts', label: 'Контакты' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-sm shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <img
              src={logoTruck}
              alt="Спецтех22 логотип"
              className="w-12 h-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1
                className={`text-xl font-heading font-bold ${
                  isScrolled ? "text-accent" : "text-white"
                }`}
              >
                Спецтех22
              </h1>
              <p
                className={`text-xs  ${
                  isScrolled ? "text-muted-foreground" : "text-white"
                }`}
              >
                Сыпучие материалы
              </p>
            </div>
          </div>

          {/* Десктопное меню */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Кнопка звонка и мобильное меню */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={onCallModalOpen}
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-button hidden sm:flex"
            >
              <Phone className="w-4 h-4 mr-2" />
              Заказать звонок
            </Button>

            {/* Мобильное меню кнопка */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-border bg-card/95 backdrop-blur-sm rounded-lg">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors font-medium rounded-md"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={onCallModalOpen}
                variant="default"
                size="sm"
                className="mx-4 mt-2 bg-primary hover:bg-primary-hover text-primary-foreground shadow-button"
              >
                <Phone className="w-4 h-4 mr-2" />
                Заказать звонок
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
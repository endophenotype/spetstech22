import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { validatePhone, validateNumeric, sanitizeTextInput } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calculator, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorModal = ({ isOpen, onClose }: CalculatorModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    material: '',
    volume: '',
    address: '',
    phone: '',
    name: ''
  });

  const materials = [
    { value: 'sand', label: 'Песок', price: 850 },
    { value: 'marble', label: 'Мраморная крошка', price: 1250 },
    { value: 'gravel', label: 'Гравий', price: 600 },
    { value: 'crushed-stone', label: 'Щебень', price: 1250 },
    { value: 'expanded-clay', label: 'Керамзит', price: 600 },
    { value: 'soil', label: 'Грунт', price: 850 }
  ];

  const selectedMaterial = materials.find(m => m.value === formData.material);
  const materialCost = selectedMaterial && formData.volume ? 
    selectedMaterial.price * parseFloat(formData.volume) : 0;
  const deliveryCostDisplay =
    "Рассчитаем стоимость доставки и сообщим вам по телефону";
  const totalCostDisplay = materialCost.toLocaleString() + " ₽ + стоимость доставки";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.material || !formData.volume || !formData.address || !formData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    // Validate phone number
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный номер телефона",
        variant: "destructive"
      });
      return;
    }

    // Validate volume
    const volumeValidation = validateNumeric(formData.volume, 0.1, 1000);
    if (!volumeValidation.isValid) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный объём (от 0.1 до 1000 м³)",
        variant: "destructive"
      });
      return;
    }

    try {
      const selectedMaterial = materials.find(m => m.value === formData.material);
      const materialLabel = selectedMaterial ? selectedMaterial.label : '';
      const materialCost = selectedMaterial && formData.volume ?
        selectedMaterial.price * parseFloat(formData.volume) : 0;
      const totalCost = materialCost.toLocaleString() + " ₽ + стоимость доставки";

      const response = await fetch('/api/send-calculator-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          material: materialLabel,
          volume: formData.volume + " м³",
          totalCost: totalCost
        }),
      });

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в течение 15 минут для уточнения деталей заказа.",
        });
        onClose();
        setFormData({
          material: '',
          volume: '',
          address: '',
          phone: '',
          name: ''
        });
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить заявку. Пожалуйста, попробуйте еще раз.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center font-heading">
            <Calculator className="w-5 h-5 mr-2 text-primary" />
            Калькулятор стоимости
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="material" className="text-sm font-medium text-foreground">
              Материал *
            </Label>
            <Select 
              value={formData.material} 
              onValueChange={(value) => setFormData({...formData, material: value})}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите материал" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((material) => (
                  <SelectItem key={material.value} value={material.value}>
                    {material.label} - {material.price} ₽/м³
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="volume" className="text-sm font-medium text-foreground">
              Объём (м³) *
            </Label>
            <Input
              id="volume"
              type="number"
              step="0.1"
              min="1"
              placeholder="Введите объём"
              value={formData.volume}
              onChange={(e) => setFormData({...formData, volume: e.target.value})}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium text-foreground">
              Адрес доставки *
            </Label>
            <Textarea
              id="address"
              placeholder="Укажите точный адрес доставки"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: sanitizeTextInput(e.target.value)})}
              className="w-full"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Ваше имя
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Как к вам обращаться?"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: sanitizeTextInput(e.target.value)})}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">
              Телефон *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full"
            />
          </div>

          {/* Расчёт стоимости */}
          {(selectedMaterial && formData.volume) && (
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <h4 className="font-heading font-bold text-accent mb-2">Расчёт стоимости:</h4>
              <div className="flex justify-between text-sm">
                <span>Материал ({formData.volume} м³):</span>
                <span className="font-medium">{materialCost.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center pr-[10px]">
                  <Truck className="w-4 h-4 mr-1" />
                  Доставка:
                </span>
                <span className="font-medium">{deliveryCostDisplay}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-heading font-bold text-primary">
                <span>Итого:</span>
                <span>{totalCostDisplay}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              Заказать
            </Button>
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          * Стоимость доставки рассчитывается индивидуально в зависимости от расстояния
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;
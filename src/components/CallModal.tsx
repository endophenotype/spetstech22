import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { validatePhone, sanitizeTextInput } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallModal = ({ isOpen, onClose }: CallModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    question: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите ваше имя и телефон",
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

    try {
      const response = await fetch('/api/send-call-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Заявка на звонок принята!",
          description: "Мы перезвоним вам в течение 15 минут в рабочее время.",
        });
        onClose();
        setFormData({
          name: '',
          phone: '',
          preferredTime: '',
          question: ''
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center font-heading">
            <Phone className="w-5 h-5 mr-2 text-primary" />
            Заказать звонок
          </DialogTitle>
        </DialogHeader>

        <div className="bg-primary/5 rounded-lg p-4 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            Рабочее время: ежедневно с 8:00 до 20:00
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Ваше имя *
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

          <div>
            <Label htmlFor="preferredTime" className="text-sm font-medium text-foreground">
              Удобное время для звонка
            </Label>
            <Input
              id="preferredTime"
              type="text"
              placeholder="Например: сегодня после 18:00"
              value={formData.preferredTime}
              onChange={(e) => setFormData({...formData, preferredTime: sanitizeTextInput(e.target.value)})}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="question" className="text-sm font-medium text-foreground">
              Ваш вопрос (необязательно)
            </Label>
            <Textarea
              id="question"
              placeholder="Кратко опишите, что вас интересует"
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: sanitizeTextInput(e.target.value)})}
              className="w-full"
              rows={3}
            />
          </div>

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
              <Phone className="w-4 h-4 mr-2" />
              Заказать звонок
            </Button>
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Звонки принимаются ежедневно с 8:00 до 20:00. 
          В нерабочее время перезвоним в первой половине следующего дня.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;
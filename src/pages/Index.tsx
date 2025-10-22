import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: '1',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Спасибо за ответ! ✨",
      description: "Мы рады, что вы сможете разделить с нами этот волшебный день!",
    });
  };

  const schedule = [
    { time: '15:00', event: 'Встреча гостей', icon: 'Heart' },
    { time: '15:30', event: 'Церемония в сосновом лесу', icon: 'Trees' },
    { time: '16:30', event: 'Фотосессия среди заснеженных деревьев', icon: 'Camera' },
    { time: '17:30', event: 'Праздничный ужин', icon: 'Sparkles' },
    { time: '19:00', event: 'Первый танец', icon: 'Music' },
    { time: '20:00', event: 'Веселье до утра', icon: 'Star' }
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-secondary/20" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <Icon name="Sparkles" className="mx-auto text-secondary animate-float" size={48} />
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
            Зимняя сказка
          </h1>
          
          <div className="text-2xl md:text-4xl text-muted-foreground mb-8 space-y-2">
            <p>Приглашаем вас разделить с нами</p>
            <p>этот волшебный день</p>
          </div>

          <div className="inline-block bg-card/80 backdrop-blur-sm rounded-lg px-8 py-6 mb-8">
            <p className="text-xl md:text-2xl text-accent font-semibold">
              15 января 2025
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              Сосновый лес у озера
            </p>
          </div>

          <img 
            src="https://v3b.fal.media/files/b/rabbit/wjpVIpoooQ2Xu7by27hiF_output.png"
            alt="Зимний лес в стиле Гибли"
            className="rounded-2xl shadow-2xl max-w-2xl w-full mx-auto"
          />
        </div>
      </section>

      <section id="schedule" className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-12 animate-fade-in">
            Программа дня
          </h2>
          
          <div className="space-y-6">
            {schedule.map((item, index) => (
              <Card 
                key={index} 
                className="animate-fade-in hover:shadow-lg transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <div className="bg-secondary/20 rounded-full p-3">
                    <Icon name={item.icon as any} className="text-secondary" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{item.time}</CardTitle>
                    <CardDescription className="text-lg">{item.event}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8 animate-fade-in">
            Место проведения
          </h2>
          
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Icon name="MapPin" className="text-secondary" size={28} />
                Сосновая роща у Серебряного озера
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Адрес: Московская область, д. Зимняя Сказка, ул. Лесная, 1
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="Car" className="text-accent mt-1" size={20} />
                  <div className="text-left">
                    <p className="font-semibold">На автомобиле:</p>
                    <p className="text-muted-foreground">40 км от МКАД по Новорижскому шоссе</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Bus" className="text-accent mt-1" size={20} />
                  <div className="text-left">
                    <p className="font-semibold">Трансфер:</p>
                    <p className="text-muted-foreground">Организуем для всех гостей от м. Тушинская в 14:00</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-4 mt-4">
                <p className="text-accent font-semibold flex items-center justify-center gap-2">
                  <Icon name="Snowflake" size={20} />
                  Не забудьте тёплую одежду и удобную обувь!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="rsvp" className="py-20 px-4 bg-card/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-8 animate-fade-in">
            Подтвердите присутствие
          </h2>
          
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Будем рады видеть вас!
              </CardTitle>
              <CardDescription className="text-center text-base">
                Пожалуйста, ответьте до 25 декабря 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    placeholder="Введите ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Сможете ли вы присутствовать?</Label>
                  <RadioGroup
                    value={formData.attending}
                    onValueChange={(value) => setFormData({ ...formData, attending: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="font-normal cursor-pointer">
                        Да, с радостью приду!
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="font-normal cursor-pointer">
                        К сожалению, не смогу
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.attending === 'yes' && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="guests">Количество гостей</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Пожелания или комментарии</Label>
                  <Textarea
                    id="message"
                    placeholder="Особые пожелания по питанию, музыке..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full text-lg" size="lg">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить ответ
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 text-center bg-accent/5">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-lg text-muted-foreground">
            С любовью ждём вас в нашей зимней сказке
          </p>
          <div className="flex items-center justify-center gap-2 text-accent">
            <Icon name="Heart" size={24} className="animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground">
            По всем вопросам: +7 (XXX) XXX-XX-XX
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

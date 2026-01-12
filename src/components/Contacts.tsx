import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Contacts() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
  };

  const contactInfo = [
    {
      icon: 'Mail',
      title: 'Email',
      value: 'info@virtualmuseum.ru',
      link: 'mailto:info@virtualmuseum.ru'
    },
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '+7 (495) 123-45-67',
      link: 'tel:+74951234567'
    },
    {
      icon: 'MapPin',
      title: 'Адрес',
      value: 'г. Москва, ул. Музейная, д. 1',
      link: '#'
    }
  ];

  return (
    <section id="contacts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4">Контакты</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Свяжитесь с нами для сотрудничества или экскурсий
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-bold mb-6">Напишите нам</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  placeholder="Ваше имя" 
                  required 
                  className="h-12"
                />
              </div>
              
              <div>
                <Input 
                  type="email" 
                  placeholder="Email" 
                  required 
                  className="h-12"
                />
              </div>
              
              <div>
                <Input 
                  placeholder="Тема сообщения" 
                  required 
                  className="h-12"
                />
              </div>
              
              <div>
                <Textarea 
                  placeholder="Ваше сообщение" 
                  required 
                  className="min-h-32 resize-none"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full">
                Отправить сообщение
                <Icon name="Send" size={18} className="ml-2" />
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-6 animate-fade-in">Наши контакты</h3>
            
            {contactInfo.map((contact, index) => (
              <Card 
                key={index}
                className="hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <a 
                    href={contact.link}
                    className="flex items-start gap-4 hover:text-primary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={contact.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{contact.title}</h4>
                      <p className="text-muted-foreground">{contact.value}</p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-primary text-primary-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-2">Время работы</h4>
                <p className="mb-1">Виртуальный музей открыт круглосуточно</p>
                <p className="text-sm opacity-90">Поддержка: Пн-Пт, 9:00 - 18:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

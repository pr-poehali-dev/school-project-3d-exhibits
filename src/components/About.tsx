import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function About() {
  const features = [
    {
      icon: 'Sparkles',
      title: 'Интерактивность',
      description: 'Вращайте и изучайте каждый экспонат в 360°'
    },
    {
      icon: 'Zap',
      title: 'Доступность',
      description: 'Музей открыт 24/7 из любой точки мира'
    },
    {
      icon: 'BookOpen',
      title: 'Образование',
      description: 'Подробные описания и исторический контекст'
    },
    {
      icon: 'Heart',
      title: 'Сохранение',
      description: 'Цифровое сохранение культурного наследия'
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl font-bold mb-6">О Виртуальном Музее</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Наш виртуальный музей — это инновационный проект, объединяющий культурное наследие 
              с современными технологиями. Мы создали уникальную платформу, где каждый может 
              прикоснуться к истории через интерактивные 3D модели.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Здесь представлены экспонаты из разных эпох и культур — от древних цивилизаций 
              до средневековья. Каждый артефакт тщательно оцифрован и снабжён подробным описанием, 
              позволяя вам стать настоящим исследователем прошлого.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="font-semibold">1000+ посетителей</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full">
                <Icon name="Box" size={20} className="text-primary" />
                <span className="font-semibold">500+ экспонатов</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full">
                <Icon name="Award" size={20} className="text-primary" />
                <span className="font-semibold">20+ коллекций</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name={feature.icon as any} size={24} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Exhibition() {
  const collections = [
    {
      icon: 'Landmark',
      title: 'Античная коллекция',
      description: 'Артефакты Древней Греции и Рима',
      count: '150+ экспонатов'
    },
    {
      icon: 'Pyramid',
      title: 'Египетский зал',
      description: 'Сокровища цивилизации Нила',
      count: '200+ экспонатов'
    },
    {
      icon: 'Shield',
      title: 'Средневековая коллекция',
      description: 'Оружие и доспехи рыцарей',
      count: '180+ экспонатов'
    },
    {
      icon: 'Palette',
      title: 'Искусство Ренессанса',
      description: 'Шедевры эпохи Возрождения',
      count: '120+ экспонатов'
    },
    {
      icon: 'Globe',
      title: 'Этнография',
      description: 'Культуры народов мира',
      count: '300+ экспонатов'
    },
    {
      icon: 'Gem',
      title: 'Драгоценности',
      description: 'Коллекция ювелирных изделий',
      count: '90+ экспонатов'
    }
  ];

  return (
    <section id="exhibition" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4">Наши Экспозиции</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Погрузитесь в историю через разнообразные тематические коллекции
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={collection.icon as any} size={32} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-3">{collection.title}</h3>
                <p className="text-muted-foreground text-center mb-4">{collection.description}</p>
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    {collection.count}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

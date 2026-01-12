import { Card, CardContent } from '@/components/ui/card';

export default function History() {
  const timeline = [
    {
      year: '1920',
      title: 'Основание музея',
      description: 'Открытие первой экспозиции в историческом здании на центральной площади города'
    },
    {
      year: '1965',
      title: 'Расширение коллекции',
      description: 'Получение уникальной коллекции древних артефактов из археологической экспедиции'
    },
    {
      year: '1998',
      title: 'Реставрация',
      description: 'Полная реконструкция здания с сохранением исторического облика'
    },
    {
      year: '2010',
      title: 'Цифровизация',
      description: 'Внедрение современных технологий и начало создания виртуальных экспозиций'
    },
    {
      year: '2025',
      title: '3D Музей',
      description: 'Запуск полностью интерактивной виртуальной галереи с 3D моделями'
    }
  ];

  return (
    <section id="history" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4">История Музея</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Более ста лет сохранения культурного наследия
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 md:left-1/2" />

            {timeline.map((event, index) => (
              <div 
                key={index}
                className={`relative mb-12 animate-fade-in ${
                  index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`flex items-start ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                    {event.year}
                  </div>
                  
                  <Card className={`flex-1 hover:shadow-lg transition-shadow ${
                    index % 2 === 0 ? 'ml-4 md:mr-12 md:ml-0' : 'ml-4'
                  }`}>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

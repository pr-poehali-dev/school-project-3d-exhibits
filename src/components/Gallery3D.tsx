import Model3D from './Model3D';

export default function Gallery3D() {
  const exhibits = [
    {
      id: 1,
      title: 'Древнегреческая амфора',
      description: 'Керамический сосуд с изящными узорами, использовавшийся для хранения вина и масла.',
      year: '5 век до н.э.',
      category: 'Античность',
      imageUrl: 'https://cdn.poehali.dev/projects/88839cf1-f15e-4964-9c56-42731f2414e4/files/0b98c013-fb49-434e-97a5-db347ed7d17c.jpg'
    },
    {
      id: 2,
      title: 'Египетский скарабей',
      description: 'Золотой амулет с иероглифами, символизирующий возрождение и защиту.',
      year: '1500-1200 до н.э.',
      category: 'Древний Египет',
      imageUrl: 'https://cdn.poehali.dev/projects/88839cf1-f15e-4964-9c56-42731f2414e4/files/4d159442-6f5e-4d16-88ee-b460fac31c17.jpg'
    },
    {
      id: 3,
      title: 'Рыцарский шлем',
      description: 'Средневековый боевой шлем с подвижным забралом из закалённой стали.',
      year: '15 век н.э.',
      category: 'Средневековье',
      imageUrl: 'https://cdn.poehali.dev/projects/88839cf1-f15e-4964-9c56-42731f2414e4/files/d7ba7b6c-4135-47b6-8cdc-5cd685434be2.jpg'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4">3D Галерея</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Интерактивная коллекция экспонатов. Вращайте модели для детального изучения.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exhibits.map((exhibit, index) => (
            <div 
              key={exhibit.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Model3D {...exhibit} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

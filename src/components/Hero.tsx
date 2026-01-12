import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full animate-pulse" />
        <div className="absolute bottom-40 right-20 w-48 h-48 border-2 border-primary rounded-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-primary animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 z-10 text-center animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 tracking-tight">
          Виртуальный Музей
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Откройте для себя уникальную коллекцию экспонатов в интерактивном 3D формате
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            onClick={() => scrollToSection('gallery')}
          >
            Открыть галерею
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            onClick={() => scrollToSection('about')}
          >
            Узнать больше
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={32} className="text-primary" />
      </div>
    </section>
  );
}

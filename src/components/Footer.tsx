import Icon from '@/components/ui/icon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Museum" size={32} />
              <span className="text-2xl font-bold">Виртуальный Музей</span>
            </div>
            <p className="opacity-80">
              Сохранение культурного наследия через инновационные технологии
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Разделы</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="#gallery" className="hover:opacity-100 transition-opacity">3D Галерея</a></li>
              <li><a href="#exhibition" className="hover:opacity-100 transition-opacity">Экспозиция</a></li>
              <li><a href="#history" className="hover:opacity-100 transition-opacity">История</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">О нас</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Социальные сети</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center opacity-80">
          <p>&copy; {currentYear} Виртуальный Музей. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

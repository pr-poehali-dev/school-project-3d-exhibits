import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Model3D from './Model3D';
import UploadModal from './UploadModal';

interface Exhibit {
  id: number;
  title: string;
  description: string;
  year: string;
  category: string;
  imageUrl: string;
}

export default function Gallery3D() {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const fetchExhibits = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/0e2b1805-9ffc-4fb3-9b6b-0a6a36903441');
      const data = await response.json();
      setExhibits(data.exhibits || []);
    } catch (error) {
      console.error('Failed to load exhibits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibits();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот экспонат?')) {
      return;
    }

    try {
      const response = await fetch(`https://functions.poehali.dev/0e2b1805-9ffc-4fb3-9b6b-0a6a36903441?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchExhibits();
      }
    } catch (error) {
      console.error('Failed to delete exhibit:', error);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4">3D Галерея</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Интерактивная коллекция экспонатов. Вращайте модели для детального изучения.
          </p>
          <Button 
            size="lg" 
            onClick={() => setUploadModalOpen(true)}
            className="hover:scale-105 transition-transform"
          >
            <Icon name="Plus" className="mr-2" size={20} />
            Добавить экспонат
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Icon name="Loader2" className="animate-spin text-primary" size={48} />
          </div>
        ) : exhibits.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="PackageOpen" className="mx-auto text-muted-foreground mb-4" size={64} />
            <p className="text-xl text-muted-foreground mb-4">Галерея пуста</p>
            <Button onClick={() => setUploadModalOpen(true)}>
              <Icon name="Plus" className="mr-2" size={18} />
              Добавить первый экспонат
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exhibits.map((exhibit, index) => (
              <div 
                key={exhibit.id} 
                className="animate-fade-in relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Model3D {...exhibit} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(exhibit.id)}
                >
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <UploadModal 
        open={uploadModalOpen} 
        onClose={() => setUploadModalOpen(false)}
        onSuccess={fetchExhibits}
      />
    </section>
  );
}

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UploadModal({ open, onClose, onSuccess }: UploadModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Ошибка',
          description: 'Размер файла не должен превышать 5 МБ',
          variant: 'destructive',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !image) {
      toast({
        title: 'Ошибка',
        description: 'Заполните название и загрузите изображение',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/0e2b1805-9ffc-4fb3-9b6b-0a6a36903441', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          year,
          category,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }

      toast({
        title: 'Успешно!',
        description: 'Экспонат добавлен в галерею',
      });

      setTitle('');
      setDescription('');
      setYear('');
      setCategory('');
      setImage(null);
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить экспонат',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">Добавить экспонат</DialogTitle>
          <DialogDescription>
            Загрузите изображение 3D модели и заполните информацию об экспонате
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="image">Изображение модели *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="image" className="cursor-pointer">
                {image ? (
                  <div className="space-y-2">
                    <img src={image} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                    <p className="text-sm text-muted-foreground">Нажмите, чтобы изменить</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Icon name="Upload" size={48} className="mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Нажмите для загрузки изображения
                    </p>
                    <p className="text-sm text-muted-foreground">JPG, PNG или WEBP (макс. 5 МБ)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Название *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Древнегреческая амфора"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Краткое описание экспоната..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Период</Label>
              <Input
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="5 век до н.э."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Античность"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={uploading}>
              Отмена
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Upload" className="mr-2" size={18} />
                  Добавить экспонат
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

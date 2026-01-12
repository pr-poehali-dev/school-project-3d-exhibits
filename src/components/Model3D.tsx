import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Model3DProps {
  title: string;
  description: string;
  year: string;
  category: string;
  imageUrl: string;
}

export default function Model3D({ title, description, year, category, imageUrl }: Model3DProps) {
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleMouseDown = () => {
    setIsRotating(true);
  };

  const handleMouseUp = () => {
    setIsRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRotating) {
      setRotation((prev) => prev + e.movementX);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in group">
      <div 
        className="relative h-80 bg-gradient-to-br from-secondary to-muted cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-100"
          style={{ transform: `perspective(1000px) rotateY(${rotation}deg)` }}
        >
          <img 
            src={imageUrl} 
            alt={title}
            className="h-64 w-auto object-contain drop-shadow-2xl"
            draggable={false}
          />
        </div>
        
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon name="RotateCw" size={20} className="text-primary" />
        </div>

        <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
          {category}
        </Badge>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">{year}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Icon name="MousePointer" size={16} className="mr-2" />
          <span>Нажмите и перетащите для вращения</span>
        </div>
      </div>
    </Card>
  );
}

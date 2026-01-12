-- Создание таблицы для хранения 3D моделей
CREATE TABLE IF NOT EXISTS exhibits (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    year VARCHAR(100),
    category VARCHAR(100),
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_exhibits_category ON exhibits(category);
CREATE INDEX idx_exhibits_created_at ON exhibits(created_at DESC);

-- Начальные данные (существующие экспонаты)
INSERT INTO exhibits (title, description, year, category, image_url) VALUES
('Древнегреческая амфора', 'Керамический сосуд с изящными узорами, использовавшийся для хранения вина и масла.', '5 век до н.э.', 'Античность', 'https://cdn.poehali.dev/projects/88839cf1-f15e-4964-9c56-42731f2414e4/files/0b98c013-fb49-434e-97a5-db347ed7d17c.jpg'),
('Египетский скарабей', 'Золотой амулет с иероглифами, символизирующий возрождение и защиту.', '1500-1200 до н.э.', 'Древний Египет', 'https://cdn.poehali.dev/projects/88839cf1-f15e-4964-9c56-42731f2414e4/files/4d159442-6f5e-4d16-88ee-b460fac31c17.jpg'),
('Рыцарский шлем', 'Средневековый боевой шлем с подвижным забралом из закалённой стали.', '15 век н.э.', 'Средневековье', 'https://cdn.poehali.dev/projects/88839cf1-f15e-4964-9c56-42731f2414e4/files/d7ba7b6c-4135-47b6-8cdc-5cd685434be2.jpg');

-- Добавление инструктора Станислава Зигадло

INSERT INTO bot_instructors (
  name, 
  style, 
  experience, 
  pass_rate, 
  photo_url, 
  specialty, 
  reviews_count, 
  rating,
  is_active
) VALUES (
  'Станислав Зигадло',
  'Инструктор по вождению, педагогический стаж 18 лет',
  '18 лет',
  '93%',
  '/stas-ready.png',
  'Профессиональная подготовка водителей. Автомобиль: Skoda Octavia',
  0,
  4.9,
  true
)
ON CONFLICT DO NOTHING;

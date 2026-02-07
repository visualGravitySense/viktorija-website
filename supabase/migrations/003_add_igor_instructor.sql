-- Добавление инструктора Игоря Нагорского

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
  'Игорь Нагорский',
  'Основатель и руководитель автошколы "Viktorija", опытный инструктор по вождению',
  'Многолетний опыт',
  '95%',
  '/igor-ready.png',
  'Основатель автошколы, профессиональная подготовка водителей',
  0,
  5.0,
  true
)
ON CONFLICT DO NOTHING;

-- Добавление отзывов от учеников

-- Отзыв 1: Tory West (общий отзыв о школе)
INSERT INTO bot_reviews (
  instructor_id,
  student_name,
  text,
  rating,
  is_approved
)
SELECT 
  i.id,
  'Tory West',
  'Very happy with the driving school! Qualified instructors, fair prices, always help, give advice and won''t abandon you! Many of my friends passed their driving tests at this driving school and are happy. I recommend it to everyone!',
  5,
  true
FROM bot_instructors i 
WHERE i.name = 'Игорь Нагорский'
LIMIT 1;

-- Отзыв 2: Dewid Weiss (отзыв об инструкторах Игорь и Иван)
INSERT INTO bot_reviews (
  instructor_id,
  student_name,
  text,
  rating,
  is_approved
)
SELECT 
  i.id,
  'Dewid Weiss',
  'Excellent driving school! I highly recommend instructors Igor and Ivan.',
  5,
  true
FROM bot_instructors i 
WHERE i.name = 'Игорь Нагорский'
LIMIT 1;

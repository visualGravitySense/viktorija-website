#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Анализ SEO сайта конкурента - Silver Autokool
"""

import importlib.util
import sys
import json
from datetime import datetime
import io

# Установка кодировки UTF-8 для Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Импорт модуля с дефисом в имени
spec = importlib.util.spec_from_file_location("ads_1", "ads-1.py")
ads_module = importlib.util.module_from_spec(spec)
sys.modules["ads_1"] = ads_module
spec.loader.exec_module(ads_module)

SEOAnalyzer = ads_module.SEOAnalyzer
SEOData = ads_module.SEOData

def print_seo_data(data: SEOData):
    """Красивый вывод SEO данных"""
    print("\n" + "="*70)
    print(f"АНАЛИЗ САЙТА: {data.url}")
    print("="*70)
    
    print(f"\n[TITLE]")
    print(f"   {data.title}")
    
    print(f"\n[META DESCRIPTION]")
    print(f"   {data.meta_description}")
    
    print(f"\n[H1 ТЕГИ] ({len(data.h1_tags)}):")
    for i, h1 in enumerate(data.h1_tags, 1):
        print(f"   {i}. {h1}")
    
    print(f"\n[H2 ТЕГИ] ({len(data.h2_tags)}):")
    for i, h2 in enumerate(data.h2_tags[:10], 1):  # Показываем первые 10
        print(f"   {i}. {h2}")
    if len(data.h2_tags) > 10:
        print(f"   ... и еще {len(data.h2_tags) - 10}")
    
    print(f"\n[ТОП КЛЮЧЕВЫЕ СЛОВА] (первые 20):")
    keywords_str = ", ".join(data.keywords[:20])
    print(f"   {keywords_str}")
    
    print(f"\n[СТАТИСТИКА]:")
    print(f"   Количество слов: {data.word_count}")
    print(f"   Внутренние ссылки: {data.internal_links}")
    print(f"   Внешние ссылки: {data.external_links}")
    print(f"   Изображения: {data.images_count}")
    print(f"   Изображения с alt-текстом: {data.images_with_alt} ({data.images_with_alt/data.images_count*100:.1f}%)" if data.images_count > 0 else "   Изображения с alt-текстом: 0")
    
    print("\n" + "="*70)

def save_report(data: SEOData, filename: str = "silverautokool_report.json"):
    """Сохранение отчета в JSON"""
    report = {
        "analysis_date": datetime.now().isoformat(),
        "site_url": data.url,
        "seo_data": {
            "url": data.url,
            "title": data.title,
            "meta_description": data.meta_description,
            "h1_tags": data.h1_tags,
            "h2_tags": data.h2_tags,
            "keywords": data.keywords,
            "word_count": data.word_count,
            "internal_links": data.internal_links,
            "external_links": data.external_links,
            "images_count": data.images_count,
            "images_with_alt": data.images_with_alt
        }
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"\n[ОТЧЕТ] Отчет сохранен в файл: {filename}")

def save_report_md(data: SEOData, filename: str = "silverautokool_report.md"):
    """Сохранение отчета в Markdown"""
    analysis_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    md_content = f"""# SEO Анализ сайта конкурента - Silver Autokool

**URL:** {data.url}  
**Дата анализа:** {analysis_date}

---

## 📄 Title

{data.title}

---

## 📝 Meta Description

{data.meta_description}

---

## 📊 H1 Теги ({len(data.h1_tags)})

"""
    
    if data.h1_tags:
        for i, h1 in enumerate(data.h1_tags, 1):
            md_content += f"{i}. {h1}\n"
    else:
        md_content += "*H1 теги не найдены*\n"
    
    md_content += f"""

---

## 📊 H2 Теги ({len(data.h2_tags)})

"""
    
    if data.h2_tags:
        for i, h2 in enumerate(data.h2_tags[:20], 1):  # Первые 20 H2 тегов
            md_content += f"{i}. {h2}\n"
        if len(data.h2_tags) > 20:
            md_content += f"\n*... и еще {len(data.h2_tags) - 20} H2 тегов*\n"
    else:
        md_content += "*H2 теги не найдены*\n"
    
    md_content += f"""

---

## 🔑 Топ ключевые слова

"""
    
    if data.keywords:
        keywords_per_line = 5
        for i in range(0, len(data.keywords), keywords_per_line):
            keywords_batch = data.keywords[i:i+keywords_per_line]
            md_content += f"{', '.join(f'**{kw}**' for kw in keywords_batch)}\n"
    else:
        md_content += "*Ключевые слова не найдены*\n"
    
    alt_percentage = (data.images_with_alt / data.images_count * 100) if data.images_count > 0 else 0
    
    md_content += f"""

---

## 📈 Статистика

| Параметр | Значение |
|----------|----------|
| **Количество слов** | {data.word_count} |
| **Внутренние ссылки** | {data.internal_links} |
| **Внешние ссылки** | {data.external_links} |
| **Изображения (всего)** | {data.images_count} |
| **Изображения с alt-текстом** | {data.images_with_alt} ({alt_percentage:.1f}%) |

---

## 📋 Детальная информация

### Все H1 теги

"""
    
    if data.h1_tags:
        for h1 in data.h1_tags:
            md_content += f"- {h1}\n"
    else:
        md_content += "*Нет H1 тегов*\n"
    
    md_content += f"""

### Все H2 теги

"""
    
    if data.h2_tags:
        for h2 in data.h2_tags:
            md_content += f"- {h2}\n"
    else:
        md_content += "*Нет H2 тегов*\n"
    
    md_content += f"""

### Все ключевые слова ({len(data.keywords)})

"""
    
    if data.keywords:
        md_content += ", ".join(data.keywords)
    else:
        md_content += "*Нет ключевых слов*\n"
    
    md_content += f"""

---

*Отчет сгенерирован автоматически*
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(md_content)
    
    print(f"[ОТЧЕТ] Отчет сохранен в файл: {filename}")

def main():
    """Основная функция анализа"""
    url = "https://silverautokool.ee/"
    
    print("[СТАРТ] Начинаем анализ сайта конкурента Silver Autokool...")
    print(f"[URL] {url}\n")
    
    # Инициализация анализатора
    analyzer = SEOAnalyzer()
    
    # Анализ главной страницы
    print("[ЗАГРУЗКА] Загружаем страницу...")
    data = analyzer.analyze_page(url)
    
    if data:
        # Вывод результатов
        print_seo_data(data)
        
        # Сохранение отчета в JSON и Markdown
        save_report(data, "silverautokool_report.json")
        save_report_md(data, "silverautokool_report.md")
        
        print("\n[УСПЕХ] Анализ завершен успешно!")
    else:
        print("\n[ОШИБКА] Не удалось проанализировать сайт")

if __name__ == "__main__":
    main()


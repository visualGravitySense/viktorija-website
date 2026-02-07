#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Сравнительный SEO анализ всех конкурентов
"""

import json
import glob
from datetime import datetime
import io
import sys

# Установка кодировки UTF-8 для Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def get_site_name(url):
    """Получение короткого имени сайта из URL"""
    name_map = {
        "viktorijaautokool.ee": "Viktorija",
        "xn--siduppe-10ad.ee": "Sõiduõppe ABC",
        "autokooldrive.ee": "Autokool DRIVE",
        "justdrive.ee": "Just DRIVE",
        "startautokool.ee": "START AUTOKOOL",
        "silverautokool.ee": "Silver Autokool",
        "somero.ee": "Somero",
        "origon.ee": "Origon",
        "lakarosse.ee": "Lakarosse",
        "deltaautokool.ee": "Delta Autokool",
        "liiklusekspert.ee": "Liiklusekspert",
        "atlanta.ee": "Atlanta"
    }
    for key, value in name_map.items():
        if key in url:
            return value
    return url.split("//")[-1].split("/")[0].replace("www.", "")

def calculate_seo_score(data):
    """Расчет SEO баллов для сайта"""
    score = 0
    
    # Title (0-2 балла)
    if data.get("title"):
        title = data["title"].strip()
        if title and len(title) > 10:
            score += 2
        elif title:
            score += 1
    
    # Meta Description (0-2 балла)
    meta_desc = data.get("meta_description", "").strip()
    if meta_desc:
        if 120 <= len(meta_desc) <= 160:  # Идеальная длина
            score += 2
        elif len(meta_desc) > 50:
            score += 1
    
    # H1 теги (0-2 балла) - должен быть 1
    h1_count = len(data.get("h1_tags", []))
    if h1_count == 1:
        score += 2
    elif h1_count > 0:
        score += 1
    # Если больше 1 H1 - штраф не применяем, но идеал = 1
    
    # H2 теги (0-2 балла) - больше = лучше структура
    h2_count = len(data.get("h2_tags", []))
    if h2_count >= 5:
        score += 2
    elif h2_count >= 3:
        score += 1
    
    # Word count (0-2 балла) - больше контента = лучше
    word_count = data.get("word_count", 0)
    if word_count >= 600:
        score += 2
    elif word_count >= 400:
        score += 1
    
    # Internal links (0-1 балл)
    internal_links = data.get("internal_links", 0)
    if internal_links >= 40:
        score += 1
    
    # Images with alt (0-1 балл)
    images_count = data.get("images_count", 0)
    images_with_alt = data.get("images_with_alt", 0)
    if images_count > 0:
        alt_percentage = (images_with_alt / images_count) * 100
        if alt_percentage >= 80:
            score += 1
    
    return score

def load_all_reports():
    """Загрузка всех отчетов"""
    reports = []
    json_files = glob.glob("*_report.json")
    
    for json_file in sorted(json_files):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                report = json.load(f)
                site_name = get_site_name(report["site_url"])
                seo_data = report["seo_data"]
                seo_score = calculate_seo_score(seo_data)
                
                # Добавляем процент alt-текстов
                images_count = seo_data.get("images_count", 0)
                images_with_alt = seo_data.get("images_with_alt", 0)
                alt_percentage = (images_with_alt / images_count * 100) if images_count > 0 else 0
                
                reports.append({
                    "name": site_name,
                    "url": report["site_url"],
                    "data": seo_data,
                    "score": seo_score,
                    "alt_percentage": alt_percentage
                })
        except Exception as e:
            print(f"Ошибка при загрузке {json_file}: {e}")
    
    return sorted(reports, key=lambda x: x["score"], reverse=True)

def create_comparative_report():
    """Создание сравнительного отчета"""
    reports = load_all_reports()
    
    analysis_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    md_content = f"""# Сравнительный SEO анализ конкурентов

**Дата анализа:** {analysis_date}  
**Всего проанализировано сайтов:** {len(reports)}

---

## 📊 Рейтинг сайтов по SEO (от лучшего к худшему)

"""
    
    for i, report in enumerate(reports, 1):
        data = report["data"]
        h1_count = len(data.get("h1_tags", []))
        h2_count = len(data.get("h2_tags", []))
        meta_desc = data.get("meta_description", "").strip()
        meta_desc_length = len(meta_desc)
        meta_desc_status = "✅ Оптимально" if 120 <= meta_desc_length <= 160 else "⚠️ " + ("Слишком длинное" if meta_desc_length > 160 else "Слишком короткое" if meta_desc_length > 0 else "Отсутствует")
        
        md_content += f"""
### {i}. {report["name"]} - {report["score"]}/10 баллов

**URL:** {report["url"]}

| Параметр | Значение | Оценка |
|----------|----------|--------|
| **SEO Score** | **{report["score"]}/10** | {"🟢 Отлично" if report["score"] >= 8 else "🟡 Хорошо" if report["score"] >= 6 else "🟠 Удовлетворительно" if report["score"] >= 4 else "🔴 Требует улучшения"} |
| **Title** | {data.get("title", "Отсутствует")[:60]}... | {"✅" if data.get("title") else "❌"} |
| **Meta Description** | {meta_desc_status} ({meta_desc_length} символов) | {"✅" if meta_desc else "❌"} |
| **H1 теги** | {h1_count} | {"✅ Идеально (1)" if h1_count == 1 else "⚠️ " + str(h1_count)} |
| **H2 теги** | {h2_count} | {"✅" if h2_count >= 5 else "⚠️" if h2_count > 0 else "❌"} |
| **Количество слов** | {data.get("word_count", 0)} | {"✅" if data.get("word_count", 0) >= 600 else "⚠️" if data.get("word_count", 0) >= 400 else "❌"} |
| **Внутренние ссылки** | {data.get("internal_links", 0)} | {"✅" if data.get("internal_links", 0) >= 40 else "⚠️"} |
| **Изображения с alt** | {report["alt_percentage"]:.1f}% ({data.get("images_with_alt", 0)}/{data.get("images_count", 0)}) | {"✅" if report["alt_percentage"] >= 80 else "⚠️" if report["alt_percentage"] > 0 else "❌"} |

"""
    
    md_content += """
---

## 🏆 Победитель: """

    winner = reports[0]
    md_content += f"""**{winner["name"]}** с {winner["score"]}/10 баллами!

### Почему {winner["name"]} лучший?

"""
    
    data = winner["data"]
    
    # Анализ преимуществ
    advantages = []
    
    if data.get("title"):
        advantages.append(f"✅ **Title:** {data.get('title')[:80]}")
    
    if data.get("meta_description"):
        meta_desc = data.get("meta_description", "").strip()
        if 120 <= len(meta_desc) <= 160:
            advantages.append(f"✅ **Meta Description:** Оптимальной длины ({len(meta_desc)} символов)")
        else:
            advantages.append(f"✅ **Meta Description:** Присутствует ({len(meta_desc)} символов)")
    
    h1_count = len(data.get("h1_tags", []))
    if h1_count == 1:
        advantages.append(f"✅ **H1 структура:** Идеально ({h1_count} H1 тег)")
    
    h2_count = len(data.get("h2_tags", []))
    if h2_count >= 5:
        advantages.append(f"✅ **H2 структура:** Отличная ({h2_count} H2 тегов)")
    
    word_count = data.get("word_count", 0)
    if word_count >= 600:
        advantages.append(f"✅ **Контент:** Большой объем ({word_count} слов)")
    
    internal_links = data.get("internal_links", 0)
    if internal_links >= 40:
        advantages.append(f"✅ **Внутренние ссылки:** Хорошая структура ({internal_links} ссылок)")
    
    images_count = data.get("images_count", 0)
    images_with_alt = data.get("images_with_alt", 0)
    if images_count > 0:
        alt_percentage = (images_with_alt / images_count) * 100
        if alt_percentage >= 80:
            advantages.append(f"✅ **Alt-тексты изображений:** Отлично ({alt_percentage:.1f}%)")
    
    for adv in advantages:
        md_content += f"{adv}\n\n"
    
    md_content += f"""
**URL:** {winner["url"]}

---

## 📈 Общая статистика

### Топ 3 сайта по SEO:

"""
    
    for i, report in enumerate(reports[:3], 1):
        md_content += f"{i}. **{report['name']}** - {report['score']}/10 баллов\n"
    
    md_content += f"""

### Средний SEO score: {sum(r['score'] for r in reports) / len(reports):.1f}/10

---

## 🔍 Детальное сравнение по категориям

### Title (Заголовок страницы)

"""
    
    for report in reports:
        title = report["data"].get("title", "❌ Отсутствует")
        md_content += f"- **{report['name']}:** {title[:70]}{'...' if len(title) > 70 else ''}\n"
    
    md_content += f"""

### Количество слов (объем контента)

| Сайт | Слов | Рейтинг |
|------|------|---------|
"""
    
    sorted_by_words = sorted(reports, key=lambda x: x["data"].get("word_count", 0), reverse=True)
    for report in sorted_by_words:
        word_count = report["data"].get("word_count", 0)
        md_content += f"| {report['name']} | {word_count} | {'🏆' if word_count == sorted_by_words[0]['data'].get('word_count', 0) else ''} |\n"
    
    md_content += f"""

### Alt-тексты изображений

| Сайт | Процент | Оценка |
|------|---------|--------|
"""
    
    sorted_by_alt = sorted(reports, key=lambda x: x["alt_percentage"], reverse=True)
    for report in sorted_by_alt:
        md_content += f"| {report['name']} | {report['alt_percentage']:.1f}% | {'🏆' if report['alt_percentage'] == sorted_by_alt[0]['alt_percentage'] else ''} |\n"
    
    md_content += f"""

---

*Отчет сгенерирован автоматически*
"""
    
    # Сохранение отчета
    with open("comparative_seo_analysis.md", 'w', encoding='utf-8') as f:
        f.write(md_content)
    
    print(f"\n[УСПЕХ] Сравнительный отчет сохранен: comparative_seo_analysis.md")
    
    # Вывод в консоль
    print("\n" + "="*70)
    print("РЕЙТИНГ САЙТОВ ПО SEO")
    print("="*70)
    for i, report in enumerate(reports, 1):
        print(f"{i:2}. {report['name']:25} - {report['score']:2}/10 баллов")
    
    print("\n" + "="*70)
    print(f"🏆 ПОБЕДИТЕЛЬ: {winner['name']} с {winner['score']}/10 баллами!")
    print("="*70)

if __name__ == "__main__":
    create_comparative_report()


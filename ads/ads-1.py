import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json
from collections import Counter
import re
from dataclasses import dataclass, asdict
from typing import List, Dict
from datetime import datetime

@dataclass
class SEOData:
    url: str
    title: str
    meta_description: str
    h1_tags: List[str]
    h2_tags: List[str]
    keywords: List[str]
    word_count: int
    internal_links: int
    external_links: int
    images_count: int
    images_with_alt: int
    
class SEOAnalyzer:
    def __init__(self):
        """
        Инициализация анализатора
        """
        pass
        
    def fetch_page(self, url: str) -> str:
        """Получение HTML страницы"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Ошибка при загрузке {url}: {e}")
            return ""
    
    def extract_keywords(self, text: str, top_n: int = 20) -> List[str]:
        """Извлечение ключевых слов из текста"""
        # Удаляем стоп-слова (русский, английский, эстонский)
        stop_words = {'и', 'в', 'на', 'с', 'по', 'для', 'не', 'от', 'за', 'к', 'о',
                      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
                      'ja', 'on', 'see', 'et', 'mis', 'kui', 'ka', 'kui', 'või', 'veel', 'oli', 'oli'}
        
        # Поддержка латиницы с эстонскими символами (õ, ä, ö, ü)
        words = re.findall(r'\b[a-zа-яёõäöü]{3,}\b', text.lower())
        words = [w for w in words if w not in stop_words]
        
        word_freq = Counter(words)
        return [word for word, _ in word_freq.most_common(top_n)]
    
    def analyze_page(self, url: str) -> SEOData:
        """Анализ одной страницы"""
        html = self.fetch_page(url)
        if not html:
            return None
        
        soup = BeautifulSoup(html, 'html.parser')
        
        # Извлечение основных SEO элементов
        title = soup.find('title')
        title = title.get_text().strip() if title else ""
        
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        meta_desc = meta_desc.get('content', '').strip() if meta_desc else ""
        
        h1_tags = [h1.get_text().strip() for h1 in soup.find_all('h1')]
        h2_tags = [h2.get_text().strip() for h2 in soup.find_all('h2')]
        
        # Текстовый контент
        text_content = soup.get_text()
        words = text_content.split()
        word_count = len(words)
        
        keywords = self.extract_keywords(text_content)
        
        # Анализ ссылок
        links = soup.find_all('a', href=True)
        internal_links = sum(1 for link in links if urlparse(link['href']).netloc == '' or urlparse(url).netloc in link['href'])
        external_links = len(links) - internal_links
        
        # Анализ изображений
        images = soup.find_all('img')
        images_count = len(images)
        images_with_alt = sum(1 for img in images if img.get('alt'))
        
        return SEOData(
            url=url,
            title=title,
            meta_description=meta_desc,
            h1_tags=h1_tags,
            h2_tags=h2_tags,
            keywords=keywords,
            word_count=word_count,
            internal_links=internal_links,
            external_links=external_links,
            images_count=images_count,
            images_with_alt=images_with_alt
        )
    
    def analyze_multiple_pages(self, urls: List[str]) -> List[SEOData]:
        """Анализ нескольких страниц"""
        results = []
        for url in urls:
            print(f"Анализ: {url}")
            data = self.analyze_page(url)
            if data:
                results.append(data)
        return results
    
    def generate_report(self, competitor_data: List[SEOData], output_file: str = "seo_report.json"):
        """Генерация отчета в JSON"""
        if not competitor_data:
            print("Нет данных для отчета")
            return None
            
        report = {
            "analysis_date": datetime.now().isoformat(),
            "competitors": [asdict(data) for data in competitor_data],
            "summary": {
                "avg_word_count": sum(d.word_count for d in competitor_data) / len(competitor_data) if competitor_data else 0,
                "common_keywords": self._find_common_keywords(competitor_data),
                "avg_internal_links": sum(d.internal_links for d in competitor_data) / len(competitor_data) if competitor_data else 0
            }
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        
        print(f"Отчет сохранен: {output_file}")
        return report
    
    def _find_common_keywords(self, data_list: List[SEOData]) -> List[str]:
        """Поиск общих ключевых слов у конкурентов"""
        all_keywords = []
        for data in data_list:
            all_keywords.extend(data.keywords)
        
        keyword_freq = Counter(all_keywords)
        return [kw for kw, count in keyword_freq.most_common(15) if count > 1]


# Пример использования
if __name__ == "__main__":
    # Инициализация
    analyzer = SEOAnalyzer()
    
    # Список конкурентов для анализа
    competitor_urls = [
        "https://example-competitor1.com",
        "https://example-competitor2.com",
        "https://example-competitor3.com"
    ]
    
    # Анализ конкурентов
    print("Начинаем анализ конкурентов...")
    competitor_data = analyzer.analyze_multiple_pages(competitor_urls)
    
    # Генерация отчета
    if competitor_data:
        report = analyzer.generate_report(competitor_data)
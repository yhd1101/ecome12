import requests
from bs4 import BeautifulSoup

response = requests.get("https://search.naver.com/search.naver?where=news&sm=tab_jum&query=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90")
html = response.text
soup = BeautifulSoup(html, 'html.parser')
links = soup.select(".news_tit")
descs = soup.select(".news_dsc")
news = soup.select(".info_group")

for link, desc, new in zip(links, descs, news):
    title = link.text
    url = link.attrs['href']
    description = desc.text
    newsWork = new.text
    print(f"제목: {title}")
    print(f"URL: {url}")
    print(f"설명: {description}")
    print(f"뉴스회사: {newsWork}")
    print("---")

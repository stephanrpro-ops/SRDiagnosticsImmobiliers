#!/usr/bin/env python3
import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

FEEDS = [
    ("Google News - diagnostics immobiliers", "https://news.google.com/rss/search?q=diagnostics+immobiliers&hl=fr&gl=FR&ceid=FR:fr"),
    ("Google News - immobilier France", "https://news.google.com/rss/search?q=immobilier+France&hl=fr&gl=FR&ceid=FR:fr"),
    ("Service Public", "https://www.service-public.fr/particuliers/actualites/rss"),
]


def clean(text):
    return " ".join((text or "").split())


def fetch_items(source_name, url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
      xml_data = resp.read()
    root = ET.fromstring(xml_data)
    channel = root.find("channel")
    if channel is None:
        return []
    items = []
    for item in channel.findall("item")[:8]:
        title = clean(item.findtext("title"))
        link = clean(item.findtext("link"))
        pub = clean(item.findtext("pubDate"))
        description = clean(item.findtext("description"))
        if not title or not link:
            continue
        items.append({
            "title": title,
            "link": link,
            "published": pub,
            "source": source_name,
            "summary": description[:240],
        })
    return items


def main():
    collected = []
    for source_name, url in FEEDS:
        try:
            collected.extend(fetch_items(source_name, url))
        except Exception:
            continue

    # déduplication simple sur le lien
    unique = {}
    for item in collected:
        unique[item["link"]] = item

    items = list(unique.values())[:20]
    payload = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "items": items,
    }
    with open("data/actualites.json", "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write("\n")


if __name__ == "__main__":
    main()

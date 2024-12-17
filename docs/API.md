# MyQuran API Documentation

## Base URLs

```
Quran API: https://api.qurancdn.com/api/qdc
Audio API: https://everyayah.com/data
```

## Authentication

Currently, the APIs used are public and do not require authentication.

## API Endpoints

### 1. Chapters API

#### Get All Chapters

```http
GET /chapters
Query Parameters:
  - language: string (default: en)
```

Response:
```json
{
  "chapters": [
    {
      "id": 1,
      "revelation_place": "makkah",
      "revelation_order": 5,
      "bismillah_pre": true,
      "name_simple": "Al-Fatihah",
      "name_complex": "Al-Fātiĥah",
      "name_arabic": "الفاتحة",
      "verses_count": 7,
      "pages": [1, 1],
      "translated_name": {
        "language_name": "english",
        "name": "The Opening"
      }
    }
  ]
}
```

#### Get Single Chapter

```http
GET /chapters/{chapter_id}
Query Parameters:
  - language: string (default: en)
```

### 2. Verses API

#### Get Verses by Chapter

```http
GET /verses/by_chapter/{chapter_id}
Query Parameters:
  - language: string (default: en)
  - words: boolean (default: false)
  - translations: string (comma separated IDs)
  - fields: string (comma separated fields)
  - page: number
  - per_page: number
```

Response:
```json
{
  "verses": [
    {
      "id": 1,
      "verse_number": 1,
      "verse_key": "1:1",
      "juz_number": 1,
      "hizb_number": 1,
      "rub_number": 1,
      "text_uthmani": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      "text_indopak": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
      "translations": [
        {
          "text": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
          "language_name": "english"
        }
      ]
    }
  ],
  "pagination": {
    "current_page": 1,
    "next_page": null,
    "prev_page": null,
    "total_pages": 1,
    "total_records": 7
  }
}
```

### 3. Search API

#### Search Verses

```http
GET /search
Query Parameters:
  - q: string (required)
  - size: number (default: 20)
  - page: number (default: 1)
  - language: string (default: en)
  - translations: string (comma separated IDs)
```

Response:
```json
{
  "search": {
    "query": "mercy",
    "total_results": 139,
    "current_page": 1,
    "total_pages": 7,
    "results": [
      {
        "verse_key": "1:1",
        "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        "translations": [
          {
            "text": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
            "language_name": "english"
          }
        ]
      }
    ]
  }
}
```

### 4. Audio API

#### Get Verse Audio

```http
GET /{reciter}/{chapter_number}{verse_number}.mp3
```

Example:
```
/Abdul_Basit_Murattal_64kbps/001001.mp3
```

Available Reciters:
- Abdul_Basit_Murattal_64kbps
- Alafasy_64kbps
- Husary_64kbps
- Minshawy_Murattal_128kbps
- Mohammad_al_Tablaway_64kbps

### 5. Word Analysis API

#### Get Word Analysis

```http
GET /verses/by_key/{verse_key}/words
Query Parameters:
  - language: string (default: en)
  - fields: string (comma separated fields)
```

Response:
```json
{
  "words": [
    {
      "id": 1,
      "position": 1,
      "text_uthmani": "بِسْمِ",
      "text_indopak": "بِسْمِ",
      "translation": {
        "text": "In (the) name",
        "language_name": "english"
      },
      "transliteration": {
        "text": "bis'mi",
        "language_name": "english"
      }
    }
  ]
}
```

## Error Handling

### Error Response Format

```json
{
  "status": 404,
  "error": {
    "message": "Resource not found",
    "code": "NOT_FOUND"
  }
}
```

### Common Error Codes

- 400: Bad Request
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Rate Limiting

- 60 requests per minute per IP
- Rate limit headers included in response:
  - X-RateLimit-Limit
  - X-RateLimit-Remaining
  - X-RateLimit-Reset

## Caching

- API responses are cached for 1 hour
- Cache-Control headers included
- ETags supported for conditional requests

## Best Practices

1. **Pagination**
   - Use page and per_page parameters
   - Default page size is 20
   - Maximum page size is 50

2. **Field Selection**
   - Use fields parameter to reduce response size
   - Comma-separated list of required fields

3. **Error Handling**
   - Always check status codes
   - Handle rate limiting gracefully
   - Implement exponential backoff

4. **Caching**
   - Cache responses locally
   - Use ETags for conditional requests
   - Implement offline support

5. **Performance**
   - Batch requests when possible
   - Use compression
   - Implement request queuing
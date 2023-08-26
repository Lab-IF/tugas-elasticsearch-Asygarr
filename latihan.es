GET people/_search
{
  "query": {
    "match": {
      "Country": "germany"
    }
  },
  "size": 100,
  "from": 0,
  "sort": [],
  "aggs": {
    "Negara_german": {
      "terms": {
        "field": "Country.keyword"
      }
    }
  }
}

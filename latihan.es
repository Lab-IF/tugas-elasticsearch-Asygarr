GET _cat/indices

{
    "query": {
        "query_string": {
            "query": "larry",
            "fields": ["Name"]
        }
    },
    "size": 10,
    "from": 0,
    "sort": []
}
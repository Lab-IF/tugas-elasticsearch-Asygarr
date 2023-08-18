GET _search

{
    "query": {
        "bool": {
            "must": [
                { "match": { "nama": "Asygar" } },
                { "match": { "angkatan": 2021 } }
            ]
        }
    },
    "size": 10,
    "from": 0,
    "sort": []
}
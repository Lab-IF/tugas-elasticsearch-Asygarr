GET _search

{
    "query": {
        "bool": {
            "must": [
                { "match": { "prodi": "informatika" } },
                { "match": { "angkatan": 2021 } }
            ]
        }
    },
    "size": 100,
    "from": 0,
    "sort": []
}
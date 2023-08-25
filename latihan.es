GET _search

{
    "query": {
        "bool": {
            "must": [
                { "match": { "Name": "Muhammad" } },
                { "match": { "angkatan": 2021 } }
            ]
        }
    },
    "size": 100,
    "from": 0,
    "sort": []
}
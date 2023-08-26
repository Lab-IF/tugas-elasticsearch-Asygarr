GET _search

{
    "query": {
        "bool": {
            "must": [
                { "match": { "Name": "Muhammad" } },
                { "match": { "Gender": "Male" } }
            ]
        }
    },
    "size": 100,
    "from": 0,
    "sort": []
}
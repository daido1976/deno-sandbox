See. https://support.spirinc.com/24b2747429374e028f00a3b065b398ee

```sh
curl -G http://localhost:8000/slots -d 'accounts=test1@example.com,test2@example.com' --data-urlencode 'startTime=2022/01/01 10:00' --data-urlencode 'endTime=2022/01/03 15:30' | jq .
curl -X POST http://localhost:8000/confirm -H "Content-Type: application/json" -d '{ "accounts": ["test1@example.com", "test2@example.com"], "startTime": "2022/01/01 10:30" }'
curl -X GET http://localhost:8000/data/dump | jq .
curl -X POST http://localhost:8000/data/clean
```

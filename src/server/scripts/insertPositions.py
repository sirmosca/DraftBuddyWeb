import csv
import json
from pymongo import MongoClient

client = MongoClient()
db = client.draftbuddy
with open('./../web_server/positions.data', 'rb') as csvfile:
    fieldNames = ['position']
    reader = csv.DictReader(csvfile, fieldNames, delimiter=',')
    jsonDump = json.dumps( [ row for row in reader ] )
    jsonData = json.loads(jsonDump)
    db.positions.insert_many(jsonData)

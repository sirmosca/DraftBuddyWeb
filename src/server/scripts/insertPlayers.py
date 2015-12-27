import csv
import json
from pymongo import MongoClient

client = MongoClient()
db = client.draftbuddy
with open('./../web_server/adp.data', 'rb') as csvfile:
    fieldNames = ['ADP','Overall','Name','Position','Team','Times Drafted','Bye']
    reader = csv.DictReader(csvfile, fieldNames, delimiter=',')
    jsonDump = json.dumps( [ row for row in reader ] )
    jsonData = json.loads(jsonDump)
    db.players.insert_many(jsonData)

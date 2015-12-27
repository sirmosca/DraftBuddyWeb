import csv
import json
from pymongo import MongoClient

client = MongoClient()
db = client.draftbuddy
with open('./../web_server/teams.data', 'rb') as csvfile:
    fieldNames = ['team']
    reader = csv.DictReader(csvfile, fieldNames, delimiter=',')
    jsonDump = json.dumps( [ row for row in reader ] )
    jsonData = json.loads(jsonDump)
    db.teams.insert_many(jsonData)

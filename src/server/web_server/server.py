from bottle import route, run, response, hook
from pymongo import MongoClient
from bson.json_util import dumps

@hook('after_request')
def enable_cors():
	response.headers['Access-Control-Allow-Origin'] = '*'

@route('/players')
def players():
	client = MongoClient()
	db = client.draftbuddy
	cursor = db.players.find()
	out = dumps(cursor)
	return out

@route('/teams')
def teams():
	client = MongoClient()
	db = client.draftbuddy
	cursor = db.teams.find()
	out = dumps(cursor)
	return out

@route('/positions')
def positions():
	client = MongoClient()
	db = client.draftbuddy
	cursor = db.positions.find()
	out = dumps(cursor)
	return out

run(host='localhost', port=8080, debug=True, reloader=True)

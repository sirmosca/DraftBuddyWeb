from bottle import route, run, response
import csv
import json

@route('/players')
def players():
    with open('adp.data', 'rb') as csvfile:
        fieldNames = 'ADP', 'Overall', 'Name', 'Position', 'Team', 'Times Drafted', 'Bye'
        reader = csv.DictReader(csvfile, fieldNames, delimiter=',')
        out = json.dumps( [ row for row in reader ] )
        return out

@route('/teams')
def teams():
    with open('teams.data', 'rb') as csvfile:
        teamFieldNames = ['team']
        teamReader = csv.DictReader(csvfile, teamFieldNames, delimiter='\n')
        out = json.dumps( [ row for row in teamReader ] )
        return out

@route('/positions')
def positions():
    with open('positions.data', 'rb') as csvfile:
        fieldNames = ['position']
        reader = csv.DictReader(csvfile, fieldNames, delimiter=',')
        out = json.dumps( [ row for row in reader ] )
        return out

run(host='localhost', port=8080, debug=True, reloader=True)

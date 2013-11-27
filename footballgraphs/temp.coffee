# Build Teams Object
   	###
	class Teams
		constructor: (json) ->
			@teams = [ ]
			for team in nfl
				@team[nfl.id] = new Team team.name, team.conference, team.div, team.img


	class Team
		constructor: (@name, @conference, @div, @img)
			@management = [ ]

	class Coach
	 	constructor: (@id, @name, @age) ->
	 		@jobs = []

	 	addJob: (year, role, teamID) ->
	 		@jobs.push {year: year, role: role, teamID: teamID}

	 	jobs: () ->
	 		# Sort job history (recent to first)

	 class Coaches
	 	constructor: (json) ->
	 		@coaches = []
	 		for coachRecord in json
	 			if @coaches[coachRecord.id] is undefined
	 				# Add coach
	 			# Add job history to coach

	 			# Add job history to team

	###
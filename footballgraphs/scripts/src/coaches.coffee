app = angular.module("NFLHistory")

app.factory("NFLdata", ->
	# Classes Teams and Coaches
	class Teams
		constructor: (json) ->
			@teams = [ ]
			for team in json
				@teams.push new Team team.name, team.conference, team.div, team.img

		teamID: (name) ->
			for team, i in @teams
				if team.name is name
					return i

			"!!" + name # return name if not in current OFFICAL NFL list (old team)
						# 	might also be a college team

		getTeam: (id) ->
			if typeof id is "number"
				return @teams[id]
			else
				return {name: id}

		getTeams: ->
			# returns - json list of current teams
			@teams


				

	class Team
		constructor: (@name, @conference, @div, @img) ->
			@management = [ ] # no management history initially

	class Coaches
	 	constructor: (json, teams) ->
	 		@coaches = [] # all coaches
	 		for coachRecord in json
	 			id = @coachID(coachRecord["coach_name"])
	 			if id is undefined
	 				# Create a new coach record
	 				@coaches.push new Coach coachRecord["coach_name"], coachRecord.age
	 				id = @coaches.length - 1

	 			# Add job to coaches history
	 			teamName = coachRecord["team_name"]
	 			teamID = teams.teamID teamName
	 			@coaches[id].addJob(coachRecord.year, coachRecord.role, teamID, teamName)

	 	coachID: (name) ->
	 		for coach, i in @coaches
	 			if coach.name is name
	 				return i

	 		undefined # coach not in list yet

	 	getCoaches: ->
	 		@coaches

	 	getAssociates: (coach) ->


	class Coach
	 	constructor: (@name, @age) ->
	 		@jobs = [ ]

	 	addJob: (year, role, teamID, teamName) ->
	 		@jobs.push {year: year, role: role, teamID: teamID, teamName: teamName}

	 	getJobs: () ->
	 		# Sort job history (recent to first) 
	 		@jobs.sort (a, b) -> b.year - a.year

	# Factory Main Section ------------------------------------------------------

	coaches = null
	teams = null

	getTeams = ->
		# return current list of NFL teams
		teamList = teams = new Teams nfl

	getCoaches = ->
		# return list of coaches
		teams = new Teams nfl
		coaches = new Coaches nflCoaches, teams
		coaches.getCoaches()

	associates = (coachID) ->
		assocIDs = [ ]
		coachList = coaches.getCoaches()
		
		for job in coachList[coachID].jobs
			# Run thru coach list for each year and look for team match
			matchYear = job.year
			matchTeam = job.teamName
			for coach, id in coachList
				for job in coach.jobs
					if matchYear is job.year and matchTeam is job.teamName 
						assocIDs.push (id) if id isnt coachID # don't want to count self!

		# return - list of coach ids of coaches who worked along side of the "coach"
		# uniques only (also sort, just to make it more debuggable)
		unique = assocIDs.filter((el, pos, self) -> self.indexOf(el) is pos)
		unique = unique.sort((a, b) -> a - b)

	{getCoaches: getCoaches
	getTeams: getTeams
	getAssociates: associates
	}
	)


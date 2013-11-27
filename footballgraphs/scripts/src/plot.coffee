app = angular.module("NFLHistory")

app.factory("Plot", ->
	s = Snap("#visual-history")
	pad = {top: 50, right: 64, bottom: 0, left: 48}
	deltaX = 24
	deltaY = 24

	d2xy = (teamID, year) ->
		if typeof teamID is "number"
			x = teamID * (deltaX + 2) + pad.left + deltaX/2
		else
			x = (deltaX + 2 ) * 32 + pad.left

		y = (2013 - year) * deltaY + pad.top

		{x: x, y: y}

	plotGrid = ->
		
		# Teams
		for t,i in nfl
			#console.log t.name
			team = s.image("images/teams/#{t.img}",i*(deltaX + 2) + pad.left, 0, deltaX, 16)
			team.attr({title: t.name})
			#s.append(img)

		# Years
		years = [2013..1990]
		for y, i in years
			#console.log y
			s.text(4, i*deltaY + pad.top, y.toString())

	plotCoach = (coach, opacity = 1) ->
		# plot coach on grid
		start = {}
		name = coach.name
		age  = coach.age
		jobs = coach.getJobs()
		line = "M"
		for job, i in jobs
			console.log job
			point = d2xy job.teamID, job.year
			if i is 0
				# First point, add Name
				s.text(point.x, point.y, name).attr({stroke: "#11A1B4"})
				#line = line + " " + point.x + " " + point.y + " R"
				line = line + " " + point.x + " " + point.y + " L"
			line = line + " " + point.x + " " + point.y
		s.path(line).attr({fill: "none", stroke: "#11A1B4", strokeWidth: 3, opacity: opacity})

	plotAssociates = (coachList, coachIDs) ->
		# plot associate to active coach on grid
		for coachID in coachIDs
			coach = coachList[coachID]
			plotCoach(coach, .3)

	erasePlot = ->
		$('path').remove();

	{plotGrid: plotGrid
	plotCoach: plotCoach
	plotAssociates: plotAssociates
	erasePlot: erasePlot
	}

	)
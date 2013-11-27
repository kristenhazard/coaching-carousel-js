$ ->
	console.log "jQuery is in the house"




	#s.path("M10,100L120,120L120,40Z").

	#s.path("M 10 100 R 30 50 50 90 70 20 90 100 110 90 130 100").attr({fill: "none", stroke: "#333", strokeWidth: 3})
	
	###
	

	allCoaches = coaches.getCoaches()
	
	for coach, i in allCoaches
		console.log "#{i}: #{coach.name}"
		if coach.name is "Sean Payton"
			plotCoach(coach)
	
	##plotCoach(allCoaches[124])
	

	###




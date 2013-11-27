app = angular.module("NFLHistory")

app.controller("CoachesCtrl", ($scope, NFLdata, Plot) ->
	Plot.plotGrid()

	$scope.coaches = NFLdata.getCoaches()
	$scope.selectedCoach = null
	$scope.selectCoach = (coachID) ->
		console.log "Selected Coach #{coachID}"
		$scope.selectedCoach = coachID
		Plot.plotCoach(@coach)

	$scope.getAssociates = ->
		# Gather the associates (same team and same year)
		associates = NFLdata.getAssociates($scope.selectedCoach)
		console.log "Associates #{associates}"
		# Plot the associates out
		Plot.plotAssociates($scope.coaches, associates)

	$scope.erasePlot = ->
		Plot.erase()
	)
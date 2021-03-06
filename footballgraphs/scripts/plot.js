// Generated by CoffeeScript 1.6.3
(function() {
  var app;

  app = angular.module("NFLHistory");

  app.factory("Plot", function() {
    var d2xy, deltaX, deltaY, erasePlot, pad, plotAssociates, plotCoach, plotGrid, s;
    s = Snap("#visual-history");
    pad = {
      top: 50,
      right: 64,
      bottom: 0,
      left: 48
    };
    deltaX = 24;
    deltaY = 24;
    d2xy = function(teamID, year) {
      var x, y;
      if (typeof teamID === "number") {
        x = teamID * (deltaX + 2) + pad.left + deltaX / 2;
      } else {
        x = (deltaX + 2) * 32 + pad.left;
      }
      y = (2013 - year) * deltaY + pad.top;
      return {
        x: x,
        y: y
      };
    };
    plotGrid = function() {
      var i, t, team, y, years, _i, _j, _k, _len, _len1, _results, _results1;
      for (i = _i = 0, _len = nfl.length; _i < _len; i = ++_i) {
        t = nfl[i];
        team = s.image("images/teams/" + t.img, i * (deltaX + 2) + pad.left, 0, deltaX, 16);
        team.attr({
          title: t.name
        });
      }
      years = (function() {
        _results = [];
        for (_j = 2013; _j >= 1990; _j--){ _results.push(_j); }
        return _results;
      }).apply(this);
      _results1 = [];
      for (i = _k = 0, _len1 = years.length; _k < _len1; i = ++_k) {
        y = years[i];
        _results1.push(s.text(4, i * deltaY + pad.top, y.toString()));
      }
      return _results1;
    };
    plotCoach = function(coach, opacity) {
      var age, i, job, jobs, line, name, point, start, _i, _len;
      if (opacity == null) {
        opacity = 1;
      }
      start = {};
      name = coach.name;
      age = coach.age;
      jobs = coach.getJobs();
      line = "M";
      for (i = _i = 0, _len = jobs.length; _i < _len; i = ++_i) {
        job = jobs[i];
        console.log(job);
        point = d2xy(job.teamID, job.year);
        if (i === 0) {
          s.text(point.x, point.y, name).attr({
            stroke: "#11A1B4"
          });
          line = line + " " + point.x + " " + point.y + " L";
        }
        line = line + " " + point.x + " " + point.y;
      }
      return s.path(line).attr({
        fill: "none",
        stroke: "#11A1B4",
        strokeWidth: 3,
        opacity: opacity
      });
    };
    plotAssociates = function(coachList, coachIDs) {
      var coach, coachID, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = coachIDs.length; _i < _len; _i++) {
        coachID = coachIDs[_i];
        coach = coachList[coachID];
        _results.push(plotCoach(coach, .3));
      }
      return _results;
    };
    erasePlot = function() {
      return $('path').remove();
    };
    return {
      plotGrid: plotGrid,
      plotCoach: plotCoach,
      plotAssociates: plotAssociates,
      erasePlot: erasePlot
    };
  });

}).call(this);

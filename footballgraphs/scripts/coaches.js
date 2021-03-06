// Generated by CoffeeScript 1.6.3
(function() {
  var app;

  app = angular.module("NFLHistory");

  app.factory("NFLdata", function() {
    var Coach, Coaches, Team, Teams, associates, coaches, getCoaches, getTeams, teams;
    Teams = (function() {
      function Teams(json) {
        var team, _i, _len;
        this.teams = [];
        for (_i = 0, _len = json.length; _i < _len; _i++) {
          team = json[_i];
          this.teams.push(new Team(team.name, team.conference, team.div, team.img));
        }
      }

      Teams.prototype.teamID = function(name) {
        var i, team, _i, _len, _ref;
        _ref = this.teams;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          team = _ref[i];
          if (team.name === name) {
            return i;
          }
        }
        return "!!" + name;
      };

      Teams.prototype.getTeam = function(id) {
        if (typeof id === "number") {
          return this.teams[id];
        } else {
          return {
            name: id
          };
        }
      };

      Teams.prototype.getTeams = function() {
        return this.teams;
      };

      return Teams;

    })();
    Team = (function() {
      function Team(name, conference, div, img) {
        this.name = name;
        this.conference = conference;
        this.div = div;
        this.img = img;
        this.management = [];
      }

      return Team;

    })();
    Coaches = (function() {
      function Coaches(json, teams) {
        var coachRecord, id, teamID, teamName, _i, _len;
        this.coaches = [];
        for (_i = 0, _len = json.length; _i < _len; _i++) {
          coachRecord = json[_i];
          id = this.coachID(coachRecord["coach_name"]);
          if (id === void 0) {
            this.coaches.push(new Coach(coachRecord["coach_name"], coachRecord.age));
            id = this.coaches.length - 1;
          }
          teamName = coachRecord["team_name"];
          teamID = teams.teamID(teamName);
          this.coaches[id].addJob(coachRecord.year, coachRecord.role, teamID, teamName);
        }
      }

      Coaches.prototype.coachID = function(name) {
        var coach, i, _i, _len, _ref;
        _ref = this.coaches;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          coach = _ref[i];
          if (coach.name === name) {
            return i;
          }
        }
        return void 0;
      };

      Coaches.prototype.getCoaches = function() {
        return this.coaches;
      };

      Coaches.prototype.getAssociates = function(coach) {};

      return Coaches;

    })();
    Coach = (function() {
      function Coach(name, age) {
        this.name = name;
        this.age = age;
        this.jobs = [];
      }

      Coach.prototype.addJob = function(year, role, teamID, teamName) {
        return this.jobs.push({
          year: year,
          role: role,
          teamID: teamID,
          teamName: teamName
        });
      };

      Coach.prototype.getJobs = function() {
        return this.jobs.sort(function(a, b) {
          return b.year - a.year;
        });
      };

      return Coach;

    })();
    coaches = null;
    teams = null;
    getTeams = function() {
      var teamList;
      return teamList = teams = new Teams(nfl);
    };
    getCoaches = function() {
      teams = new Teams(nfl);
      coaches = new Coaches(nflCoaches, teams);
      return coaches.getCoaches();
    };
    associates = function(coachID) {
      var assocIDs, coach, coachList, id, job, matchTeam, matchYear, unique, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      assocIDs = [];
      coachList = coaches.getCoaches();
      _ref = coachList[coachID].jobs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        job = _ref[_i];
        matchYear = job.year;
        matchTeam = job.teamName;
        for (id = _j = 0, _len1 = coachList.length; _j < _len1; id = ++_j) {
          coach = coachList[id];
          _ref1 = coach.jobs;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            job = _ref1[_k];
            if (matchYear === job.year && matchTeam === job.teamName) {
              if (id !== coachID) {
                assocIDs.push(id);
              }
            }
          }
        }
      }
      unique = assocIDs.filter(function(el, pos, self) {
        return self.indexOf(el) === pos;
      });
      return unique = unique.sort(function(a, b) {
        return a - b;
      });
    };
    return {
      getCoaches: getCoaches,
      getTeams: getTeams,
      getAssociates: associates
    };
  });

}).call(this);

app.controller('DiaryController', ['DiaryService', '$interval', function (DiaryService, $interval) {
    var ctrl = this;
    ctrl.diary = DiaryService.get().then(function (data) {
        ctrl.diary = data;
    });

    $interval(function () {
        console.log("INTERVAL");

    }, 1000).then(function () {
        console.log("THEN");
    });

    ctrl.updateSubject = function(subject, name, description) {
        subject.name = name;
        subject.description = description;
    }

    ctrl.addNewSubject = function (newSubjectName) {
        //TODO Validation

        if(newSubjectName) {
            var newSubject = {};
            newSubject.name = newSubjectName;
            newSubject.description = "";
            newSubject.labs = [];

            ctrl.diary.subjects.push(newSubject);
        } else {
            //TODO Show notice
        }

        //TODO Clear input
    }

    ctrl.deleteSubject = function (deletingSubject) {

        ctrl.diary.subjects = ctrl.diary.subjects.filter(function (subject) {
            return subject != deletingSubject;
        })


    }


    ctrl.addNewLab = function (subject, newLabName) {
        //TODO Validation

        if(newLabName) {
            var newLab = {};
            newLab.name = newLabName;
            newLab.description = "";
            newLab.passed = false;

            ctrl.diary.subjects.find(function (element, index, array) {
                if(element == subject) {
                    element.labs.push(newLab)
                }

            })
        } else {
            //TODO Show notice
        }

        //TODO Clear input

    }

    ctrl.switchPassed = function (lab) {
        lab.passed = !lab.passed;
    }

    ctrl.save = function () {
        DiaryService.put(ctrl.diary).then(function (response) {
            console.log(response);

        })
    }

    ctrl.getJsonDiary = function () {
        return angular.toJson(ctrl.diary)
    }

    ctrl.getPercentPasssedLabs = function (labs) {
        if(labs.length == 0) return 0;

        var countPassedLabs = labs.filter(function (lab) {
            return lab.passed == true;
        }).length;

        return Math.floor(countPassedLabs * 100 / labs.length);

    }

}]);
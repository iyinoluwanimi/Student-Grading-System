const prompt = require ("prompt-sync")();

function collectNumberOfClass () {

    let numberOfClass = Number(prompt("How many classes do you want to record? "));
    return numberOfClass;

}

function collectNumberOfStudents () {

    let numberOfStudents = Number(prompt("How many students do you have in each class? "));
    return numberOfStudents;

}

function collectNumberOfSubjects () {

    let numberOfSubjects = Number(prompt("How many subjects do they offer? "));
    return numberOfSubjects;

}

function collectScore (numberOfSubject) {
    
    while (true) {
    
        let studentScore = Number(prompt(`Enter score for subject ${numberOfSubject} (0 - 100):`));
        if (studentScore >= 0 && studentScore <= 100) {
            return studentScore;
        }
        console.log("Invalid Score, Enter a Score from 0 to 100 !!");
    }

}

function collectSubjectScores (studentNumber, numberOfSubject) {
    console.log(`Entering score for student ${studentNumber} :`);
    subjectsScores = [];
    for (let index = 1; index <= numberOfSubject;index++ ) {
        subjectsScores.push(collectScore(studentNumber,numberOfSubject));
    }
    console.log("Saving >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log("Saved successfully");
    return subjectsScores;
}

function collectStudentsScores (studentNumber, numberOfSubject) {

    studentsScores = [];
    for (let index = 1; index <= studentNumber;index++ ) {
    
        studentsScores.push(collectSubjectScores(studentNumber,numberOfSubject));

    }
    return studentsScores;

}

function collectAllClassScore (classNumber,studentNumber, numberOfSubject) {
    
    allClassScore = [];
    
    for (let index = 1; index <= classNumber;index++) {
        console.log(`Entering score for student ${classNumber} :`);
        allClassScore.push(collectStudentsScores(studentNumber, numberOfSubject));
    }
    return allClassScore;

}

function calculateTotalOfStudentScore(allClassScore) {
    
    allStudentTotal = [];
    for (let classIndex = 0; classIndex < allClassScore.length classIndex++) {
        classTotal = [];
        for (let studentIndex = 0; studentIndex < allClassScore[classIndex].length; studentIndex++) {
            let total = 0;
            for (let subjectIndex = 0; subjectIndex < allClassScore[classIndex][studentIndex].length; subjectIndex++) {
                total +=  allClassScore[classIndex][studentIndex][subjectIndex]   
            }
            classTotal.push(total);
        }
        allStudentTotal.push(classTotal);
    }
    return allStudentTotal;
}

function calculateAverageOfStudentScore(allClassScore) {

    allStudentAverage = [];
    for (let classIndex = 0; classIndex < allClassScore.length classIndex++) {
        classAverage = [];
        for (let studentIndex = 0; studentIndex < allClassScore[classIndex].length; studentIndex++) {
            let total = 0;
            for (let subjectIndex = 0; subjectIndex < allClassScore[classIndex][studentIndex].length; subjectIndex++) {
                total +=  allClassScore[classIndex][studentIndex][subjectIndex]   
            }
            let average = total / allClassScore[classIndex][studentIndex].length;
            classAverage.push(average);
        }
        allStudentAverage.push(classAverage);
    }
    return allStudentAverage;
}

function calculatePositionOfStudentScore(allClassScore) {


}

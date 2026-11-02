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
    const subjectsScores = [];
    for (let index = 1; index <= numberOfSubject;index++ ) {
        subjectsScores.push(collectScore(studentNumber,numberOfSubject));
    }
    console.log("Saving >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log("Saved successfully");
    return subjectsScores;
}

function collectStudentsScores (studentNumber, numberOfSubject) {

    const studentsScores = [];
    for (let index = 1; index <= studentNumber;index++ ) {
    
        studentsScores.push(collectSubjectScores(studentNumber,numberOfSubject));

    }
    return studentsScores;

}

function collectAllClassScore (classNumber,studentNumber, numberOfSubject) {
    
    const allClassScore = [];
    
    for (let index = 1; index <= classNumber;index++) {
        console.log(`Entering score for Class ${classNumber} :`);
        allClassScore.push(collectStudentsScores(studentNumber, numberOfSubject));
    }
    return allClassScore;

}

function calculateTotalOfStudentScore(allClassScore) {
    
    const allStudentTotal = [];
    for (let classIndex = 0; classIndex < allClassScore.length; classIndex++) {
        const classTotal = [];
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

    const allStudentAverage = [];
    for (let classIndex = 0; classIndex < allClassScore.length; classIndex++) {
        const classAverage = [];
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


function calculatePositionOfStudentScore(allStudentTotal) {
    const allStudentPosition = [];
   for (let classIndex = 0; classIndex < allStudentTotal.length; classIndex++) {
        const classPosition = [];
        for (let studentIndex = 0; studentIndex < allStudentTotal[classIndex].length; studentIndex++) {
            let position = 1;
            let currentTotal = allStudentTotal[classIndex][studentIndex];
            for (let otherStudent = 0; otherStudent < allStudentTotal[classIndex].length; otherStudent++) {
               if (allStudentTotal[classIndex][otherStudent] > currentTotal) {
                    position++;
                }
           }
            classPosition.push(position);
       }
        allStudentPosition.push(classPosition);
    }

    return allStudentPosition;
}

let numberOfClass = collectNumberOfClass();

let numberOfStudents = collectNumberOfStudents();

let numberOfSubject = collectNumberOfSubjects();

let allClassScore = collectAllClassScore(numberOfClass,numberOfStudents,numberOfSubject);
let allStudentTotal = calculateTotalOfStudentScore(allClassScore);

let allStudentAverage = calculateAverageOfStudentScore(allClassScore);

let allStudentPosition = calculatePositionOfStudentScore(allStudentTotal);

process.stdout.write("====================================================================\n");

process.stdout.write("STUDENT".padStart(15));

for (let index = 1; index <= numberOfSubject; index++) {
    process.stdout.write(("SUB" + index).padStart(10));
}

process.stdout.write("TOTAL".padStart(10));
process.stdout.write("AVERAGE".padStart(10));
process.stdout.write("POS".padStart(10) + "\n");

process.stdout.write("====================================================================\n");

for (let classIndex = 0; classIndex < allClassScore.length; classIndex++) {

    process.stdout.write(`\nCLASS ${classIndex + 1}\n`);

    for (let studentIndex = 0; studentIndex < allClassScore[classIndex].length; studentIndex++) {

        process.stdout.write(("Student " + (studentIndex + 1)).padStart(15));

        for (let subjectIndex = 0; subjectIndex < allClassScore[classIndex][studentIndex].length; subjectIndex++) {

            process.stdout.write(String(allClassScore[classIndex][studentIndex][subjectIndex]).padStart(10));

        }

        process.stdout.write(String(allStudentTotal[classIndex][studentIndex]).padStart(10));
        process.stdout.write(allStudentAverage[classIndex][studentIndex].toFixed(2).padStart(10));
        process.stdout.write(String(allStudentPosition[classIndex][studentIndex]).padStart(10) + "\n");

    }
}

process.stdout.write("====================================================================\n");

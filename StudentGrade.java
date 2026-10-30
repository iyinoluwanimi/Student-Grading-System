
import java.util.Scanner;
import java.util.ArrayList;

public class StudentGrade {

    static Scanner input = new Scanner(System.in);

    public static int collectNumberOfClass() {

        System.out.println("How many classes do you want to record? ");
        int numberOfClass = input.nextInt();

        return numberOfClass;
    }

    public static int collectNumberOfStudents() {

        System.out.println("How many students do you have in each class? ");
        int numberOfStudents = input.nextInt();

        return numberOfStudents;
    }

    public static int collectNumberOfSubjects() {

        System.out.println("How many subjects do they offer? ");
        int numberOfSubjects = input.nextInt();

        return numberOfSubjects;
    }

    public static int collectScore(int subjectNumber) {

        int studentScore;

        while (true) {

            System.out.printf("Enter score for subject %d (0 - 100): ", subjectNumber);
            studentScore = input.nextInt();

            if (studentScore >= 0 && studentScore <= 100) {
                return studentScore;
            }

            System.out.println("Invalid score! Enter a score between 0 and 100.");
        }
    }

    public static ArrayList<Integer> collectStudentScore(
            int numberOfSubjects, int studentNumber) {

        ArrayList<Integer> oneStudentScore = new ArrayList<>();

        System.out.println();
        System.out.printf("Entering scores for student %d\n", studentNumber);

        for (int subjectCount = 1; subjectCount <= numberOfSubjects; subjectCount++) {

            oneStudentScore.add(collectScore(subjectCount));

        }

        System.out.println("Saving >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        System.out.println("Saved successfully");

        return oneStudentScore;
    }

    public static ArrayList<ArrayList<Integer>> collectClassScore(
            int numberOfStudents, int numberOfSubjects) {

        ArrayList<ArrayList<Integer>> allStudentScore = new ArrayList<>();

        for (int studentCount = 1; studentCount <= numberOfStudents; studentCount++) {

            allStudentScore.add(
                collectStudentScore(numberOfSubjects, studentCount)
            );

        }

        return allStudentScore;
    }

    public static ArrayList<ArrayList<ArrayList<Integer>>> collectAllClassScores(
            int numberOfClasses, int numberOfStudents, int numberOfSubjects) {

        ArrayList<ArrayList<ArrayList<Integer>>> allClassScores = new ArrayList<>();

        for (int classCount = 1; classCount <= numberOfClasses; classCount++) {

            System.out.println();
            System.out.printf("Entering scores for Class %d\n", classCount);

            allClassScores.add(
                collectClassScore(numberOfStudents, numberOfSubjects)
            );

        }

        return allClassScores;
    }

    public static ArrayList<ArrayList<Integer>> calculateTotalStudentScore(
            ArrayList<ArrayList<ArrayList<Integer>>> allClassScores) {

        ArrayList<ArrayList<Integer>> allStudentTotals = new ArrayList<>();

        for (int classIndex = 0; classIndex < allClassScores.size(); classIndex++) {

            ArrayList<Integer> classTotals = new ArrayList<>();

            for (int studentIndex = 0;
                 studentIndex < allClassScores.get(classIndex).size();
                 studentIndex++) {

                int total = 0;

                for (int subjectIndex = 0;
                     subjectIndex < allClassScores.get(classIndex).get(studentIndex).size();
                     subjectIndex++) {

                    total += allClassScores.get(classIndex).get(studentIndex).get(subjectIndex);

                }

                classTotals.add(total);
            }

            allStudentTotals.add(classTotals);
        }

        return allStudentTotals;
    }

    public static ArrayList<ArrayList<Double>> calculateAverageOfStudentScore(
            ArrayList<ArrayList<ArrayList<Integer>>> allClassScores) {

        ArrayList<ArrayList<Double>> allStudentAverages = new ArrayList<>();

        for (int classIndex = 0; classIndex < allClassScores.size(); classIndex++) {

            ArrayList<Double> classAverages = new ArrayList<>();

            for (int studentIndex = 0;
                 studentIndex < allClassScores.get(classIndex).size();
                 studentIndex++) {

                int total = 0;

                for (int subjectIndex = 0;
                     subjectIndex < allClassScores.get(classIndex).get(studentIndex).size();
                     subjectIndex++) {

                    total += allClassScores.get(classIndex).get(studentIndex).get(subjectIndex);

                }

                double average = (double) total /
                        allClassScores.get(classIndex).get(studentIndex).size();

                classAverages.add(average);
            }

            allStudentAverages.add(classAverages);
        }

        return allStudentAverages;
    }

    public static ArrayList<ArrayList<Integer>> calculateStudentPosition(
            ArrayList<ArrayList<Integer>> allStudentTotals) {

        ArrayList<ArrayList<Integer>> allClassPositions = new ArrayList<>();

        for (int classIndex = 0; classIndex < allStudentTotals.size(); classIndex++) {

            ArrayList<Integer> classPositions = new ArrayList<>();

            for (int studentIndex = 0;
                 studentIndex < allStudentTotals.get(classIndex).size();
                 studentIndex++) {

                int position = 1;

                int currentTotal = allStudentTotals.get(classIndex).get(studentIndex);

                for (int otherStudent = 0;
                     otherStudent < allStudentTotals.get(classIndex).size();
                     otherStudent++) {

                    if (allStudentTotals.get(classIndex).get(otherStudent) > currentTotal) {

                        position++;

                    }
                }

                classPositions.add(position);
            }

            allClassPositions.add(classPositions);
        }

        return allClassPositions;
    }

    public static void main(String... args) {

        int numberOfClasses = collectNumberOfClass();

        int numberOfStudents = collectNumberOfStudents();

        int numberOfSubjects = collectNumberOfSubjects();

        ArrayList<ArrayList<ArrayList<Integer>>> allClassScores =
            collectAllClassScores(numberOfClasses, numberOfStudents, numberOfSubjects);

        ArrayList<ArrayList<Integer>> allStudentTotals =
            calculateTotalStudentScore(allClassScores);

        ArrayList<ArrayList<Double>> allStudentAverages =
            calculateAverageOfStudentScore(allClassScores);

        ArrayList<ArrayList<Integer>> allStudentPositions =
            calculateStudentPosition(allStudentTotals);

        System.out.println();

        System.out.println("====================================================================");

        System.out.printf("%15s", "STUDENT");

        for (int index = 1; index <= numberOfSubjects; index++) {

            System.out.printf("%10s", "SUB" + index);

        }

        System.out.printf("%10s%10s%10s%n", "TOTAL", "AVERAGE", "POS");

        System.out.println("====================================================================");

        for (int studentClass = 0;
             studentClass < allClassScores.size();
             studentClass++) {

            System.out.println("\nCLASS " + (studentClass + 1));

            for (int studentIndex = 0;
                 studentIndex < allClassScores.get(studentClass).size();
                 studentIndex++) {

                System.out.printf("%15s", "Student " + (studentIndex + 1));

                for (int subjectIndex = 0;
                     subjectIndex < allClassScores.get(studentClass).get(studentIndex).size();
                     subjectIndex++) {

                    System.out.printf("%10d",
                        allClassScores.get(studentClass).get(studentIndex).get(subjectIndex));

                }

                System.out.printf("%10d",
                    allStudentTotals.get(studentClass).get(studentIndex));

                System.out.printf("%10.2f",
                    allStudentAverages.get(studentClass).get(studentIndex));

                System.out.printf("%10d%n",
                    allStudentPositions.get(studentClass).get(studentIndex));

            }
        }

        System.out.println("====================================================================");

    }
}

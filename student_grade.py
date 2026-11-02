def collect_number_of_classes():
    number_of_classes = int(input("How many classes do you want to record? "))
    return number_of_classes


def collect_number_of_students():
    number_of_students = int(input("How many students do you have in each class? "))
    return number_of_students


def collect_number_of_subjects():
    number_of_subjects = int(input("How many subjects do they offer? "))
    return number_of_subjects


def collect_score(subject_number):
    while True:
        student_score = int(input(f"Enter score for subject {subject_number} (0 - 100): "))

        if student_score >= 0 and student_score <= 100:
            return student_score

        print("Invalid score! Enter a score between 0 and 100.")


def collect_student_score(number_of_subjects, student_number):
    one_student_score = []

    print()
    print(f"Entering scores for student {student_number}")

    for subject_count in range(1, number_of_subjects + 1):
        score = collect_score(subject_count)
        one_student_score.append(score)

    print("Saving >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    print("Saved successfully")

    return one_student_score


def collect_class_score(number_of_students, number_of_subjects):
    all_student_score = []

    for student_count in range(1, number_of_students + 1):
        all_student_score.append(collect_student_score(number_of_subjects, student_count))

    return all_student_score


def collect_all_class_scores(number_of_classes, number_of_students, number_of_subjects):
    all_class_scores = []

    for class_count in range(1, number_of_classes + 1):
        print()
        print(f"Entering scores for Class {class_count}")

        all_class_scores.append(collect_class_score(number_of_students, number_of_subjects))

    return all_class_scores


def calculate_total_student_score(all_class_scores):
    all_student_totals = []

    for class_index in range(len(all_class_scores)):
        class_totals = []

        for student_index in range(len(all_class_scores[class_index])):
            total = 0

            for subject_index in range(len(all_class_scores[class_index][student_index])):
                total += all_class_scores[class_index][student_index][subject_index]

            class_totals.append(total)

        all_student_totals.append(class_totals)

    return all_student_totals


def calculate_average_of_student_score(all_class_scores):
    all_student_averages = []

    for class_index in range(len(all_class_scores)):
        class_averages = []

        for student_index in range(len(all_class_scores[class_index])):
            total = 0

            for subject_index in range(len(all_class_scores[class_index][student_index])):
                total += all_class_scores[class_index][student_index][subject_index]

            average = total / len(all_class_scores[class_index][student_index])
            class_averages.append(average)

        all_student_averages.append(class_averages)

    return all_student_averages


def calculate_student_position(all_student_totals):
    all_class_positions = []

    for class_index in range(len(all_student_totals)):
        class_positions = []

        for student_index in range(len(all_student_totals[class_index])):
            position = 1
            current_total = all_student_totals[class_index][student_index]

            for other_student in range(len(all_student_totals[class_index])):
                if all_student_totals[class_index][other_student] > current_total:
                    position += 1

            class_positions.append(position)

        all_class_positions.append(class_positions)

    return all_class_positions


def main():
    number_of_classes = collect_number_of_classes()
    number_of_students = collect_number_of_students()
    number_of_subjects = collect_number_of_subjects()

    all_class_scores = collect_all_class_scores(number_of_classes, number_of_students, number_of_subjects)

    all_student_totals = calculate_total_student_score(all_class_scores)
    all_student_averages = calculate_average_of_student_score(all_class_scores)
    all_student_positions = calculate_student_position(all_student_totals)

    line = "=" * 68

    print()
    print(line)

    header = f"{'STUDENT':>15}"
    for index in range(1, number_of_subjects + 1):
        header += f"{'SUB' + str(index):>10}"
    header += f"{'TOTAL':>10}{'AVERAGE':>10}{'POS':>10}"
    print(header)

    print(line)

    for student_class in range(len(all_class_scores)):
        print()
        print("CLASS " + str(student_class + 1))

        for student_index in range(len(all_class_scores[student_class])):
            row = f"{'Student ' + str(student_index + 1):>15}"

            for subject_index in range(len(all_class_scores[student_class][student_index])):
                row += f"{all_class_scores[student_class][student_index][subject_index]:>10}"

            row += f"{all_student_totals[student_class][student_index]:>10}"
            row += f"{all_student_averages[student_class][student_index]:>10.2f}"
            row += f"{all_student_positions[student_class][student_index]:>10}"

            print(row)

    print(line)


main()

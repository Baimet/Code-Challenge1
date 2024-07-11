function getStudentGrade() {
  let marks;
  while (true) {
    // Prompt the user to enter the marks
    marks = prompt("Enter the student's marks (0-100):");

    // Convert the input to a number
    marks = Number(marks);

    // Check if the marks are a valid number and within the valid range
    if (!isNaN(marks) && marks >= 0 && marks <= 100) {
      break;
    } else {
      alert("Please enter a valid number between 0 and 100.");
    }
  }

  let grade;
  if (marks > 79) {
    grade = "A";
  } else if (marks >= 60) {
    grade = "B";
  } else if (marks >= 50) {
    grade = "C";
  } else if (marks >= 40) {
    grade = "D";
  } else {
    grade = "E";
  }

  // Output the grade
  alert(`The grade for marks ${marks} is: ${grade}`);
}

getStudentGrade();

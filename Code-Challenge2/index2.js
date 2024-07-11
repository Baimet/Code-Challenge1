// defining the speed input, input type and result
function checkSpeed() {
  const speedInput = document.getElementById("speed").value;
  const resultElement = document.getElementById("result");
  const speed = Number(speedInput);

  //checking if the speed is not of the correct input
  if (isNaN(speed) || speed < 0) {
    resultElement.textContent = "Please enter a valid speed.";
    return;
  }

  //defining the limit dimensions
  if (speed <= 70) {
    resultElement.textContent = "Ok";
  } else {
    const demeritPoints = Math.floor((speed - 70) / 5);
    if (demeritPoints > 12) {
      resultElement.textContent = "License suspended!";
    } else {
      resultElement.textContent = `Points: ${demeritPoints}`;
    }
  }
}

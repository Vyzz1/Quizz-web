export const Answer_Reveal = (questions, answers) => {
  let selected = answers[answers.length - 1].selectedAnswers;
  const check = [];
  const correctAnswers = [];
  questions.forEach((value) => {
    correctAnswers.push(value.correctAnswer);
  });

  for (let i = 0; i < selected.length; i++) {
    if (selected[i] === correctAnswers[i]) {
      check.push(true);
    } else if (!isNaN(selected[i])) {
      if (correctAnswers[i] !== selected[i]) {
        check.push(false);
      }
    } else if (isNaN(selected[i])) {
      check.push(NaN);
    }
  }
  return check;
};

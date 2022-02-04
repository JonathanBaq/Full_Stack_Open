//Result Interface
interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
//Overall rating interface
interface Rating {
  score: number,
  description: string
}
//CLI arguments interface
interface ExerciseValues {
  target: number;
  hours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Minimum is 1 day of exercise');
  if (args.length > 17) throw new Error('Maximum argument is 2 weeks of exercise');

  const numberArray = [];

  if (!isNaN(Number(args[2]))) {
    for (let i = 3; i <= args.length - 1; i++) {
      if (!isNaN(Number(args[i]))) {
        numberArray.push(Number(args[i]));
      } else {
        throw new Error('Provided values were not numbers');
      }
    }

    return (
      {
        target: Number(args[2]),
        hours: numberArray
      }
    );
  } else {
    throw new Error('Provided target value was not a number');
  }
};

const isSuccessful = (average: number, target: number): boolean => {
  return average >= target ? true : false;
};

const getRating = (average: number): Rating => {
  if (average >= 1) {
    return (
      {
        score: 3,
        description: 'You are doing great, keep it up!'
      }
    );
  } else if (average >= 0.5) {
    return (
      {
        score: 2,
        description: 'You are doing good, push yourself to do more!'
      }
    );
  } else {
    return (
      {
        score: 1,
        description: 'Reflect on your goals and re-focus, you can do it!'
      }
    );
  }
};

export const exerciseCalculator = (target: number, dailyHours: Array<number>): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours != 0).length;
  const average = dailyHours.reduce((prev, current) => prev + current) / periodLength;
  const success = isSuccessful(average, target);
  const rating = getRating(average);

  return (
    {
      periodLength,
      trainingDays,
      success,
      rating: rating.score,
      ratingDescription: rating.description,
      target,
      average
    }
  );
};

try {
  const { target, hours } = parseExerciseArguments(process.argv);
  console.log(hours);
  console.log(exerciseCalculator(target, hours));
} catch (error: unknown) {
  const errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    console.log(`${errorMessage} Error: ${error.message}`);
  }
}

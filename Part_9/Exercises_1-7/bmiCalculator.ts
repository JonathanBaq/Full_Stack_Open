//Interface for parsing CLI arguments
interface BmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (Number(args[2]) < 10) {
      throw new Error('Height must be in centimeters')
    }

    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

//BMI = kg/m^2
const bmiCalculator = (height: number, weight: number): string => {
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (Healthy Weight)'
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight'
  } else {
    return 'Obesity'
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(bmiCalculator(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong'
  if (error instanceof Error) {
    console.log(`${errorMessage} Error: ${error.message}`);
  }
}

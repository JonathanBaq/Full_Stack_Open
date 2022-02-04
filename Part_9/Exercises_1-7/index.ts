import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || typeof height === undefined || typeof weight === undefined) {
    res.send({ error: 'malformatted parameters' })
  } else {
    const bmi = bmiCalculator(height, weight)
    res.send({
      weight, height, bmi
    });
  }
});

app.post('/exercises', (req, res) => {
  const target = req.body.target;
  const dailyHours = req.body.daily_exercises;

  if (!isNaN(target) && Array.isArray(dailyHours)) {
    const result = exerciseCalculator(target, dailyHours);
    res.send(result);
  } else if (!target || !dailyHours) {
    res.send({ error: 'parameters missing' });
  } else {
    res.send({ error: 'malformatted parameters' });
  }
});
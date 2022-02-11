import diagnosesData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const allDiagnoses: Array<Diagnosis> = diagnosesData;

const getAllDiagnoses = (): Array<Diagnosis> => {
  return allDiagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getAllDiagnoses,
  addDiagnosis
};
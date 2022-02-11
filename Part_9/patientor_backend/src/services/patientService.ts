import patientsData from '../../data/patients.json';

import { Patient, NonSensitivePatientInfo } from '../types';

const allPatients: Array<Patient> = patientsData;

const getAllPatients = (): Array<Patient> => {
  return allPatients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id, 
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addDiagnosis = () => {
  return null;
};

export default {
  getAllPatients,
  addDiagnosis,
  getNonSensitivePatientInfo
};
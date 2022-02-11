export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

//Patients
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

//Patient without ssn
export type NonSensitivePatientInfo = Omit<Patient, 'ssn'>;

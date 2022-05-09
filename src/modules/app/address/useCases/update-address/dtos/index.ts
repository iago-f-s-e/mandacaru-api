export type UpdateAddressDTO = {
  id: string;
  userId?: string;
  subjectId?: string;
  state: string;
  city: string;
  district: string;
  street: string;
  zipCode: string;
  number?: number;
  complement?: string;
};

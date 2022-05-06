type Composition = {
  alimentId: string;
  measureId: string;
  quantity: number;
};

export type RecipeToClientDTO = {
  id: string;
  name: string;
  gram: number;
  referenceId: string;
  preparationMethod: string;
  compositions: Composition[];
};

export type Params = { [key: string]: string | undefined };

type QueryGenerated = { params: Params; query: string };

function getValue(value: string | undefined): string {
  if (!value) return '%%';

  return `${value.toUpperCase()}%`;
}

function getCondition(name: string, key: string): string {
  return `${name}.${key} ilike :${key}`;
}

export function iLikeGenerator(data: Params, entityName: string): QueryGenerated {
  const params: Params = {};
  const conditions: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    params[key] = getValue(value);
    conditions.push(getCondition(entityName, key));
  }

  const query = conditions.join(' AND ');

  return { params, query };
}

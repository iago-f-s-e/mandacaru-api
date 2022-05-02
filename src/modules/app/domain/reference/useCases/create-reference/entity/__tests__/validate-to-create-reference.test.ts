import { ValidateToCreateReference } from '..';

describe('Validate to create reference', () => {
  it('must be possible to validate the reference if received value is correct', () => {
    const validated = new ValidateToCreateReference({ abbreviation: 'abb', name: 'name' });

    expect(Object.isFrozen(validated.value)).toBeTruthy();
    expect(validated.value).toMatchObject({ abbreviation: 'abb', name: 'NAME' });
  });

  it('must not be possible to validate a invalid reference (name)', () => {
    expect(() => new ValidateToCreateReference({ abbreviation: 'abb', name: 'x' })).toThrow(
      'The name "x" is invalid'
    );
  });

  it('must not be possible to validate a invalid reference (abbreviation)', () => {
    expect(() => new ValidateToCreateReference({ abbreviation: 'abb', name: 'x' })).toThrow(
      'The name "x" is invalid'
    );
  });
});

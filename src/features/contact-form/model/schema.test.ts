import { describe, expect, it } from 'vitest';
import { createContactSchema } from './schema';

// Use the translation key itself as the message, so assertions stay locale-free.
const schema = createContactSchema((key) => key);

describe('createContactSchema', () => {
  it('accepts a valid submission', () => {
    const result = schema.safeParse({
      name: 'John Carter',
      phone: '+998 90 123 45 67',
      message: 'Hello there',
    });
    expect(result.success).toBe(true);
  });

  it('defaults an omitted message to an empty string', () => {
    const result = schema.safeParse({
      name: 'John Carter',
      phone: '+998901234567',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).toBe('');
    }
  });

  it('rejects an empty name', () => {
    const result = schema.safeParse({ name: '', phone: '+998901234567' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid phone number', () => {
    const result = schema.safeParse({ name: 'John', phone: 'not-a-phone' });
    expect(result.success).toBe(false);
  });

  it('rejects a message longer than 1000 characters', () => {
    const result = schema.safeParse({
      name: 'John',
      phone: '+998901234567',
      message: 'x'.repeat(1001),
    });
    expect(result.success).toBe(false);
  });
});

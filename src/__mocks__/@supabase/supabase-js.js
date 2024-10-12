export const createClient = jest.fn(() => ({
  from: jest.fn(() => ({
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
    insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
    update: jest.fn().mockResolvedValue({ data: {}, error: null }),
    delete: jest.fn().mockResolvedValue({ data: {}, error: null }),
  })),
  auth: {
    signIn: jest.fn().mockResolvedValue({ user: {}, session: {}, error: null }),
    signOut: jest.fn().mockResolvedValue({ error: null }),
  },
}));

import { mockUser } from '../mocks/users';
import type { User } from '../types';
import { delay } from '../utils/format';

const AUTH_KEY = 'caixa_auth_user';

export async function loginWithSSO(): Promise<User> {
  await delay(1200);
  const user = mockUser;
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function getStoredUser(): User | null {
  const stored = sessionStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return getStoredUser() !== null;
}

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_ROLE_LIST = Object.values(USER_ROLES);

export const userRolesString = USER_ROLE_LIST.map((r) => `"${r}"`).join(' ou ');

export type TUserType = 'admin' | 'user' | 'manager';

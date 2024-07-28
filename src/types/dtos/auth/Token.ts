export type TokenDTO = {
  storeId: string;
  account: string;
  token: string;
  expiresAt: Date;
  userType: UserType;
};

export type UserType = {
  type: string;
};

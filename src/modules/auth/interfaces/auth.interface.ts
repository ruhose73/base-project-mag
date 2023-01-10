export interface Login {
  login: string;
  password: string;
}

export interface Register {
  login: string;
  password: string;
  name: string;
}

export interface UpdatePasswordPayload {
  id: string;
  newPassword: string;
}

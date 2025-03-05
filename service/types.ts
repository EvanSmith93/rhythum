export type User = {
  email: string;
  password: string;
  token?: string;
  sessionIds: string[];
};

export type Session = {
  _id: string;
  code: string;
  activityChanges: Date[];
  hasEnded: boolean;
  userEmails: string[];
};

export type Quote = {
  text: string;
  author: string;
};

export type Session = {
  id: string;
  code: string;
  activityChanges: Date[];
  hasEnded: boolean;
};

export type User = {
  email: string;
  username: string;
  passwordHash: string;
  sessionIds: string[];
};

export type Quote = {
  text: string;
  author: string;
};

export type Session = {
  _id: string;
  code: string;
  activityChanges: Date[];
  hasEnded: boolean;
  userEmails: string[];
};

export type User = {
  email: string;
  sessionIds: string[];
};

export type Message = {
  title: string;
  body: string;
};

export type Quote = {
  text: string;
  author: string;
};

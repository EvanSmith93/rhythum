export type Session = {
  id: string;
  code: string;
  activityChanges: Date[];
  hasEnded: boolean;
  userEmails: string[];
};

export type User = {
  id: string; // TODO: remove the id once local storage is not being used
  email: string;
  sessionIds: string[];
};

export type Message = {
  title: string;
  body: string;
}

export type Quote = {
  text: string;
  author: string;
};

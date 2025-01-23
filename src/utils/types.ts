export type Session = {
  id: string;
  code: string;
  activityChanges: Date[];
  hasEnded: boolean;
};

export type Quote = {
  text: string;
  author: string;
}
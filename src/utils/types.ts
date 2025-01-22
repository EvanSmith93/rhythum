export type Session = {
  id: string;
  code: string;
  activityChanges: Date[];
  hasEnded: boolean;
};

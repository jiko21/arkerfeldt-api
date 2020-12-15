export type PostFilterParam = {
  status?: PublishStatus;
  title?: string;
};

export enum PublishStatus {
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}

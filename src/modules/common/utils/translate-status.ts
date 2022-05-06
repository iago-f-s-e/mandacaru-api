import { Status, UserStatus } from '../types/entities';

export function translateUserStatus(status: Status): UserStatus {
  const useStatus: { [key in Status]: UserStatus } = {
    1: 'TEMPORARY',
    2: 'PENDING',
    3: 'PERMANENT',
    4: 'REJECTED',
    5: 'DELETED'
  };

  return useStatus[status];
}

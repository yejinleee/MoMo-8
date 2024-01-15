import { useEffect, useMemo, useState } from 'react';
import type { NotificationExtractType } from '../Notification';
import GetNotificationsWorker from '../utils/getNotificationsInterval?worker';
import { getItem } from '@/utils/storage';
import { isEqual } from 'lodash';

export const useNotification = () => {
  const getNotifications: Worker = useMemo(
    () => new GetNotificationsWorker(),
    [],
  );

  const [notifications, setNotifications] = useState<NotificationExtractType[]>(
    [],
  );

  useEffect(() => {
    getNotifications.postMessage(getItem('JWT', ''));

    return () => {
      getNotifications.postMessage('stop');
    };
  }, []);

  useEffect(() => {
    getNotifications.onmessage = (e: MessageEvent<NotificationExtractType[]>) =>
      setNotifications((prevState) =>
        isEqual(prevState, e.data) ? prevState : e.data,
      );
  }, [getNotifications]);

  return notifications;
};

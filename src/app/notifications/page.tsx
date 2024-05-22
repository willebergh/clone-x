"use client";

import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@/lib/axios";
import { Notification } from "@prisma/client";
import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";

export default () => {
  const queryClient = useQueryClient();

  const notifications = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api.getNotifications(),
  });

  const readAllNotification = useMutation({
    mutationFn: () => api.readNotifications(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["unreadNotifications"],
      }),
  });

  useEffect(() => {
    readAllNotification.mutate();
  }, []);

  return (
    <>
      <PageTitle content="Notifications" />

      {notifications.isLoading && <Loading />}

      {notifications.isSuccess &&
        notifications.data.map((n: Notification) => (
          <p className="p-4 border-b border-black">{n.content}</p>
        ))}
    </>
  );
};

"use client";

import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import api from "@/lib/axios";
import { Notification } from "@prisma/client";
import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";

const NotificationPage = () => {
  const queryClient = useQueryClient();
  const { status, data } = useSession();

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
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [data, status]);

  useEffect(() => {
    if (readAllNotification.isIdle) {
      readAllNotification.mutate();
    }
  }, [readAllNotification]);

  return (
    <>
      <PageTitle content="Notifications" />

      {notifications.isLoading && <Loading />}

      {notifications.isSuccess &&
        notifications.data.map((n: Notification) => (
          <p key={n.id} className="p-4 border-b border-black">
            {n.content}
          </p>
        ))}
    </>
  );
};

export default NotificationPage;

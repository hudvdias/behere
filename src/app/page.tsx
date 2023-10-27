"use client";

import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

const HomePage: NextPage = () => {
  const [nextNotificationTime, setNextNotificationTime] = useState<Date | null>(null);

  const getNotificationPermission = useCallback(async () => {
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  }, []);

  const getNextNotificationTime = useCallback(() => {
    const now = new Date();
    const minutes = now.getMinutes();
    const minutes_last_digit = minutes % 10;
    const minutes_left_to_be_10_multiple = 10 - minutes_last_digit;
    const minutes_already_10_multiple = minutes_last_digit === 0;
    const next_10_minutes_multiple = minutes_already_10_multiple
      ? minutes + 10
      : minutes + minutes_left_to_be_10_multiple;

    const nextTime = new Date();
    nextTime.setMinutes(next_10_minutes_multiple, 0, 0);

    setNextNotificationTime(nextTime);
  }, []);

  useEffect(() => {
    getNotificationPermission();
    getNextNotificationTime();
  }, []);

  useEffect(() => {
    let intervalCount = 1 * 1000; // 1 second

    const interval = setInterval(() => {
      const now = new Date();

      const isTimeToNotification = now.getMinutes() === nextNotificationTime?.getMinutes();

      if (!isTimeToNotification) {
        return;
      }

      new Notification("Be here! :)");

      getNextNotificationTime();
    }, intervalCount);

    return () => clearInterval(interval);
  }, [nextNotificationTime]);

  return (
    <main className="flex w-screen h-screen items-center justify-center flex-col gap-10 bg-slate-800 text-white">
      <h1 className="text-3xl font-bold">Behere</h1>

      <p>Esse app o notiicará a cada hora multipla de 10 minutos, para que você se mantenha ciente do tempo.</p>

      <q className="italic text-slate-400">O tempo é implacável.</q>

      <p className="w-full justify-center max-w-sm flex bg-slate-700 border rounded border-slate-500 px-6 h-10 items-center">
        Próxima notificação: {nextNotificationTime?.toLocaleTimeString()}
      </p>
    </main>
  );
};

export default HomePage;

import { TelegramWebApps } from "telegram-webapps";

export const getUsername = (tgUser: TelegramWebApps.WebAppUser) => {
  if (tgUser) {
    return (
      tgUser?.username ||
      `${tgUser?.first_name || ""} ${tgUser?.last_name || ""}`.trim()
    );
  }
  return "Unknown";
};

const THREE_DAYS_IN_MS =  60 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();

export const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

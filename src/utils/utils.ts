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

export const formattedDate = (isoString: string) => {
  const date = new Date(isoString);

  const formattedDate =
    String(date.getDate()).padStart(2, "0") +
    "." +
    String(date.getMonth() + 1).padStart(2, "0") +
    "." +
    date.getFullYear() +
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0");

  return formattedDate;
};

export const newYearDate = "2025-01-01T00:00:00Z";

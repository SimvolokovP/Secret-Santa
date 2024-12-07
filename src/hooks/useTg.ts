const tg = Telegram.WebApp;

export function useTg() {
  const user = tg.initDataUnsafe.user;

  return {
    tg,
    user,
  };
}

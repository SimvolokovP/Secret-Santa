import { FC } from "react";

const ShareBtn: FC = () => {
  const handleInviteFriend = () => {
    const inviteLink = `https://t.me/ShopTest123789_bot`;
    const shareText = `Присоединяйся к игре`;
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(fullUrl);
  };
  return (
    <button className="btn-reset btn" onClick={handleInviteFriend}>
      Пригласить друзей
    </button>
  );
};

export default ShareBtn;

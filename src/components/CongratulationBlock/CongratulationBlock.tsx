import { FC } from "react";
import { IUser } from "../../models/IUser";

import './CongratulationBlock.scss'

interface CongratulationBlockProps {
  targetUser: IUser | null;
}

const CongratulationBlock: FC<CongratulationBlockProps> = ({ targetUser }) => {
  return (
    <div className="congratulation">
      <span className="congratulation__title">Поздравление от {targetUser?.form && targetUser?.form[0].name}</span>
      <div className="congratulation__body">{targetUser?.form && targetUser.form[0].text}</div>
    </div>
  );
};

export default CongratulationBlock;

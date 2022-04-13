import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { useHistory } from "react-router-dom";
const EachTransList = ({ each }) => {
  const history = useHistory();
  return (
    <tr
      onClick={() =>
        history.push({
          pathname: `/transDetail/${each.id}/`,
        })
      }
    >
      <td className="">{each.content}</td>
      <td className="">{each.user.nickName}</td>
      <td className="wholeList__tableDate">{each.registerDate.slice(0, 10)}</td>
      <td className="wholeList__tableThumbs">
        {each.thumbJudge ? <FaThumbsUp /> : <FaRegThumbsUp />}
        {each.thumbCount}개
      </td>
    </tr>
  );
};
export default EachTransList;

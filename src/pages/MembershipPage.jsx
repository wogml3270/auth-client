import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const MembershipPage = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      <h1>맴버십 정보</h1>
      {user ? (
        <div>
          <p>
            유저 아이디: <span style={{ color: "blue" }}>{user?.userId}</span>
          </p>
          <p>
            유저 이름: <span style={{ color: "blue" }}>{user?.username}</span>
          </p>
          <p>
            맴버십 아이디:{" "}
            <span style={{ color: "blue" }}>{user?.membership.id}</span>
          </p>
          <p>
            가입한 맴버십 이름:{" "}
            <span style={{ color: "red" }}>{user?.membership.name}</span>
          </p>
          <p>
            이용 가능 혜택:{" "}
            {user?.membership?.features.map((feature) => (
              <span
                key={feature}
                style={{ color: "green", marginRight: "10px" }}
              >
                [{feature}]
              </span>
            ))}
          </p>
        </div>
      ) : (
        <div>
          <p>로그인을 해주세요</p>
          <Link to="sign-in" />
        </div>
      )}
    </div>
  );
};

export default MembershipPage;

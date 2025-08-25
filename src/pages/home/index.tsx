import { memo } from "react";
import UserView from "../../components/user/user-view";

const Home = () => {
  return (
    <div className="home">
      <UserView />
    </div>
  );
};

export default memo(Home);

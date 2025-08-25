import { memo } from "react";
import UserSubmit from "../../components/user/user-submit";

const Register = () => {
  return (
    <div className="Register">
      <UserSubmit />
    </div>
  );
};

export default memo(Register);

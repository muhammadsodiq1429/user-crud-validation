import { memo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUser } from "../../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../lib/store";
import type { IUserResponse } from "../../types/type";
import { setUpdatingUser } from "../../lib/features/user-update-slice";

export interface IFormData {
  full_name: string;
  email: string;
  username: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  gender: /* "male" | "female" | "prefer_not_to_say" */ string;
}
const initialState = {
  full_name: "",
  email: "",
  username: "",
  phone_number: "",
  password: "",
  confirm_password: "",
  gender: "",
};

const UserSubmit = () => {
  const dispatch = useDispatch();
  const user: IUserResponse = useSelector(
    (state: RootState) => state.userUpdateSlice.value
  );
  const userSchema = yup
    .object({
      full_name: yup.string().required().min(2),
      email: yup.string().required().email(),
      username: yup.string().required().min(5),
      phone_number: yup.string().required().min(9).max(9),
      password: user
        ? yup.string().default("")
        : yup.string().required().min(8),
      confirm_password: user
        ? yup.string().default("")
        : yup.string().required(),
      gender: yup.string().required(),
    })
    .required();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<IFormData>({
    mode: "all",
    resolver: yupResolver(userSchema),
    defaultValues: user ? user : initialState,
  });

  const {
    confirm_password,
    email,
    full_name,
    password,
    phone_number,
    username,
  } = errors;

  const { createUser, updateUser } = useUser();
  const error: any = createUser.error;

  const onSubmit = (data: any) => {
    if (user) {
      const { confirm_password, password, is_active, id, ...userData } = data;
      updateUser.mutate(
        { id: user.id, data: userData },
        {
          onSuccess: () => {
            dispatch(setUpdatingUser(null));
            alert("User updated successfully");
            reset(initialState);
          },
        }
      );
    } else {
      const { confirm_password, ...userData } = data;
      createUser.mutate(userData, {
        onSuccess: () => {
          alert("User added successfully");
          reset();
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 mx-auto place-self-center mt-20 bg-white text-black *:placeholder:text-gray-300 p-5 rounded-lg w-[600px]"
    >
      <h2 className="text-3xl font-medium">Registration</h2>

      <div className={`grid grid-cols-2 ${user ? "" : "gap-7"} items-center`}>
        <div className={`grid gap-4 ${user ? "mr-7" : ""}`}>
          <div>
            <label>
              <p className=" font-semibold text-sm">Full Name</p>
              <input
                {...register("full_name")}
                className={`px-3 py-2 border border-gray-200 rounded-lg w-[100%] mt-1.5 ${
                  full_name ? "border border-red-500" : ""
                }`}
                type="text"
                placeholder="Enter your name"
              />
              {full_name ? (
                <p className="text-red-500">{full_name.message}</p>
              ) : (
                ""
              )}
            </label>
          </div>

          <div>
            <label>
              <p className=" font-semibold text-sm">Email</p>
              <input
                {...register("email")}
                className={`px-3 py-2 border border-gray-200 rounded-lg w-[100%] mt-1.5 ${
                  email ? "border border-red-500" : ""
                }`}
                type="text"
                placeholder="Enter your email"
              />
              {email ? <p className="text-red-500">{email.message}</p> : ""}
            </label>
          </div>
          {!user && (
            <div>
              <label>
                <p className=" font-semibold text-sm">Password</p>
                <input
                  {...register("password")}
                  className={`px-3 py-2 border border-gray-200 rounded-lg w-[100%] mt-1.5 ${
                    password ? "border border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Enter your email"
                />
                {password ? (
                  <p className="text-red-500">{password.message}</p>
                ) : (
                  ""
                )}
              </label>
            </div>
          )}
        </div>
        <div className="grid gap-4">
          <div>
            <label>
              <p className=" font-semibold text-sm">Username</p>
              <input
                {...register("username")}
                className={`px-3 py-2 border border-gray-200 rounded-lg w-[100%] mt-1.5 ${
                  username ? "border border-red-500" : ""
                }`}
                type="text"
                placeholder="Enter your username"
              />
              {username ? (
                <p className="text-red-500">{username.message}</p>
              ) : (
                ""
              )}
            </label>
          </div>

          <div>
            <label>
              <p className=" font-semibold text-sm">Phone Number</p>
              <input
                {...register("phone_number")}
                className={`px-3 py-2 border border-gray-200 rounded-lg w-[100%] mt-1.5 ${
                  phone_number ? "border border-red-500" : ""
                }`}
                type="number"
                placeholder="Enter your number"
              />
              {phone_number ? (
                <p className="text-red-500">{phone_number.message}</p>
              ) : (
                ""
              )}
            </label>
          </div>

          {!user && (
            <div>
              <label>
                <p className=" font-semibold text-sm">Confirm Password</p>
                <input
                  {...register("confirm_password")}
                  className={`px-3 py-2 border border-gray-200 rounded-lg w-[100%] mt-1.5 ${
                    confirm_password ? "border border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Enter your password"
                />
                {confirm_password ? (
                  <p className="text-red-500">{confirm_password.message}</p>
                ) : (
                  ""
                )}
              </label>
            </div>
          )}
        </div>
        <div className="">
          {error?.response?.data.message?.map((error: string) => (
            <p className="text-red-500">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl mb-2">Gender</h3>
        <div className="flex gap-14">
          <label className="flex items-center gap-2">
            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="id-male"
              value="male"
              defaultChecked
            />
            <span>Male</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="id-female"
              value="female"
            />
            <span>Female</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="id-prefer_not_to_say"
              value="prefer_not_to_say"
            />
            <span>Prefer not to say</span>
          </label>
        </div>
      </div>

      <button className="w-full cursor-pointer dark:text-white bg-linear-to-tr dark:from-[#090979] from-[#9dc1fa] to-[#00d4ff] dark:to-[#020024] py-2 font-bold">
        Register
      </button>
    </form>
  );
};

export default memo(UserSubmit);

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/userApi";
import { UserContext } from "../../context/userContext";
import "../../style/buttons.css";
//work ok
const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmitLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      console.log(
        "At handleSubmitLogin the email & password are:",
        username,
        password
      );
      const response = await login(username, password);
      if (!response) {
        window.alert(
          "login failed! check your username or password or please register first"
        );
        throw new Error("login failed, please register first");
      }
      setUser(username);
      navigate(`/userPage`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmitLogin}>
        <div className="m-6">
          <label className="text-2xl">Please enter your User Name</label>
          <div className="input_container">
            <input
              className="border border-black m-2"
              type="username"
              name="username"
              autoComplete="given-name"
              value={username}
              onInput={(ev) =>
                setUsername((ev.target as HTMLInputElement).value)
              }
            />
          </div>
        </div>
        <div className="m-6">
          <label className="text-2xl">Please enter your Password</label>
          <div className="input_container">
            <input
              className="border border-black m-2 "
              type="password"
              name="password"
              autoComplete="off"
              value={password}
              onInput={(ev) =>
                setPassword((ev.target as HTMLInputElement).value)
              }
            ></input>
          </div>
        </div>
        <button className="login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

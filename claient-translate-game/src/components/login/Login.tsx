import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/users/userApi";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  // const { setUser } = useContext(UserContext);

  const handleSubmitLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      console.log(
        "At handleSubmit login the email & password are:",
        username,
        password
      );
      const data = await login(username, password);
      if (!data) {
        window.alert(
          "login failed! check your username or password or please register first"
        );
        throw new Error("login failed, please register first");
      }

      const userData = data.data.userData;
      if (!userData) throw new Error("at handleSubmitLogin userData failed");

      // setUser(userData);

      navigate(`/main/homePage`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmitLogin}>
        <label>User Name</label>
        <div className="input_container">
          <input
            type="username"
            name="username"
            autoComplete="given-name"
            placeholder="username"
            value={username}
            onInput={(ev) => setUsername((ev.target as HTMLInputElement).value)}
          />
        </div>
        <label>Password</label>
        <div className="input_container">
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            value={password}
            onInput={(ev) => setPassword((ev.target as HTMLInputElement).value)}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
      <button
        className="RegisterFirst"
        onClick={() => {
          navigate("/register");
        }}
      >
        Register First
      </button>
    </div>
  );
};

export default Login;

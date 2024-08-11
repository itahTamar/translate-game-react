import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/userApi";
import { UserContext } from "../../context/userContext";
import "../../style/buttons.css";
import { ServerContext } from "../../context/ServerUrlContext";

//work ok
const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const { serverUrl } = useContext(ServerContext);

  const handleSubmitLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      console.log(
        "At handleSubmitLogin the username & password are:",
        username,
        password
      );
      const response = await login(serverUrl, username, password);
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

  const toggleVisibility = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setVisible((prevVisible) => {
      const newVisible = !prevVisible
      if (newVisible) {
        const id = setTimeout(() => setVisible(false), 2000);
        //@ts-ignore
        setTimeoutId(id);
      }
      return newVisible;
    });
  };

  return (
    <div>
      <form className="relative top-24" onSubmit={handleSubmitLogin}>
        <h1 className="text-4xl pb-5">Welcome Guest</h1>
        <div className="m-6">
          <label className="text-2xl">Please enter your UserName</label>
          <div>
            <input
              className="border border-black m-2 rounded-2xl w-72 indent-4"
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
          <div>
            <input
              className="border border-black m-2 rounded-2xl w-72 relative left-4 indent-4"
              type={visible ? "text" : "password"}
              name="password"
              autoComplete="off"
              value={password}
              onInput={(ev) =>
                setPassword((ev.target as HTMLInputElement).value)
              }
            ></input>
            <button
              type="button"
              className="emoji-button visible "
              onClick={() => toggleVisibility()}
            >
              <span className="emoji">&#128065;</span>
              {visible ? <span className="slash">/</span> : null}
            </button>
          </div>
        </div>
        <button className="login text-xl" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;

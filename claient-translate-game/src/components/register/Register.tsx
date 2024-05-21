import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/userApi";
import '../../style/buttons.css'

const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmitRegister = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      const data = { userName, password };
      if (!data) throw new Error("register failed - no email or password");
      const response = await register(userName, password);
      if (!response) throw new Error("register failed from server");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmitRegister}>
          <div className="input_container">
            <div className="icon_container"></div>
            <input className="border border-black m-2"
              type="userName"
              name="userName"
              autoComplete="given-name"
              placeholder="UserName" //must be uniq
              value={userName}
              onInput={(ev) =>
                setUserName((ev.target as HTMLInputElement).value)
              }
            />
          </div>
          <div className="input_container">
            <div className="icon2_container"></div>
            <input className="border border-black m-2"
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Password"
              value={password}
              onInput={(ev) =>
                setPassword((ev.target as HTMLInputElement).value)
              }
            ></input>
          </div>
          <button className="registerBtn"
             type="submit"
          >
            Register
          </button>
        </form>
      
        <button className="backBtn" onClick={() => navigate('/')}>Back</button>
      </div>
    </>
  );
};

export default Register;

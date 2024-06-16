import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/userApi";
import "../../style/buttons.css";

const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [match, setMatch] = useState(false);

  const validate = () => {
    if (password == confirmPassword) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };

  useEffect(() => {
    validate();
  }, [confirmPassword, password]);

  const handleSubmitRegister = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      if (password === confirmPassword) {
        const data = { userName, password };
        if (!data) throw new Error("register failed - no email or password");
        const response = await register(userName, password);
        if (!response) throw new Error("register failed from server");
        navigate("/");
      } else {
        alert("Passwords not match, please check it out");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen">
        <button
          className="absolute top-8 left-16"
          onClick={() => navigate("/")}
        >
          Back
        </button>

        <form className="relative top-64" onSubmit={handleSubmitRegister}>
          <div className="input_container">
            <div className="icon_container"></div>
            <input
              className="border border-black m-2 text-2xl"
              type="userName"
              name="userName"
              autoComplete="given-name"
              placeholder="Choose a UserName" //must be uniq
              value={userName}
              onInput={(ev) =>
                setUserName((ev.target as HTMLInputElement).value)
              }
            />
          </div>

          <div className="input_container">
            <div className="icon2_container"></div>
            <input
              className="border border-black m-2 text-2xl"
              type={visible ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Choose your Password"
              value={password}
              onInput={(ev) =>
                setPassword((ev.target as HTMLInputElement).value)
              }
            ></input>
            <button type="button" className="" onClick={() => setVisible(!visible)}></button>
            {/* <p>chose password as you wish</p> */}
          </div>
          

          <div>
            <input
              className="border border-black m-2 text-2xl"
              type={visibleConfirm ? "text" : "confirmPassword"}
              id="confirmPassword"
              value={confirmPassword}
              name="confirmPassword"
              autoComplete="off"
              placeholder="Enter your Password again"
              onInput={(ev) =>
                setConfirmPassword((ev.target as HTMLInputElement).value)
              }
            ></input>
          </div>
          <button type="button" className="" onClick={() => setVisibleConfirm(!visibleConfirm)}>SEE</button>

          <p>{!match ? "password not matched!" : null}</p>
          <button className="registerBtn" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/userApi";
import "../../style/buttons.css";
import "../../style/register.css";

const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [match, setMatch] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

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

  const toggleVisibility = (type: "password" | "confirmPassword") => {
    if (timeoutId) clearTimeout(timeoutId);

    if (type === "password") {
      setVisible((prevVisible) => {
        if (!prevVisible) {
          const id = setTimeout(() => setVisible(false), 2000);
          //@ts-ignore
          setTimeoutId(id);
        }
        return !prevVisible;
      });
      setVisibleConfirm(false);
    } else if (type === "confirmPassword") {
      setVisibleConfirm((prevVisibleConfirm) => {
        if (!prevVisibleConfirm) {
          const id = setTimeout(() => setVisibleConfirm(false), 2000);
          //@ts-ignore
          setTimeoutId(id);
        }
        return !prevVisibleConfirm;
      });
      setVisible(false);
    }
  };

  return (
    <>
      <div className="h-screen w-screen register-container">
        <button
          className="absolute top-8 left-16"
          onClick={() => navigate("/")}
        >
          Back
        </button>

        <form className="custom-form relative" onSubmit={handleSubmitRegister}>
          <div className="">
            <div className="icon_container"></div>
            <input
              className="border border-black m-2 rounded-2xl w-72 h-12 relative indent-4"
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

          <div className="relative left-4">
            <input
              className="border border-black m-2 rounded-2xl w-72 h-12 relative indent-4"
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
            <button
              type="button"
              className="emoji-button visible right-12"
              onClick={() => toggleVisibility("password")}
            >
              <span className="emoji">&#128065;</span>
              {visible ? <span className="slash">/</span> : null}
            </button>
          </div>

          <div className="relative left-4">
            <input
              className="border border-black m-2 rounded-2xl w-72 h-12 relative indent-4"
              type={visibleConfirm ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              name="confirmPassword"
              autoComplete="off"
              placeholder="Enter your Password again"
              onInput={(ev) =>
                setConfirmPassword((ev.target as HTMLInputElement).value)
              }
            ></input>
            <button
              type="button"
              className="emoji-button visible right-12"
              onClick={() => toggleVisibility("confirmPassword")}
            >
              <span className="emoji">&#128065;</span>
              {visibleConfirm ? <span className="slash">/</span> : null}
            </button>
          </div>

          <p>{!match ? "password are not matched!" : null}</p>
          <button className="registerBtn text-xl" type="submit">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;

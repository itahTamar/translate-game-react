// 1) render a list of all user words, with the option to update or delete a word (like in the books project) ->done
// 2) Add a new word form in popup -> done
// 3) render the user highest score -> done
// 4) Start paly button -> done
// 5) Log-out button will move the user back to landing page and delete the data from cookie -> done
// 6) make the render-word a lazy-load

import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { getUserHighScore } from "../api/userApi";
import { UserContext } from "../context/userContext";
import "../style/buttons.css";
import "../style/userPage.css";

const UserPage = () => {
  // const [highScore, setHighScore] = useState<number>();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // const handleGetUserHighScore = async () => {
  //   try {
  //     const response: number = await getUserHighScore(serverUrl);
  //     console.log("at userPage/handleGetUserHighScore the response:", response);
  //     console.log(
  //       "at userPage/handleGetUserHighScore the user in context:",
  //       user
  //     );
  //     if (!response && response != 0)
  //       throw new Error(
  //         "No response from axios getHighestUserScores at handleGetUserHighScore"
  //       );
  //     setHighScore(response);
  //     console.log(
  //       "at userPage/handleGetUserHighScore the highScore:",
  //       highScore
  //     );
  //   } catch (error) {
  //     console.error(error, "at handleGetUserHighScore got a catch");
  //   }
  // }; //work ok

  // useEffect(() => {
  //   handleGetUserHighScore();
  // }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/");
  };

  return (
    <>
      <div className="userPage-container">
        <h1 className="p-4 font-bold text-7xl drop-shadow-2xl">Welcome</h1>
        <h1 className="p-4 font-bold text-7xl drop-shadow-2xl">{user}</h1>
        <button className="logout" onClick={handleLogout}>
            LogOut
          </button>
        <div className="inner-container">
          <div>
            <button
              className="play text-2xl rounded-3xl"
              onClick={() => {
                navigate("/playGame/");
              }}
            >
              Play Now
            </button>
          </div>

          <div className="relative t-8 mt-12">
            <button
              className="m-3"
              onClick={() => {
                navigate("/tableTest");
              }}
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;

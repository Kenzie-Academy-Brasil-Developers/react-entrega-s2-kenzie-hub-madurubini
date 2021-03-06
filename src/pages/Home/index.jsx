import { Redirect, useHistory } from "react-router";
import "./style.css";

const Home = ({ auth }) => {
  const history = useHistory();

  const handleNavigation = (path) => {
    return history.push(path);
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="Home">
      <h2>KenzieHub</h2>
      <p>O lugar ideal para partilhar seus conhecimentos em tecnologia</p>
      <nav>
        <div className="ButtonsHome">
          <p>Você é novo por aqui?</p>
          <button onClick={() => handleNavigation("/signup")}>
            Cadastre-se
          </button>
        </div>
        <div className="ButtonsHome">
          <p>Já é cadastrado?</p>
          <button onClick={() => handleNavigation("/login")}>Login</button>
        </div>
      </nav>
    </div>
  );
};

export default Home;

import { Redirect, useHistory } from "react-router";

const Home = ({ auth }) => {
  const history = useHistory();

  const handleNavigation = (path) => {
    return history.push(path);
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <h2>KenzieHub</h2>
      <p>O lugar ideal para partilhar seus conhecimentos em tecnologia</p>
      <nav>
        <p>Você é novo por aqui?</p>
        <button onClick={() => handleNavigation("/signup")}>Cadastre-se</button>
        <p>Já é cadastrado?</p>
        <button onClick={() => handleNavigation("/login")}>Login</button>
      </nav>
    </div>
  );
};

export default Home;

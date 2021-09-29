import { Redirect, useHistory } from "react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";

const Login = ({ auth, setAuth }) => {
  const formSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo Obrigatório"),
    password: yup
      .string()
      .required("Campo Obrigatório")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const history = useHistory();

  const handleLogin = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
        localStorage.setItem("@KenzieHub:user", JSON.stringify(user));

        setAuth(true);

        return history.push("/dashboard");
      })
      .catch((err) => toast.error("Email ou senha inválidos"));
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  const returnHome = () => {
    history.push("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <h2>KenzieHub - Login</h2>

        <label>
          Email:
          <input
            type="email"
            placeholder="Insira seu email (email@exemplo.com)"
            {...register("email")}
          ></input>
          <span>{errors.email?.message}</span>
        </label>
        <label>
          Senha:
          <input
            type="password"
            placeholder="Senha"
            {...register("password")}
          ></input>{" "}
          <span>{errors.password?.message}</span>
        </label>

        <button type="submit">Login</button>
      </form>
      <div className="ButtonsForm">
        <button onClick={() => returnHome()}>Voltar para Home</button>
      </div>
    </>
  );
};

export default Login;

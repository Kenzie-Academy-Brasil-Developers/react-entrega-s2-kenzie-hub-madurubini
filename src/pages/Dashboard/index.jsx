import { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router";
import { toast } from "react-toastify";
import api from "../../services/api";

const Dashboard = ({ auth, setAuth }) => {
  const { register, handleSubmit } = useForm();
  const [token] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:token")) || ""
  );
  const userData = JSON.parse(localStorage.getItem("@KenzieHub:user"));
  const history = useHistory();

  const [tech, setTech] = useState(userData.techs);

  const deleteTech = (tech_id) => {
    api
      .delete(`users/techs/${tech_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => {
        toast.success("Tecnologia Deletada");
      });
    setTech(tech.filter((tech) => tech.id !== tech_id));
  };

  const postTech = ({ title, status }) => {
    if (!title || !status) {
      return toast.error("Preencha todos os campos");
    }
    api
      .post(
        "users/techs",
        {
          title: title,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTech([...tech, response.data]);
      });
  };

  if (!auth) {
    return <Redirect to="/" />;
  }

  const Logout = () => {
    localStorage.clear();
    setAuth(false);
    history.push("/");
  };
  return (
    <div>
      <p>Olá, {userData.name}!</p>
      <div className="BoxUserInfo">
        <p>Módulo: {userData.course_module}</p>
      </div>
      <div className="BoxTecInfo">
        <h2>Minhas Tecnologias</h2>
        <form onSubmit={handleSubmit(postTech)}>
          <input
            {...register("title")}
            type="text"
            placeholder="Insira a Tecnologia desejada"
          ></input>
          <select {...register("status")}>
            <option disabled selected defaultChecked value="">
              Escolha o nível de habilidade
            </option>
            <option value={"Iniciante"}>Iniciante</option>
            <option value={"Intermediário"}>Intermediário</option>
            <option value={"Avançado"}>Avançado</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>
        <ul>
          {tech.map((item, index) => (
            <li key={index}>
              <p>{item.title}</p>
              <p>{item.status}</p>
              <button onClick={() => deleteTech(item.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => Logout()}>Sair</button>
    </div>
  );
};

export default Dashboard;

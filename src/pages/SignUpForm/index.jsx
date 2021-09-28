import { useHistory } from "react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

const SignUpForm = () => {
  const [dataForm, setDataForm] = useState("");
  const formSchema = yup.object().shape({
    name: yup.string().required("Nome Obrigatório"),
    email: yup.string().email("Email inválido").required("Campo Obrigatório"),
    password: yup
      .string()
      .required("Campo Obrigatório")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: yup
      .string()
      .required("Campo Obrigatório")
      .oneOf([yup.ref("password"), null], "As Senhas não corres"),
    bio: yup.string().required("Campo Obrigatório"),
    contact: yup.string().required("Campo Obrigatório"),
    course_module: yup.string().required("Escolha uma opção"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const history = useHistory();

  function sendData({ name, email, password, bio, contact, course_module }) {
    const user = { name, email, password, bio, contact, course_module };
    console.log(user);
    api
      .post("/users", user)
      .then((_) => {
        toast.success("Conta criada com sucesso!");
        return history.push("/login");
      })
      .catch((err) => toast.error(`${err}`));
  }

  const returnHome = () => {
    history.push("/");
  };
  return (
    <>
      <h2>Formulário de Cadastro</h2>
      <p>
        Seja bem-vinde. Para acessar é necessário se cadastrar no formulário
        abaixo
      </p>
      <form onSubmit={handleSubmit(sendData)}>
        <label>
          Informe seu nome:
          <input
            type="text"
            placeholder="Nome Completo"
            {...register("name")}
          ></input>
          <span>{errors.name?.message}</span>
        </label>
        <label>
          {" "}
          Informe seu email:{" "}
          <input
            type="email"
            placeholder="Insira seu email (email@exemplo.com)"
            {...register("email")}
          ></input>
          <span>{errors.email?.message}</span>
        </label>
        <label>
          Escolha uma senha:
          <input
            type="password"
            placeholder="Senha"
            {...register("password")}
          ></input>{" "}
          <span>{errors.password?.message}</span>
        </label>
        <label>
          {" "}
          Confirme sua senha:{" "}
          <input
            type="password"
            placeholder="Confirme sua senha"
            {...register("confirmPassword")}
          ></input>{" "}
          <span>{errors.confirmPassword?.message}</span>
        </label>
        <label>
          Bio: Conte um pouco sobre você!
          <textarea
            type="bio"
            placeholder="Quando começou a sua história com a programação?"
            {...register("bio")}
          ></textarea>
          <span>{errors.bio?.message}</span>
        </label>
        <label>
          {" "}
          Telefone para contato:{" "}
          <input
            type="mobile"
            placeholder="Insira o seu telefone de contato"
            {...register("contact")}
          ></input>
          <span>{errors.contact?.message}</span>
        </label>
        <label>
          Qual módulo você está?
          <select {...register("course_module")}>
            <option disabled selected value="">
              Selecione o módulo do seu curso
            </option>
            <option value={"Primeiro módulo (Introdução ao Frontend)"}>
              Primeiro módulo (Introdução ao Frontend)
            </option>
            <option value={"Segundo módulo (Frontend Avançado)"}>
              Segundo módulo (Frontend Avançado)
            </option>
            <option value="Terceiro módulo (Introdução ao Backend)">
              Terceiro módulo (Introdução ao Backend)
            </option>
            <option value="Quarto módulo (Backend Avançado)">
              Quarto módulo (Backend Avançado)
            </option>
          </select>
          <span>{errors.course_module?.message}</span>
        </label>

        <button type="submit">Cadastrar</button>
      </form>
      <button onClick={() => returnHome()}>Voltar para Home</button>
    </>
  );
};

export default SignUpForm;

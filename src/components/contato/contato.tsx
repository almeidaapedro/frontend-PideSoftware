import { Envelope, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { FC } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface ContatoProps { }

type pessoa = {
  foto: string;
  nome: string;
  email: string;
  linkedIn: string;
  github: string;
};

const pessoas: pessoa[] = [
  {
    foto: "",
    nome: "Pedro Almeida",
    email: "mailto: almeida.pedroaugusto25@gmail.com",
    linkedIn: "https://www.linkedin.com/in/pedroaugustosantosalmeida/",
    github: "https://github.com/almeidaapedro",
  },
  {
    foto: "",
    nome: "Diego Rodrigues",
    email: "mailto: dr3540001@gmail.com",
    linkedIn: "https://www.linkedin.com/in/diego-rodrigues-374456310/",
    github: "https://github.com/DiegoRodrigues999",
  },
  {
    foto: "",
    nome: "Diogo Costa",
    email: "mailto: diogo.costa23@outlook.com",
    linkedIn: "",
    github: "https://github.com/dcn99",
  },
  {
    foto: "",
    nome: "Lucas Reis",
    email: "mailto:",
    linkedIn: "https://www.linkedin.com/in/lucas-reis-59b20a253/",
    github: "",
  },
];

const Contato: FC<ContatoProps> = () => {
  return (
    <>
    <Helmet>
      <title> Sport Map | Contato</title>
    </Helmet>
      <section className="w-full flex flex-col gap-10 min-h-[85vh] my-7 ">
        <h1 className="flex text-center justify-center  text-5xl font-medium">
          Conheça o time de desenvolvedores:
        </h1>

        <div className="flex justify-center flex-wrap  mx-auto gap-6  ">
          {pessoas.map((pessoa, id) => (
            <CardPessoa key={id} {...pessoa} />
          ))}
        </div>
      </section>
    </>
  );
};

const CardPessoa = ({ nome, email, linkedIn, github, foto }: pessoa) => {
  return (
    <div className="flex flex-col w-full justify-center items-center text-center max-w-[300px] gap-4">
      <img
        src={foto}
        className="h-40 rounded-full  w-[160px] object-cover object-top border-4  border-custom-dark-blue"
        alt=""
      />
      <p className="font-bold uppercase text-base">{nome}</p>
      <div className="flex w-full justify-center gap-2 font-extrabold ">
        <Link to={`${email}`} target="_blank">
          <Envelope size={32} />
        </Link>
        <Link to={`${linkedIn}`} target="_blank">
          <LinkedinLogo size={32} />
        </Link>
        <Link to={`${github}`} target="_blank">
          <GithubLogo size={32} />
        </Link>
      </div>
    </div>
  );
};
export default Contato;
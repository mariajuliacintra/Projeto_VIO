import { useState } from "react";
import sheets from "../axios/axios"; 
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

function CreateEvent() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    data_hora: "",
    local: "",
    fk_id_organizador: 1, 
  });
  const [imagem, setImagem] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sheets.createEvento(form, imagem);
      alert("Evento criado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar evento");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <TextField
          fullWidth
          name="nome"
          label="Nome"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="descricao"
          label="Descrição"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="data_hora"
          label="Data e hora"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="local"
          label="Local"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <Button fullWidth type="submit" variant="contained" sx={{ mb: 2 }}>
          Criar Evento
        </Button>
      </form>
      <Link to="/events">Listar Eventos</Link>
    </div>
  );
}

export default CreateEvent;
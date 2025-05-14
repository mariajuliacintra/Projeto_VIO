import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import api from "../axios/axios";

export default function ModalCriarIngresso({
  open,
  onClose,
  eventoSelecionado,
}) {
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await api.createIngresso({
        tipo,
        preco,
        fk_id_evento: eventoSelecionado.id_evento,
      });
      alert(response.data.message);
      limpaState();
    } catch (error) {
      console.log("Erro ao criar ingresso", error.response.data);
      alert(error.response.data.error);
    }
  };

  function limpaState() {
    setTipo("");
    setPreco("");
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar ingresso para: {eventoSelecionado.nome}</DialogTitle>
      <DialogContent>
        <TextField
          label="Tipo"
          fullWidth
          margin="dense"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <TextField
          label="Preço"
          type="number"
          fullWidth
          margin="dense"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
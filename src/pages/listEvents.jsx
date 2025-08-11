import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import ModalCriarIngresso from "../components/ModalCriarEventos"

function ListEvents() {
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({
    //visibilidade
    open: false,
    //nível do alerta (sucess, error, warning, etc)
    severity: "",
    message: "",
  });

  //função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  //Fechar o alerta
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  const navigate = useNavigate();
  async function getEvents() {
    // Chamada da Api
    await api.getEvents().then(
      (response) => {
        console.log(response.data.events);
        setEvents(response.data.events);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  async function deleteEvent(id_evento) {
    try {
      await api.deleteEvent(id_evento);
      await getEvents();
      showAlert("success", "Evento apagado com sucesso");
    } catch (error) {
      console.log("erro ao deletar evento", error);
      showAlert("error", "Erro ao encontrar evento");
    }
  }

  const listEvents = events.map((event) => {
    return (
      <TableRow key={event.id_evento}>
        <TableCell align="center">{event.nome}</TableCell>
        <TableCell align="center">{event.descricao}</TableCell>
        <TableCell align="center">{event.data_hora}</TableCell>
        <TableCell align="center">{event.local}</TableCell>
        <TableCell>
          <img 
          src={`http://localhost:5000/api/v1/evento/imagem/${event.id_evento}`}
          alt="Imagem do evento"
          style={{width:"80px", height:"80px", objectFit:"cover"}}
          />
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => deleteEvent(event.id_evento)}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => abrirModalIngresso(event)}>
            <AddBoxIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  useEffect(() => {
    // if(!localStorage.getItem('authenticated')){
    //   navigate("/")
    // }
    getEvents();
  }, []);

  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModalIngresso = (evento) => {
    setEventoSelecionado(evento);
    setModalOpen(true);
  };

  const fecharModalIngresso = () => {
    setModalOpen(false);
    setEventoSelecionado("");
  };

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <ModalCriarIngresso
      // passagem de informações por props
        open={modalOpen}
        onClose={fecharModalIngresso}
        eventoSelecionado={eventoSelecionado}
      />

      {events.length === 0 ? (
        <p>Carregando Eventos</p>
      ) : (
        <div>
          <h5>Lista de eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "red", borderStyle: "solid white" }}
              >
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descricao</TableCell>
                  <TableCell align="center">Data_hora</TableCell>
                  <TableCell align="center">Local</TableCell>
                  <TableCell>Imagem</TableCell>
                  <TableCell align="center">Excluir</TableCell>
                  <TableCell align="center">Criar Ingresso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEvents}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" onClick={logout}>
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}
export default ListEvents;
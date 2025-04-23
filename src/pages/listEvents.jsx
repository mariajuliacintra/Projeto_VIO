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
import { Button, IconButton, Alert, Snackbar} from "@mui/material";
// import { DeleteOutlineIcon } from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";

function listEvents() {
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({
    // Visibilidade (false = oculta; true = visível)
    open: false,
    //nível do alerta (sucess, error, warning, etc)
    severity:"",
    message:""
  });

  // função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({open: true, severity, message})
  };
  const handleCloseAlert = () => {
    setAlert({...alert, open: false})
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

  async function deleteEvent(id){
    try{
      await api.deleteEvent(id);
      await getEvents();
      showAlert("success", "Evento Deletado com Sucesso!")
    }catch(error){
      console.log("Erro ao deletar evento", error)
      showAlert("error", "erro ao deletar evento");
    }
  }

  const listEvents = events.map((event) => (
    <TableRow key={event.id_evento}>
      <TableCell align="center">{event.nome}</TableCell>
      <TableCell align="center">{event.descricao}</TableCell>
      <TableCell align="center">{new Date(event.data_hora).toLocaleString()}</TableCell>
      <TableCell align="center">{event.local}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => deleteEvent(event.id_evento)} aria-label="Excluir evento">
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  ));
  function logout(){
    localStorage.removeItem('authenticated')
    navigate("/")
  }

  useEffect(() => {
    // if(!localStorage.getItem('authenticated')){
    //   navigate("/")
    // }
    getEvents();
  }, []);



  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{vertical:"top", horizontal:"center"}}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{width:"100%"}}>
          {alert.message}
        </Alert>
      </Snackbar>
 
      {events.length === 0 ? (
        <p>Carregando Eventos...</p>
      ) : (
        <div>
          <h5>Lista de eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "pink", borderStyle: "solid white" }}
              >
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Horário</TableCell>
                  <TableCell align="center">local</TableCell>
                  <TableCell align="center"></TableCell>
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
export default listEvents;

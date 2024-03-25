import React, { useState, useEffect } from "react";
import Text from "../../components/Text/Text";
import Table from "../../components/Table/Table";
import {
  ContainerManagement,
  TableContainer,
  Row,
  StyledLink,
} from "./ManagementPageStyled";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";
import { ModalConfirmation } from "../../components/ModalConfirmation/ModalConfirmation";
import api from "../../services/api";

const ManagementPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  //Logica de Filtragem
  const handleFilterChange = (filterText) => {
    const searchText = filterText.toLowerCase();
    const newData = data.filter((item) => {
      if (item.name && item.name.toLowerCase().includes(searchText)) {
        return true;
      }
      if (
        item.identifier &&
        item.identifier.toLowerCase().includes(searchText)
      ) {
        return true;
      }
      return false;
    });

    setFilteredData(newData);
  };

  //Logica de GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/physio");
        const usersDataFromBackend = response.data;
        setFilteredData(usersDataFromBackend);
        setData(usersDataFromBackend);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //Logica de DELETE
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);


  
  const handleDeleteFisio = (id) => {
    setIdToDelete(id);
    setShowConfirmationModal(true);
  };

  const confirmDelete = () => {
    api
      .delete(`/physio/${idToDelete}`)
      .then((response) => {
        if (response.status === 200) {
          const newData = data.filter(
            (fisioterapeuta) => fisioterapeuta.id !== idToDelete
          );
          setData(newData);
          alert("Fisioterapeuta excluído com sucesso");
          setShowConfirmationModal(false);
           window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o fisioterapeuta:", error);
        setShowConfirmationModal(false);
      });
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
  };

  return (
    <ContainerManagement>
      <Text id="TituloScore" text="Gerenciamento"></Text>
      <Row>
        <Search onFilterChange={handleFilterChange} type="physiotherapist" />
        <StyledLink to="/cadastrofisioterapeuta">
          <Button id="ButtonLarge" text="Novo fisioterapeuta"></Button>
        </StyledLink>
      </Row>

      <TableContainer>
        <Table
          type="physiotherapist"
          database={filteredData}
          handleDeleteFisio={handleDeleteFisio}
        />
      </TableContainer>
      <ModalConfirmation
        isOpen={showConfirmationModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </ContainerManagement>
  );
};
export default ManagementPage;

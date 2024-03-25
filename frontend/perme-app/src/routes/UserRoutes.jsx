import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PatientsPage from '../pages/PatientsPage/PatientsPage';
import ManagementPage from '../pages/ManagementPage/ManagementPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import FisioRegisterPage from '../pages/FisioRegisterPage/FisioRegisterPage';
import EditioFormPage from '../pages/EditionFormPage/EditionFormPage';
import PatientRegisterPage from '../pages/PatientRegisterPage/PatientRegisterPage';
import SuccessRegisterPage from '../pages/SuccessRegisterPage/SuccessRegisterPage';
import ManagePatientPage from '../pages/ManagePatientPage/ManagePatientPage';
import PermePage from '../pages/PermePage/PermePage';

const UserRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<PatientsPage />} />
			<Route path="/pacientes" element={<PatientsPage />} />
			<Route path="/gerenciamento" element={<ManagementPage />} />
			<Route path="/painel" element={<DashboardPage />} />
			<Route path="/cadastrofisioterapeuta" element={<FisioRegisterPage />} />
			<Route path="/gerenciamento/editar/:id" element={<EditioFormPage />} />
			<Route path="/cadastropaciente" element={<PatientRegisterPage />} />
			<Route path="/sucessocadastro" element={<SuccessRegisterPage />} />
			<Route path="/paciente/:patientId/afericao" element={<PermePage />} />
			<Route path="/gerenciarpaciente/:id" element={<ManagePatientPage />} />
		</Routes>
	);
}

export default UserRoutes;
import MyAppLayout from "MyApp/layouts/MyAppLayout";
import MyAuthLayout from "MyApp/layouts/MyAuthLauout";
import MyErrorLayout from "MyApp/layouts/MyErrorLayout";
import ForgotPage from "MyApp/pages/auth/ForgotPage";
import LoginPage from "MyApp/pages/auth/LoginPage";
import LogoutPage from "MyApp/pages/auth/LogoutPage";
import RecoveryPage from "MyApp/pages/auth/RecoveryPage";
import RegisterPage from "MyApp/pages/auth/RegisterPage";
import RestorePage from "MyApp/pages/auth/RestorePage";
import Error404Page from "MyApp/pages/errors/Error404Page";
import Error500Page from "MyApp/pages/errors/Error500Page";
import FaqPage from "MyApp/pages/help/FaqPage";
import TutorialsPage from "MyApp/pages/help/TutorialsPage";
import EstadisticasPage from "MyApp/pages/home/EstadisticasPage";
import PrincipalPage from "MyApp/pages/home/PrincipalPage";
import AbmAreas from "MyApp/pages/institucional/AbmAreas";
import AutoridadesTribunalPage from "MyApp/pages/institucional/Autoridades/AutoridadesTribunalPage";
import AutoridadesPage from "MyApp/pages/institucional/AutoridadesPage";
import PersonalPage from "MyApp/pages/institucional/PersonalPage";
import CreateEditPage from "MyApp/pages/institucional/components/CreateEditPage";
import CapacitacionPage from "MyApp/pages/matriculados/CapacitacionPage";
import MessagesListPage from "MyApp/pages/mensajes/MessagesListPage";
import EditNewsPage from "MyApp/pages/news/EditNewsPage";
import NewsListPage from "MyApp/pages/news/NewsListPage";
import PropertyInterestedPage from "MyApp/pages/property/PropertyInterestedPage";
import PropertySharedPage from "MyApp/pages/property/PropertySharePage";
import RoleListPage from "MyApp/pages/role/RoleListPage";
import BibliotecaDigitalPage from "MyApp/pages/servicios/BibliotecaDigitalPage";
import CalculadoraDeAlquilerPage from "MyApp/pages/servicios/CalculadoraDeAlquilerPage";
import DenunciasPage from "MyApp/pages/servicios/DenunciasPage";
import IlegalesPage from "MyApp/pages/servicios/IlegalesPage";
import IlegalesPenalPage from "MyApp/pages/servicios/IlegalesPenalPage";
import InfractoresPage from "MyApp/pages/servicios/InfactoresPage";
import MatriculacionPage from "MyApp/pages/servicios/MatriculacionPage";
import ObservatorioEstadisticoPage from "MyApp/pages/servicios/ObservatorioEstadisticoPage";
import PreguntasFrecuentesPage from "MyApp/pages/servicios/PreguntasFrecuentesPage";
import RenaperPage from "MyApp/pages/servicios/RenaperPage";
import RevistaCucicbaPage from "MyApp/pages/servicios/RevistaCucicbaPage";
import SancionesPage from "MyApp/pages/servicios/SancionesPage";
import UserCreatePage from "MyApp/pages/user/UserEditPage";
import UserEditPage from "MyApp/pages/user/UserEditPage";
import UserListPage from "MyApp/pages/user/UserListPage";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<MyAuthLayout />}>
          <Route path="forgot" element={<ForgotPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="recovery" element={<RecoveryPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="restore" element={<RestorePage />} />
        </Route>
        <Route element={<MyAppLayout />}>
          <Route path="/" element={<PrincipalPage />}>
            <Route path="principal" element={<PrincipalPage />} />
            <Route path="estadisticas" element={<EstadisticasPage />} />
          </Route>
          <Route path="/institucional">
            <Route path="autoridades" element={<AutoridadesPage />}>
            </Route>
            <Route path="tribunal" element={<AutoridadesTribunalPage/>}/>
            <Route path="personal" element={<PersonalPage />}>
              <Route path="editar/:id" element={<CreateEditPage />} />
            </Route>
            <Route path="administrar-areas" element={<AbmAreas />} />
          </Route>
          <Route path="/matriculados">
            <Route path="capacitacion" element={<CapacitacionPage />} />
          </Route>
          <Route path="/servicios">
            <Route path="listado" element={<h1>asd</h1>} />
            <Route
              path="observatorio-estadistico"
              element={<ObservatorioEstadisticoPage />}
            />
            <Route path="calculadora" element={<CalculadoraDeAlquilerPage />} />
            <Route path="renaper" element={<RenaperPage />} />
            <Route path="revista-cucicba" element={<RevistaCucicbaPage />} />
            <Route path="matriculacion" element={<MatriculacionPage />} />
            <Route
              path="preguntas-frecuentes"
              element={<PreguntasFrecuentesPage />}
            />
            <Route
              path="biblioteca-digital"
              element={<BibliotecaDigitalPage />}
            />
            <Route path="ilegales" element={<IlegalesPage />} />
            <Route path="ilegales-penal" element={<IlegalesPenalPage />} />
            <Route path="sanciones" element={<SancionesPage />} />
            <Route path="infractores" element={<InfractoresPage />} />
            <Route path="denuncias" element={<DenunciasPage />} />
          </Route>

          <Route path="/mensajes">
            <Route path="list" element={<MessagesListPage />} />
          </Route>
          <Route path="/noticias">
            <Route path="listar" element={<NewsListPage />} />
            <Route path="editar/:id" element={<EditNewsPage />} />
            <Route path="compartidas/listar" element={<PropertySharedPage />} />
            <Route path="interesados" element={<PropertyInterestedPage />} />
          </Route>

          <Route path="/usuarios">
            <Route path="listar" element={<UserListPage />}></Route>
            <Route path="crear" element={<UserCreatePage />}></Route>
            <Route path="editar/:id" element={<UserEditPage />}></Route>
          </Route>
          <Route path="/roles">
            <Route path="listar" element={<RoleListPage />}></Route>
          </Route>

          <Route path="/ayuda">
            <Route path="tutoriales" element={<TutorialsPage />} />
            <Route path="faqs" element={<FaqPage />} />
          </Route>
        </Route>
        <Route path="/errors" element={<MyErrorLayout />}>
          <Route path="404" element={<Error404Page />} />
          <Route path="500" element={<Error500Page />} />
        </Route>

        <Route path="*" element={<Navigate to="/errors/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;

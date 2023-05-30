import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Paths from '../routes/Paths'
import ComitteesView from './Committees'
import NotFoundView from './NotFound'
import MembersView from './Employees'
import ConfigurationsView from './Configurations'
import NavBar from '../components/NavBar'
import { Content } from './styles'
import { EntityProvider } from '../context/CommitteeContext'
import { navIcon } from '../data/navInfo'

const Main: React.FC = () => {
  return (
    <div>
      <EntityProvider>
        <Content>
          <Router>
            <NavBar data={navIcon} />
            <Routes> 
              <Route path={'/'} element={<Navigate to={Paths.COMMITTEES_PATH} replace />} />
              <Route path={Paths.COMMITTEES_PATH} element={<ComitteesView />} />
              <Route path={Paths.EMPLOYEES_PATH} element={<MembersView />} />
              <Route
                path={Paths.CONFIGURATIONS_PATH}
                element={<ConfigurationsView />}
              />
              <Route path={'*'} element={<NotFoundView />} />
            </Routes>
          </Router>
        </Content>
      </EntityProvider>
    </div>
  )
}

export default Main

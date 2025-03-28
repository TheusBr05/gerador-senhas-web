import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Sidebar } from './components/sidebar/Sidebar'
import { FiHome } from 'react-icons/fi'
import { JSX } from 'react/jsx-runtime'
import { SidebarSubitemProps } from './components/sidebar-subitem/SidebarSubitem'
import { MdOutlineVpnKey } from 'react-icons/md'

interface SidebarItem {
  name: string;
  icon: JSX.Element;
  path: string;
  subitems?: SidebarSubitemProps[] | undefined
}

function App() {
  const itemsSidebar: SidebarItem[] = [
    {
      name: 'Home',
      icon: <FiHome />,
      path: '/',
    },
    {
      name: 'Senhas Salvas',
      icon: <MdOutlineVpnKey />,
      path: '/senhas-salvas',
    }
  ]

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Sidebar items={itemsSidebar} />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

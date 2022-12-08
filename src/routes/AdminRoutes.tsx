
import { Routes, Route, Navigate } from 'react-router-dom'
import { SystemManger } from '../pages/admin/SystemManager'
import { Chapter } from '../pages/chapter/Chapter'
import { Home } from '../pages/home/Home'
import { Manga } from '../pages/manga/Manga'

const AdminRoutes = (): JSX.Element => (
  <Routes>
    <Route path='*' element={<Navigate to='/' replace />} />
    <Route path='/' element={<Home />}></Route>
    <Route path='/mangas/:mangaName' element={<Manga />} />
    <Route path='/mangas/:mangaName/:chapterName' element={<Chapter />}/>
    <Route path='/system-manager' element={<SystemManger />}/>
  </Routes>
)
export default AdminRoutes

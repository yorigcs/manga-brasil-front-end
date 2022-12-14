import styled from 'styled-components'
import { useState } from 'react'

import { Footer } from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { Main } from '../../components/main/Main'
import { ContentBlock } from '../../components/contents/ContentBlock'
import { MenuItem } from '../../components/header/user/menu/MenuItem'

import { CreateNewManga } from './rendersOptions/CreateNewManga'
import { AddGenresToManga } from './rendersOptions/AddGenresToManga'
import { CreateNewChapter } from './rendersOptions/CreateNewChapter'
import { CreateNewPages } from './rendersOptions/CreateNewPages'

export const SystemManger = (): JSX.Element => {
  const [openOption, setOpenOption] = useState<string | null>(null)

  const handleRenderOption = (): JSX.Element => {
    switch (openOption) {
      case 'createNewManga':
        return <CreateNewManga />
      case 'addGenresToManga':
        return <AddGenresToManga />
      case 'createChapter':
        return <CreateNewChapter />
      case 'addPagesToChapter':
        return <CreateNewPages />
      default:
        return <></>
    }
  }
  return (
    <>
      <Header />
      <Main>
        <PrimaryContent>
          <ContentBlock title='Painel de administração' size={{ height: 'fit-content' }} >
            <MenuList>
              <MenuItem onClick={() => setOpenOption('createNewManga')}>Criar nova obra</MenuItem>
              <MenuItem onClick={() => setOpenOption('addGenresToManga')}>Add gêneros na obra</MenuItem>
              <MenuItem onClick={() => setOpenOption('createChapter')}>Criar capítulo</MenuItem>
              <MenuItem onClick={() => setOpenOption('addPagesToChapter')}>Add paginas ao capítulo</MenuItem>
            </MenuList>
          </ContentBlock>
        </PrimaryContent>

        <SecundaryContent>
          {handleRenderOption()}
        </SecundaryContent>

      </Main>

      <Footer />
    </>
  )
}

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const PrimaryContent = styled.div`

  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 200px;
  @media only screen and (max-width: 480px) {
   width:100%;
  }
  
`
const SecundaryContent = styled.div`
  width: 600px;
  @media only screen and (max-width: 480px) {
   width:100%;
  }
`

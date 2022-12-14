import styled from 'styled-components'

import { MangaWithChapter } from '../../../models/mangaModels'
import { loadMangasWithChapter } from '../../../services/requests'
import { MangaWithChapterPreview } from '../../../components/manga/MangaWithChapterPreview'
import { useAsync } from '../../../hooks/useAsync'
import { EmptyAnimationMessage } from '../../../components/empty/EmptyAnimationMessage'

export const LastUpdates = (): JSX.Element => {
  const { data: mangas } = useAsync<MangaWithChapter[]>(loadMangasWithChapter)

  const handleRender = (): JSX.Element => {
    if (mangas?.length !== 0) {
      return (
        <LastUpdatesContent>
            {mangas?.map(manga => <MangaWithChapterPreview key={manga.id} {...manga} />)}
        </LastUpdatesContent>
      )
    }
    return (<EmptyAnimationMessage>Não há nenhum manga disponível no momento</EmptyAnimationMessage>)
  }

  return (<>{handleRender()}</>)
}

const LastUpdatesContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3,minmax(0, 1fr));
  gap: 20px;
 
  @media only screen and (max-width: 480px) {
    grid-template-columns: auto;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: auto;
  }
`

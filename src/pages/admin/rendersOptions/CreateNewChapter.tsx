import React from 'react'
import { BsChatSquareTextFill } from 'react-icons/bs'

import { ContentBlock } from '../../../components/contents/ContentBlock'

import { createNewChapterRequest, loadAllMangas } from '../../../services/requests'
import { Manga } from '../../../models/mangaModels'
import { MangaInfo } from '../../../components/manga/MangaInfo'
import { ButtonForm } from '../../../components/buttons/ButtonForm'
import { useAsync } from '../../../hooks/useAsync'
import { Select } from '../../../components/select/Select'
import { Form } from '../../../components/forms/Form'
import { Input } from '../../../components/inputs/Input'
import { NewChapter } from '../../../models/chapterModel'
import { handleChange } from '../../../helpers'
import { validateNewChapterInputs } from './validateNewChapterInputs'

export const CreateNewChapter = (): JSX.Element => {
  const { data: mangas } = useAsync<Manga[] | null>(loadAllMangas)
  const { status: statusCreateChapter, act: createChapterExec, errMsg, resetStates: resetRequestResponse } = useAsync<string>(createNewChapterRequest, false)

  const [manga, setManga] = React.useState<Manga | undefined>(undefined)

  const [chapter, setChapter] = React.useState<NewChapter>({ chapterNum: '', mangaId: '', name: '' })
  const [nameError, setNameError] = React.useState<string | null>(null)
  const [chapterNumError, setChapterNumError] = React.useState<string | null>(null)

  const loadMangaInfo = (e: React.MouseEvent<HTMLElement>): void => {
    const mangaId = e.currentTarget.id
    const manga = mangas?.find(manga => manga.id === mangaId)
    setManga(mang => (mang = manga))
    setChapter(chapter => (chapter = { ...chapter, mangaId }))
  }

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    const isFormValid = validateNewChapterInputs(chapter, { setNameError, setChapterNumError })
    if (!isFormValid) return

    createChapterExec(Object.assign({}, chapter, { chapterNum: Number(chapter.chapterNum) }))
      .then(() => { })
      .catch(() => { })
      .finally(() => { resetRequestResponse() })
  }

  return (
    <ContentBlock gap='30px' title='Criar cap??tulo' size={{ height: 'auto' }} >
      <Select defaultTitle='Selecione um manga' onSelect={loadMangaInfo} list={mangas?.map(manga => ({ name: manga?.name, id: manga?.id }))} />
      {
        manga
          ? <>
            <MangaInfo key={manga.id} {...manga} />
            <Form onSubmit={onSubmit}>
              <Input icon={<BsChatSquareTextFill />} placeHolder='Digite o nome do cap??tulo...' name='name' type='text' onChange={e => handleChange(e, setChapter)} value={chapter.name} err={nameError} loading={statusCreateChapter === 'loading'} />
              <Input icon={<BsChatSquareTextFill />} placeHolder='Digite o n??mero do cap??tulo...' name='chapterNum' type='text' onChange={e => handleChange(e, setChapter)} value={chapter.chapterNum} err={chapterNumError} loading={statusCreateChapter === 'loading'} />
              <ButtonForm status={statusCreateChapter} message='Criar Cap??tulo' errMsg={errMsg} />
            </Form>
          </>
          : null
      }

    </ContentBlock>
  )
}

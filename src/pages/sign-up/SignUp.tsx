import { Header } from '../../components/header/Header'
import { Input } from '../../components/inputs/Input'
import { Form } from '../../components/forms/Form'
import { ButtonForm } from '../../components/buttons/ButtonForm'
import { Main } from '../../components/main/Main'
import { Footer } from '../../components/footer/Footer'

import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'

import { handleChange } from '../../helpers'
import { singUpRequest } from '../../services/requests'
import { validateInputs } from './validateInputs'
import { signUpData } from '../../models/signUpModel'

export const SignUp = (): JSX.Element => {
  const navigate = useNavigate()
  const [userData, setUserData] = React.useState<signUpData>(
    {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  )

  const [loading, setLoading] = React.useState(false)

  const [nameError, setNameError] = React.useState<string | null>(null)
  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [passwordError, setPasswordError] = React.useState<string | null>(null)
  const [passwordConfirmationError, setPasswordConfirmationError] = React.useState<string | null>(null)

  const [requestError, setRequestError] = React.useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    const isFormValid = validateInputs(userData, { setNameError, setEmailError, setPasswordError, setPasswordConfirmationError })
    if (isFormValid) {
      setLoading(true)
      singUpRequest(userData)
        .then(() => navigate('/sign-in'))
        .catch((err) => { setRequestError(err.response.data.error) })
        .finally(() => setLoading(false))
    }
  }

  return (
    <>
      <Header />
      <Main>
        <Form title='Criar Conta' onSubmit={handleSubmit} err={requestError}>
          <Input icon={<FaUserAlt />} placeHolder='Digite seu nome...' name='name' type='text' onChange={e => handleChange(e, setUserData)} value={userData.name} err={nameError} loading={loading}/>
          <Input icon={<MdEmail />} placeHolder='Digite seu email...' name='email' type='email' onChange={e => handleChange(e, setUserData)} value={userData.email} err={emailError} loading={loading}/>
          <Input icon={<RiLockPasswordFill />} placeHolder='Digite uma senha...' name='password' type='password' onChange={e => handleChange(e, setUserData)} value={userData.password} err={passwordError} loading={loading}/>
          <Input icon={<RiLockPasswordFill />} placeHolder='Confirme sua senha...' name='passwordConfirmation' type='password' onChange={e => handleChange(e, setUserData)} value={userData.passwordConfirmation} err={passwordConfirmationError} loading={loading}/>
          <ButtonForm message='Cadastrar' loading={loading}/>
          <Link to='/sign-in'>Já possui uma conta? Entre aqui!</Link>
        </Form>
      </Main>

      <Footer />
    </>
  )
}
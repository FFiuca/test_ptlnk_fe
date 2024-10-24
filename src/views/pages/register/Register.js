import React, {useState, useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { register } from '../../../actions/auth/register'
import ErrorTextForm from '../../../components/sub/ErrorTextForm'
import { extractValidationErrorField } from '../../../helpers/common_helper'
import { useNavigate } from 'react-router-dom'
import { error as errorSwal } from '../../../components/sub/swal'

const Register = () => {
  const nav = useNavigate()

  const [afterRender, setAfterRender] = useState(false)
  const [error, setError] = useState([])

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const {result, loading, doRegister} = register()

  const handleRegister = ()=>{
    doRegister({
      username,
      name,
      password,
      passwordConfirm
    })
  }

  useEffect(()=>{
    setAfterRender(true)
  }, [])

  useEffect(()=>{
    console.log(result, afterRender)
    if(afterRender && !result.error){
      nav('/login')
    }else if(afterRender && result.error && result.status==400){
      console.log(result.data.errora)
      setError(result.data.error)
    }else if(afterRender && result.error && result.status==500){
      errorSwal(result.data.message)
    }
  }, [result])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                  </CInputGroup>
                  <ErrorTextForm text={extractValidationErrorField('username', error)} />
                  <CInputGroup className="mt-3">
                    <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                    <CFormInput placeholder="name" autoComplete="name" value={name} onChange={(e)=> setName(e.target.value)}/>
                  </CInputGroup>
                  <ErrorTextForm text={extractValidationErrorField('name', error)} />
                  <CInputGroup className="mt-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password} onChange={(e)=> setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <ErrorTextForm text={extractValidationErrorField('password', error)} />
                  <CInputGroup className="mt-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={passwordConfirm} onChange={(e)=> setPasswordConfirm(e.target.value)}
                    />
                  </CInputGroup>
                  <ErrorTextForm text={extractValidationErrorField('password_confirm', error)} />
                  <div className="d-grid mt-3">
                    <CButton color="success" onClick={handleRegister}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

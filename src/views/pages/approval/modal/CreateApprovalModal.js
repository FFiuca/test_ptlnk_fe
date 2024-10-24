/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
  CTooltip,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormSelect,
  CFormCheck,
  CFormFeedback,
  CFormTextarea,
} from '@coreui/react'
import React, {useRef, useEffect} from 'react'
import ErrorTextForm from '../../../../components/sub/ErrorTextForm'
import { extractValidationErrorField } from '../../../../helpers/common_helper'

const CreateApprovalModal = ({
  modal,
  toggleModal,
  reason,
  setReason,
  handleCreate,
  error,
})=>{

  //NOTE - PROPS
  const form = useRef(null)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    // setValidated(true)
  }

  return (
    <>
      <CModal visible={modal}>
        <CModalHeader>
          <CModalTitle>Create Approval</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={12}>
              <CFormTextarea
                type="text-area"
                id="fl-description"
                label="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </CCol>
            <ErrorTextForm  text={extractValidationErrorField('request_reason', error)} />
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggleModal}>
            Close
          </CButton>
          <CButton color="primary" onClick={()=>{
            handleCreate()
          }}>Save</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default CreateApprovalModal

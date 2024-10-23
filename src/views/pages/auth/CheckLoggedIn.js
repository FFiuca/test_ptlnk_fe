import React, {useEffect} from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormCheck,
  CListGroup,
  CListGroupItem,
  CBadge,
  CButton,
} from '@coreui/react'
import { check_logged_in } from "../../../middleware/auth_middleware";
import { useNavigate } from "react-router-dom";

const CheckLoggedIn = ()=>{
  const nav = useNavigate()

  const check = async ()=>{
    let status = await check_logged_in()

    if (status){
      nav('/employee')
    }else{
      nav('/login')
    }
  }

  useEffect(() => {
    check()
  }, [])

  return  (
    <React.Fragment>
        <CRow>
          <CCol xs={12}>
          <CCard className="mb-4">
              <CCardBody>
                Checking...
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </React.Fragment>
    )
}


export default CheckLoggedIn

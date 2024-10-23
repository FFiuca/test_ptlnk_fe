/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react'
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
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import { list_approval } from '../../../actions/approval/list_approval'

const Approval = () => {
  // const [afterRender, setAfterRender] = useState(false)
  // const [data, setData] = useState([])

  const {result,  loading, doList} = list_approval()

  // useEffect(()=>{
  //   setAfterRender(true)
  // }, [])

  console.log(result)
  useEffect(()=>{
    doList()
  }, [])

  return (
    <React.Fragment>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Approval</strong>
              </CCardHeader>
              <CCardBody>
                <p className="text-body-secondary small">List of request approval.</p>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Reason</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      !result.error && Array.isArray(result.data) && result.data.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                          <CTableDataCell>{item.username}</CTableDataCell>
                          <CTableDataCell>{item.name}</CTableDataCell>
                          <CTableDataCell>{item.status_active? 'Active' : 'Deactive'}</CTableDataCell>
                          <CTableDataCell>{item.status_active? 'Active' : 'Deactive'}</CTableDataCell>
                        </CTableRow>
                      ))
                    }
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
    </React.Fragment>
  )
}

export default Approval

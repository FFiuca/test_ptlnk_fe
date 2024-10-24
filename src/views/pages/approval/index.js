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
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownItem,
} from '@coreui/react'
import { list_approval } from '../../../actions/approval/list_approval'
import { approve_approval } from '../../../actions/approval/approve_approval'
import { reject_approval } from '../../../actions/approval/reject_approval'
import { create_approval } from '../../../actions/approval/create_approval'
import { confirm } from '../../../components/sub/swal'
import CreateApprovalModal from './modal/CreateApprovalModal'
import { error as errorSwal } from '../../../components/sub/swal'

const Approval = () => {
  const [afterRender, setAfterRender] = useState(false)
  const [reason, setReason] = useState('')
  const [error, setError] = useState([])

  const [modal, setModal] = useState(false)
  const toggleModal = ()=> setModal(e=> !e)

  //SECTION - hook
  const {result,  loading, doList} = list_approval()
  const {result:resultApprove, loading:loadingApprove, doApprove} = approve_approval()
  const {result:resultReject, loading:loadingReject, doReject} = reject_approval()
  const {result:resulCreate, loading:loadingCreate, doCreate} = create_approval()

  //SECTION - init
  useEffect(()=>{
    doList()
    setAfterRender(true)
  }, [])

  //SECTION - approve
  const handleApprove = async (id)=>{
    if (await confirm('Want to Approve?'))
      doApprove(id)
  }

  useEffect(()=>{
    if (afterRender && !resultApprove.error){
      doList()
    }
  }, [resultApprove])

  //SECTION - reject
  const handleReject = async (id)=>{
    if (await confirm('Want to Reject?'))
      doReject(id)
  }

  useEffect(()=>{
    if (afterRender && !resultReject.error){
      doList()
    }
  }, [resultReject])

  //SECTION - create
  const handleCreate = ()=>{
    doCreate({
      reason
    })
  }

  useEffect(()=>{
    console.log('create',resulCreate)
    if (afterRender && !resulCreate.error){
      toggleModal()
      doList()
    }else if(afterRender && resulCreate.error && resulCreate.status==400){
      console.log(resulCreate.data.errora)
      setError(resulCreate.data.error)
    }else if(afterRender && resulCreate.error && resulCreate.status==500){
      errorSwal(resulCreate.data.message)
    }
  }, [resulCreate])

  return (
    <React.Fragment>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Approval</strong>
              </CCardHeader>
              <CCardBody>
                <div className='d-flex flex-wrap'>
                  <p className="text-body-secondary small">List of request approval.</p>
                  <CButton className='ms-auto' color='info' onClick={toggleModal}>Create</CButton>
                </div>
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
                          <CTableDataCell>{item.user.username}</CTableDataCell>
                          <CTableDataCell>{item.request_reason}</CTableDataCell>
                          <CTableDataCell>
                            { item.status=='approved' && <CBadge color='success'>{item.status}</CBadge>}
                            { item.status=='rejected' && <CBadge color='danger'>{item.status}</CBadge>}
                            { item.status=='pending' && <CBadge color='warning'>{item.status}</CBadge>}
                          </CTableDataCell>
                          <CTableDataCell>
                            {
                              item.status=='pending' && (
                              <CDropdown variant="btn-group">
                                <CDropdownToggle color="primary">Action</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem onClick={()=> handleApprove(item._id)}>Approve</CDropdownItem>
                                  <CDropdownItem onClick={()=> handleReject(item._id)}>Reject</CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                              )
                            }
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    }
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CreateApprovalModal
          modal={modal}
          toggleModal={toggleModal}

          reason={reason}
          setReason={setReason}
          handleCreate={handleCreate}
          error={error}
        />
    </React.Fragment>
  )
}

export default Approval

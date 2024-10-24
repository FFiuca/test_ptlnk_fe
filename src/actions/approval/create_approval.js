import axios from "axios";
import { useState } from "react";
import { config } from "../../../_config";

export const create_approval =  ()=>{
  const [result,  setResult] = useState({
    error : false,
    status : 200,
    data : {}
  })
  const [loading, setLoading] = useState(false)

  const reset = ()=>{
    setResult({
      error : false,
      status : 200,
      data : {}
    })
    setLoading(false)
  }
  const toggleLoading = ()=> setLoading(e=> !e)

  const doCreate = async ({
    reason
  })=>{
    let res

    toggleLoading()
    try {
      res = await axios.post(config.API.USER_URL+'/approval/', {
        request_reason: reason
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }
      })
      const res2 = res.data

      setResult({
        error : false,
        status : res.status,
        data : res2.data
      })
    } catch (error) {

      setResult({
        error : true,
        status: error.status,
        data: error.response.data.data
      })
      console.error('doCreateApproval', error)
    }

    toggleLoading()
  }

  return {
    result,
    loading,
    doCreate
  }
}

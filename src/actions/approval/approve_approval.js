import axios from "axios";
import { useState } from "react";
import { config } from "../../../_config";

export const approve_approval =  ()=>{
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

  const doApprove = async (id)=>{
    let res

    toggleLoading()
    try {
      res = await axios.patch(config.API.USER_URL+'/approval/'+id+'/approve/', {},{
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
        data: error.response.data
      })
      console.error('doApproveApproval', error)
    }

    toggleLoading()
  }

  return {
    result,
    loading,
    doApprove
  }
}

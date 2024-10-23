import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { check_logged_in } from "../middleware/auth_middleware";

const ProtectedRoute = ({children})=>{
  const nav = useNavigate()

  const check = async ()=>{
    let status = await check_logged_in()

    if (!status){
      nav('/login')
    }
  }

  useEffect(() => {
    check()
  }, [])


  return (<React.Fragment>{children}</React.Fragment>)
}

export default ProtectedRoute

import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { auth } from "../../Utility/FireBase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import classes from "./SignUp.module.css"
import { DataContext } from "../../Components/DataProvider/DataProvider"
import { Type } from '../../Utility/Action.type'
import { ClipLoader } from 'react-spinners'
function Auth() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [Loading, setLoading] = useState(
    {
      signIn: false,
      signUp: false
    }
  )
  const [{ user }, dispath] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData = useLocation();
  // console.log(password, email);
  // console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name == "signIn") {

      setLoading({
        ...Loading, signIn: true
      })
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
        // console.log(userInfo);
        dispath({
          type: Type.SET_USER,
          user: userInfo.user
        })
        setLoading({ ...Loading, signIn: false })
        navigate(navStateData?.state?.redirect || "/")
      }).catch((err) => {
        // console.log(err.message);
        setError(err.message)
        setLoading({ ...Loading, signIn: false })
      })
    } else {
      setLoading({ ...Loading, signUp: true })
      createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
        console.log(userInfo);
        dispath({
          type: Type.SET_USER,
          user: userInfo.user
        })
        setLoading({ ...Loading, signUp: false })
        navigate(navStateData?.state?.redirect || "/")

      }).catch((err) => {
        console.log(err);
        setError(err.message)
        setLoading({ ...Loading, signUp: false })
      })
    }


  }

  return (

    <section className={classes.login_container}>

      {/* Logo */}
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/1920px-Amazon_2024.svg.png" alt="" />
      </Link>

      {/* Form */}
      <div className={classes.Login}>
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg && <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}>
            {navStateData?.state?.msg}
          </small>
        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
          </div>
          <button type="submit" name="signIn" onClick={authHandler} className={classes.login_signinButton}>{Loading.signIn ? (<ClipLoader color="#000" size={15} />) : ("Sign In")} </button>
        </form>
        {/* Agreement */}
        <p>
          By sign-in you agree to the Amazone-Fake clone conditions of the Use & Sale. Please see our privacy Notice, our cookies Notice and our Interest-Based Ads Notice.
        </p>
        {/* Create accountbtn */}
        <button type="submit" name="signUp" onClick={authHandler} className={classes.Login_RegisterBtn}>{Loading.signUp ? (<ClipLoader color="#000" size={15} />) : ("Create your Amazon Account")}</button>
        {
          error && <small style={{ padding: "5px", color: "red" }}>
            {error}
          </small>
        }
      </div>
    </section>

  )
}

export default Auth
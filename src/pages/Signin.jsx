import Header from "../comp/header";
import { Link } from "react-router-dom";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import "./Signin.css";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [resetpass, setresetpass] = useState("");

  const [password, setpassword] = useState("");
  const [hasErorr, sethasErorr] = useState(false);
  const [firbaseErorr, setfirbaseErorr] = useState("");
  const [showForm, setshowForm] = useState("");
  const [showSendEmail, setshowSendEmail] = useState(false);

  const SignInBTN = (eo) => {
    eo.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        sethasErorr(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setfirbaseErorr("Wrong Email");
            break;

          case "auth/use-not-found":
            setfirbaseErorr("Wrong Email....");
            break;

          case "auth/weak-password":
            setfirbaseErorr("wrong passord");
            break;

          case "auth/too-many-requests":
            setfirbaseErorr("Too many requsts, please try aganin later");
            break;

          default:
            setfirbaseErorr("please chech yoyr email & passord");
            break;
        }
      });
  };

  const forgotPassword = () => {
    setshowForm("show-forgot-password");
  }

  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        <form className={`forgot-password ${showForm}`}>
          <div
            onClick={() => {
              setshowForm("");
            }}
            className="close"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          <input
            onChange={(eo) => {
              setresetpass(eo.target.value);
            }}
            required
            placeholder=" E-mail : "
            type="email"
          />

          <button
            onClick={(eo) => {
              eo.preventDefault();
              sendPasswordResetEmail(auth, resetpass)
                .then(() => {
                  console.log("send Email");
                  setshowSendEmail(true);
                })
                .catch((error) => {
                
                  // ..
                });
            }}
          >
            Reset password
          </button>

          {showSendEmail && (
            <p className="chec-email">
              please chec your email to reset your password
            </p>
          )}
        </form>

        <form cl>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            required
            placeholder=" E-mail : "
            type="email"
          />

          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            required
            placeholder=" Password : "
            type="password"
          />

          <button 
            onClick={(eo) => {
              SignInBTN(eo);
            }}
          >
            Sign in
          </button>
          <p className="account">
            Don't hava an account <Link to="/signup"> Sign-up</Link>
          </p>

          <p
            onClick={() => {
              forgotPassword()
            }}
            className="Forgot-passord"
          >
            Forgot passord ?
          </p>

          {hasErorr && <h2>{firbaseErorr}</h2>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;

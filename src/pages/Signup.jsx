import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import Error404 from '../pages/error404';

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasErorr, sethasErorr] = useState(false);
  const [firbaseErorr, setfirbaseErorr] = useState("");
  const [userName, setuserName] = useState("");
  const [user, loading, error] = useAuthState(auth);


  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });

  const signupBTN = (eo) => {
    eo.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent");
        });

        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate("/");
            // ...
          })
          .catch((error) => {
            console.log(error.code);
          });

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
            setfirbaseErorr("please chech yoyr email & passord");
            break;

          default:
            setfirbaseErorr(errorCode);

            setfirbaseErorr("Too many requsts, please try aganin later");

            break;
        }
      });
  };

  if (error) {
    return <Error404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Header />
          <main>
            <p>We send you an email verify your Account</p>
            <button className="delete">Send again</button>
          </main>
          <Footer />
        </>
      );
    }
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Header />
        <main>
          <form>
            <p style={{ fontSize: "22px", marginBottom: "22px" }}>
              creat a new account <span>🧡</span>
            </p>

            <input
              onChange={(eo) => {
                setuserName(eo.target.value);
              }}
              required
              placeholder="userName"
              type="text"
            />

            <input
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              required
              placeholder="E-mail"
              type="email"
            />

            <input
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
              required
              placeholder="password"
              type="password"
            />
            <button
              onClick={(eo) => {
                signupBTN(eo);
                
              }}
            >
              Sign up{" "}
            </button>
            <p className="account">
              Already hava an account <Link to="/signin">Sign-in</Link>
            </p>
            {hasErorr && <h2>{firbaseErorr}</h2>}
          </form>
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;

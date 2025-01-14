import React, { useRef, useState } from 'react';
import Header from './Header.jsx';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: name.current.value })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/home");
            })
            .catch((error) => setErrorMessage(error.message));
        })
        .catch((error) => setErrorMessage(error.message));
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then(() => navigate("/home"))
        .catch(() => setErrorMessage("User Not Registered"));
    }
  };

  const toggleisSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleInputChange = () => {
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row my-4 md:my-2 overflow-hidden">
        {/* Left Section */}
        <div className="md:w-1/2 h-full flex justify-center items-center rounded-lg">
          <img
            src="https://wallpapercave.com/wp/wp9919642.jpg"
            alt="background-img"
            className="w-full h-full md:h-[530px] mx-0 md:mx-2 object-cover rounded-lg"
          />
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 h-full flex flex-col justify-center my-0 md:my-10 items-center px-6">
          <h1 className="text-xl md:text-2xl italic mb-4 text-center text-pink-950">
            Step into flavor. Sign in to enjoy your meal 😊
          </h1>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-1/2 my-0 md:my-8 max-w-md p-6 text-white bg-teal-600 bg-opacity-90 rounded-lg"
          >
            <h1 className="text-3xl mb-4 text-center font-bold">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="👤 Full Name"
                className="p-2 mb-4 w-full bg-white text-black rounded-md outline-transparent"
                onChange={handleInputChange}
              />
            )}

            <input
              ref={email}
              type="text"
              placeholder="✉️ Email Address"
              className="p-2 mb-4 w-full bg-white text-black rounded-md outline-transparent"
              onChange={handleInputChange}
            />
            <input
              ref={password}
              type="password"
              placeholder="🔑 Password"
              className="p-2 mb-4 w-full bg-white text-black rounded-md outline-transparent"
              onChange={handleInputChange}
            />

            <button
              className="p-2 mb-4 w-full rounded-lg bg-zinc-700 hover:bg-zinc-800 text-white"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>

            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            <div className="flex justify-center">
              <p className="mr-2">
                {!isSignInForm ? "Already Registered?" : "New to QuickBite?"}
              </p>
              <p className="cursor-pointer underline" onClick={toggleisSignInForm}>
                {isSignInForm ? "Sign up now" : "Sign in now"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

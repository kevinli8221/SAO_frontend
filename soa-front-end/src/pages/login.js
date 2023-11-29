import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Login() {
	const navigate = useNavigate();
	const [userLogin, setUserLogin] = useState({
		username: "",
		password: "",
	});
	
	function handleUsernameUpdate(e) {
		setUserLogin({
			...userLogin,
			username: e.target.value
		});
	}

	function handlePasswordUpdate(e) {
		setUserLogin({
			...userLogin,
			password: e.target.value
		});
	}
	
	const handleLoginAttempt = (e) => {
		//todo: validate credentials
		navigate("/");
	}
	return(
		<div>
			<label>
				Username: 
				<input
					value = {userLogin.username}
					onChange = {handleUsernameUpdate}
				/>
			</label>
			<label>
				Password: 
				<input
					value = {userLogin.password}
					onChange = {handlePasswordUpdate}
				/>
			</label>
			<button onClick={handleLoginAttempt}>Log In</button>
		</div>
	);
}

export default Login;
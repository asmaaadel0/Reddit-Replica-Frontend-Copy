<template>
	<div class="Abd">
		<div class="largest-div">
			<!--the div that include all page -->
			<div class="back-image"></div>
			<!--the div that include BackGround Image (Left side) -->
			<div class="sec-largest-div">
				<!--the div that include all right side  -->
				<div class="right-side">
					<h1>Log in</h1>

					<p class="user-agreement">
						By continuing, you agree to our
						<a href="/help">User Agreement</a>
						and
						<a href="/help">Privacy Policy</a>.
					</p>

					<form class="logining-in" @submit.prevent="handleSubmit">
						<!--LogIn with google and facebook accounts -->

						<div class="login-google-apple">
							<GoogleSigninButton id="google-login" class="log-google log-ag" />
							<facebookSigninButton
								id="facebook-login"
								class="log-google log-ag"
							/>
							<!-- <v-facebook-login
							id="facebook-login"
							class="log-facebook log-ag"
							app-id="651769123026203"
							v-model="model"
							@sdk-init="handleSdkInit"
						></v-facebook-login> -->

							<!-- <button
							v-facebook-signin-button="appId"
							class="facebook-signin-button"
						>
							Continue with Facebook
						</button> -->
							<!-- <fb:login-button
							scope="public_profile,email"
							onlogin="checkLoginState();"
						></fb:login-button> -->

							<div class="page-divider">
								<span class="page-divider-line"></span>
								<span class="page-divider-text">or</span>
								<span class="page-divider-line"></span>
							</div>
						</div>

						<div class="username-field field-pass-usr input-box">
							<!--Group of UserName Element -->

							<input
								id="user-name"
								type="text"
								required="required"
								v-model="username"
								:class="
									!showSignuser
										? ''
										: !checkedUser
										? 'red-border'
										: 'blue-border'
								"
							/>
							<span class="animation-usr-pass">UserName</span>
							<span
								v-if="showSignuser"
								:class="checkedUser ? 'correct-check' : 'wrong-check'"
							></span>

							<div class="username-error-message" v-if="messageErrorShowUser">
								{{ error_message }}
							</div>
							<!--Error Message Shown here -->
						</div>

						<div class="username-field field-pass-usr input-box">
							<!--Group of Password Element -->

							<input
								id="password"
								type="password"
								required="required"
								v-model="password"
								:class="messageErrorShowPass ? 'red-border' : ''"
							/>
							<span class="animation-usr-pass">Password</span>
							<span
								v-if="showSignPass"
								:class="checkedPass ? 'correct-check' : 'wrong-check'"
							></span>
						</div>

						<button id="login-button" class="submit-login" type="submit">
							Log In
						</button>
						<div class="redirected-message" v-if="done_login">
							{{ done_message }}
						</div>

						<div class="forgot-usr-pass">
							<span>Forgot your</span>
							<a href="/forgetUsernamepage">username</a> <span> or </span>
							<a href="/forgetPasswordpage">password</a><span>?</span>
						</div>
						<div class="register-bottom">
							New to Reddit?

							<li><router-link to="/signup">Sign Up </router-link></li>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import GoogleSigninButton from '../../components/auth/GoogleSigninButton.vue';
import facebookSigninButton from '../../components/auth/facebookSigninButton.vue';
export default {
	name: 'LogIn',
	data() {
		return {
			username: '', // username
			password: '', // password user
			showSignuser: false, // true or error for user
			checkedUser: true, // true or error for user
			error_message: '', // error message shown
			messageErrorShowUser: false, // showing err message
			messageErrorShowPass: false,
			showSignPass: false, // true or error for pass
			Check: false, // flag for validation
			users: {}, //test array
			checkedPass: true, //true or error for pass
			done_message: '',
			done_login: false,
		};
	},
	methods: {
		// @vuese
		// Validation for UserName (Not a long or Short Input)
		validateUser(value) {
			this.showSignuser = false;
			this.messageErrorShowUser = false;
			this.showSignPass = false;
			this.messageErrorShowPass = false;
			// document.querySelector('#user-name').style.border =
			// 	'1px solid rgba(0, 0, 0, 0.1)';
			if (value.length < 3 || value.length > 20) {
				this.showSignuser = true;
				this.checkedUser = false;
				this.messageErrorShowUser = true;
				this.error_message = 'Username must be between 3 and 20 characters';
				// document.querySelector('#user-name').style.border =
				// 	'0.5px solid #ea0027';
			} else {
				this.showSignuser = true;
				this.checkedUser = true;
				this.messageErrorShowUser = false;
				// document.querySelector('#user-name').style.border =
				// 	'0.5px solid #0079d3';
			}
		},
		// @vuese
		// posting username and password and wait for token to get login
		async handleSubmit() {
			const actionPayload = {
				username: this.username,
				password: this.password,
				baseurl: this.$baseurl,
			};

			try {
				await this.$store.dispatch('loginhandle', actionPayload);
				// const response = localStorage.getItem('response');
				this.done_login = true;
				this.done_message =
					'youre now logged in, You will be redirected to main page';
				// this.$router.replace('/main');

				await this.$store.dispatch('notifications/createNotificationToken', {
					baseurl: this.$baseurl,
					token: localStorage.getItem('accessToken'),
				});

				setTimeout(() => this.$router.replace('/main'), 1000);
				// if (response == 200) {
				// }
			} catch (err) {
				this.showSignuser = true;
				this.checkedUser = false;
				this.messageErrorShowUser = true;
				this.error_message = 'Incorrect username or password';
				this.showSignPass = true;
				this.checkedPass = false;
				this.messageErrorShowPass = true;
				// this.error = err;
				document.querySelector('#user-name').style.border =
					'0.5px solid #ea0027';
			}
		},
	},
	watch: {
		// @vuese
		//watch username if it's not empty
		username(value) {
			this.username = value;
			this.validateUser(value);
		},
	},
	components: { GoogleSigninButton, facebookSigninButton },
};
</script>

<style scoped>
.facebook-signin-button {
	color: white;
	background-color: #3b5998;
	height: 50px;
	font-size: 16px;
	border-radius: 10px;
	padding: 10px 20px 25px 20px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.Abd {
	margin: 0;
	height: 100vh;
	font-family: 'IBMPlexSans', sans-serif;
	font-size: 14px;
	font-weight: 500;
	line-height: 18px;
	color: #1a1a1b;
	background-color: #fff;
}
h1 {
	font-family: 'IBMPlexSans', sans-serif;
	display: block;
	margin-block-start: 0.7em;
	margin-block-end: 0.7em;
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
}
fieldset {
	border: none;
	margin: 10px 0;
	padding: 0;
	position: relative;
}
button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 100px;
	box-sizing: border-box;
	cursor: pointer;
}
.largest-div {
	background-color: white;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	overflow-x: hidden;
	min-height: 100vh;
	position: relative;
	width: 100%;
}
.input-box {
	position: relative;
	align-items: center;
	width: min-content;
	margin-bottom: 10px;
}
.input-box .blue-border {
	border: 0.5px solid #0079d3;
	border-color: #24a0ed;
}
.back-image {
	background-image: url('../../../img/bck.png');
	height: 100vh;
	min-height: 430px;
	width: 12rem;
	float: left;
	background-repeat: no-repeat;
	background-size: cover;
}
.sec-largest-div {
	width: 100%;
	padding: 0px;
	margin: 0;
}
.user-agreement {
	margin-bottom: 48px;
	font-family: Noto Sans, sans-serif;
	font-size: 12px;
	font-weight: 400;
	line-height: 18px;
}
/* class of log in with google and log in with apple */
.log-ag {
	font-size: 14px;
	font-family: 'IBMPlexSans', sans-serif;
	letter-spacing: 0.5px;
	border: 1px solid #0079d3;
	border-radius: 4px;
	text-align: center;
	text-transform: uppercase;
	cursor: pointer;
	font-weight: 600;
	background-color: #fff;
	color: #0079d3;
	display: block;
	margin: 8px 0;
	/* width: 60%; */
}
.page-divider {
	align-items: center;
	display: flex;
	margin: 28px 0;
}
.page-divider-line {
	width: 20%;
	border-top: 1px solid #edeff1;
	margin-left: 10px;
	margin-right: 10px;
}
.page-divider-text {
	text-transform: uppercase;
	font-weight: 500;
	line-height: 18px;
	color: #878a8c;
	font-size: 14px;
}
.right-side {
	padding: 24px;
	min-width: 260px;
	max-width: 440px;
}
.field-pass-usr input {
	position: relative;
	transform: translateZ(0);
	width: 26rem;
	transition: all 0.2s ease-in-out;
	height: 48px;
	padding: 22px 12px 10px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	background-color: #fcfcfb;
	font-size: 14px;
	margin-top: 5px;
	outline: none;
}
.field-pass-usr .animation-usr-pass {
	font-size: 10px;
	font-weight: 600;
	letter-spacing: 0.5px;
	font-family: 'IBM Plex Sans', sans-serif;
	color: #a5a4a4;
	position: absolute;
	left: 12px;
	padding: 15px 20px 20px 15px;
	pointer-events: none;
	line-height: 20px;
	transition: all 0.2s ease-in-out;
	text-transform: uppercase;
}
.username-error-message {
	font-size: 12px;
	font-weight: 500;
	line-height: 16px;
	margin-top: 4px;
	max-height: 1000px;
	opacity: 1;
	color: #ea0027;
	transition: all 0.2s ease-in-out;
}
.redirected-message {
	padding: 10px;
	font-size: 12px;
	font-weight: 500;
	line-height: 16px;
	margin-top: 4px;
	max-height: 1000px;
	opacity: 1;
	color: #0079d3;
	transition: all 0.2s ease-in-out;
}
.animation-usr-pass::after {
	content: '\2022';
	color: #24a0ed;
	font-size: 18px;
	font-weight: 600;
	line-height: 25px;
	display: inline-block;
	margin-left: 5px;
}
.input-box .red-border {
	border: 0.5px solid #ea0027;
}
.input-box .correct-check {
	position: absolute;
	z-index: 1;
	right: 15px;
	top: 22px;
	height: 10px;
	width: 12px;
	background: url(https://www.redditstatic.com/accountmanager/d489caa9704588f7b7e1d7e1ea7b38b8.svg);
}
.input-box .wrong-check {
	position: absolute;
	z-index: 1;
	right: 15px;
	top: 22px;
	height: 12px;
	width: 2px;
	background: url(https://www.redditstatic.com/accountmanager/90a416eeb64d4d6ecd46c53d4ee11975.svg);
}
.password-field .wrong-check {
	top: 40%;
}
.field-pass-usr input:focus ~ .animation-usr-pass,
.field-pass-usr input:hover ~ .animation-usr-pass,
.field-pass-usr input:valid ~ .animation-usr-pass,
.field-pass-usr ~ .animation-usr-pass {
	transform: translateX(0.8px) translateY(-15px);
	font-size: 9px;
	padding: 20px 0px;
	padding-right: 36px;
	border-radius: 4px;
	border-color: #24a0ed;
}
.field-pass-usr input:focus ~ .animation-usr-pass::after,
.field-pass-usr input:hover ~ .animation-usr-pass::after,
.field-pass-usr input:valid ~ .animation-usr-pass::after,
.field-pass-usr ~ .animation-usr-pass::after {
	display: none;
}
.forgot-usr-pass,
.register-bottom {
	font-family: 'Noto Sans', sans-serif;
	font-size: 12px;
	font-weight: 400;
	line-height: 18px;
	margin-top: 8px;
	margin-bottom: 20px;
}
.submit-login {
	font-size: 14px;
	font-weight: 600;
	font-family: 'IBMPlexSans', sans-serif;
	letter-spacing: 0.5px;
	border: none;
	border-radius: 4px;
	text-align: center;
	background: #0079d3;
	color: #fff;
	text-transform: uppercase;
	cursor: pointer;
	min-height: 35px;
	max-width: 392px;
	width: 26rem;
	min-width: 155px;
}
.log-facebook,
.log-google {
	width: 26rem;
	display: flex;
	align-items: center;
	/*justify-content: space-between;*/
}
.log-facebook:hover,
.log-google:hover {
	background-color: var(--color-blue-2);
	color: var(--color-white-1);
}
.logo-img {
	height: 2rem;
	width: 2rem;
	margin: 1rem;
}
</style>

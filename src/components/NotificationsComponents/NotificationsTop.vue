<template>
	<div class="ntf-top" id="ntf-top-1">
		<h1 class="ntf-top-title" id="ntf-top-2">Notifications</h1>
		<nav id="ntf-top-3">
			<ul id="ntf-top-4">
				<li id="ntf-top-5">
					<router-link to="/notifications" id="ntf-top-6"
						><span>Activity</span></router-link
					>
				</li>
				<li id="ntf-top-7">
					<router-link to="/message/messages" id="ntf-top-8"
						><span>Messages</span></router-link
					>
				</li>
				<li id="ntf-top-9">
					<button @click="markAllRead" id="ntf-top-10">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-bookmark-check"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
							/>
							<path
								d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
							/>
						</svg>
						<span>Mark as read</span>
					</button>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	emits: ['reload'],
	methods: {
		//@vuese
		//mark all notifications as read
		//@arg no argument
		async markAllRead() {
			const accessToken = localStorage.getItem('accessToken');
			await this.$store.dispatch('notifications/markAllRead', {
				baseurl: this.$baseurl,
				token: accessToken,
			});
			//@vuese
			//emit fires to reload the component to get the new data
			this.$emit('reload');
		},
	},
};
</script>

<style scoped>
.ntf-top {
	margin: 5rem auto 0rem auto;
	width: 65rem;
	font-family: Arial, Helvetica, sans-serif;
}
.ntf-top-title {
	color: var(--color-dark-3);
	padding: 4rem 0 2rem;
	font-size: 2.2rem;
	line-height: 2.6rem;
	margin: 0;
	letter-spacing: 0.05rem;
	font-weight: 550;
}
ul {
	display: flex;
	list-style: none;
}
li {
	position: relative;
	cursor: pointer;
	padding: 1.5rem 1.2rem;
	margin-right: 0.8rem;
}
span {
	font-size: 1.4rem;
	font-weight: 700;
	line-height: 1.8rem;
	border-bottom: none;
	color: var(--color-grey-dark-10);
	display: inline-block;
}
button {
	background-color: transparent;
	border: none;
}
svg {
	color: var(--color-grey-dark-10);
	margin-right: 0.6rem;
	vertical-align: top;
}
li:last-of-type {
	margin-left: auto;
}
@media only screen and (max-width: 850px) {
	li:last-of-type {
		margin-left: 0;
	}
}

@media only screen and (max-width: 850px) {
	.ntf-top-title {
		margin-left: 3rem;
	}
}
span:hover {
	color: var(--color-dark-3);
}
li:first-of-type {
	border-bottom: var(--line-5);
	border-width: 0.3rem;
}
li:first-of-type span {
	color: var(--color-dark-3);
}
</style>

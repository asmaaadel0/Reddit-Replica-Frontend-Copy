<template>
	<!-- header component -->
	<div>
		<the-header :header-title="'Messages'"></the-header>
		<message-bar></message-bar>
		<inbox-bar v-if="showSecondBar"></inbox-bar>
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-10 content-col">
					<router-view v-slot="slotProps">
						<transition name="route" mode="out-in">
							<component :is="slotProps.Component"></component>
						</transition>
					</router-view>
				</div>
			</div>
		</div>
		<messages-footer></messages-footer>
	</div>
</template>

<script>
import MessageBar from '../../components/MessageComponents/MessageBar.vue';
import InboxBar from '../../components/MessageComponents/InboxBar.vue';
import MessagesFooter from '../../components/MessageComponents/MessagesFooter.vue';
export default {
	components: {
		MessageBar,
		InboxBar,
		MessagesFooter,
	},
	beforeMount() {
		if (!localStorage.getItem('accessToken')) {
			this.$router.push('/login');
			document.title = 'reddit';
		}
	},
	computed: {
		// @vuese
		//return if bath not sent bath or compose
		// @type boolean
		showSecondBar() {
			return (
				this.$route.path !== '/message/compose' &&
				this.$route.path !== '/message/sent'
			);
		},
	},
};
</script>

<style>
.content-col {
	margin: 2rem;
}
.no-messages {
	background-color: var(--main-white-color);
	padding: 2rem;
	margin-right: auto;
	color: var(--color-grey-dark-2);
	font-size: small;
}
.ul-messages {
	list-style: none;
	display: flex;
	flex-flow: row wrap;
	width: 100%;
}
.message {
	margin: 0;
	padding: 1rem 1.5rem;
	color: #373c3f;
	list-style: none;
}
.message-grey {
	background-color: var(--color-blue-light-4) !important;
}
.message-white {
	background-color: var(--main-white-color) !important;
}
.message:nth-child(odd) {
	background-color: var(--color-blue-light-4);
}
.message:nth-child(even) {
	background-color: var(--main-white-color);
}
.subject-text {
	font-weight: bold;
	font-size: 1.3rem;
}
.post-reply {
	margin: 1rem;
	font-weight: bold;
	font-size: larger;
}
.post-reply:after {
	content: ':';
}
.md-details {
	margin-left: 2.6rem;
	color: var(--color-grey-dark-2);
}
.md {
	margin-left: 2.6rem;
	font-size: 1.5rem;
}
.flat-list {
	font: normal x-small verdana, arial, helvetica, sans-serif;
	margin-top: 1rem;
	margin-bottom: 1rem;
	list-style: none;
	display: flex;
	flex-flow: row wrap;
	width: 100%;
}
.flat-list li {
	margin: 1rem;
	font-size: 1rem;
	font-weight: bold;
	list-style: none;
}
.flat-list li a,
.link {
	color: var(--color-grey-dark-2);
	cursor: pointer;
}
.sure-block {
	color: var(--color-red-dark-1);
}
div.vote-box {
	text-align: center;
	border-radius: 0.5rem 0 0 0.5rem;
	cursor: pointer;
}

.vote-box .downvote svg,
.vote-box .upvote svg {
	width: 2rem;
	height: 2rem;
	fill: var(--color-grey-dark-4);
}
.downvote .icon-shift {
	transform: rotate(180deg);
}
.vote-box svg.up-clicked {
	fill: var(--color-Primary-light-2);
}

.vote-box svg.down-clicked {
	fill: var(--color-blue-5);
}
.box-unread {
	margin: 1rem;
	background-color: var(--color-grey-light-10);
	border-color: var(--color-grey-light-10);
}
.unread {
	color: var(--color-red-dark-1);
}

.hide-message {
	display: none;
}
/* 296px */
@media only screen and (max-width: 296px) {
	.row > * {
		padding-right: 0;
		padding-left: 0;
	}
}
</style>

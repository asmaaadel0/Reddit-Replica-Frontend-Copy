<template>
	<div>
		<!-- should be v-if show -->
		<li class="item" v-if="show">
			<div class="image" id="ban">
				<img
					v-if="!ban.avatar"
					src="../../../img/default_inbox_avatar.png"
					alt="img"
					class="img"
					:id="'moderator-img-' + index"
				/>
				<img
					v-else
					:src="$baseurl + '/' + ban.avatar"
					alt="img"
					class="img"
					:id="'moderator-img-' + index"
				/>
				<h5 class="heading-5" :id="'ban-name-' + index">
					{{ ban.username }}
				</h5>
			</div>
			<div class="time">
				<span v-if="ban.banPeriod">
					{{ handleTime }} (for {{ ban.banPeriod }} days)•{{
						ban.reasonForBan
					}}</span
				>
				<span v-else> {{ handleTime }} (Permanent)•{{ ban.reasonForBan }}</span>
				<!-- <span>{{ moderator.dateOfModeration }}</span> -->
			</div>
			<div class="permissions">
				<base-button
					class="button-ban"
					:id="'button-edit' + index"
					@click="showAddBanFunction()"
					>Edit</base-button
				>
				<base-button
					class="button-ban"
					:id="'button-more-details' + index"
					@click="viewDetailsFunction()"
					>More Details<svg
						v-if="!viewDetails"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-caret-down icon-delete"
						viewBox="0 0 16 16"
					>
						<path
							d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"
						/>
					</svg>
					<svg
						v-else
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-caret-up icon-delete"
						viewBox="0 0 16 16"
					>
						<path
							d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"
						/>
					</svg>
				</base-button>
			</div>
		</li>
		<div class="show-more" v-if="viewDetails">
			<div class="banned-for">Banned For:</div>
			<div class="reason">{{ ban.reasonForBan }}</div>
		</div>
		<div class="add-ban" v-if="showAddBan">
			<add-ban
				@done-successfully="doneSuccessfully()"
				@exit="showAddBanFunction()"
				:ban-name-edit="ban.username"
				:ban-period-edit="ban.banPeriod"
				:ban-mod-note-edit="ban.modNote"
				:ban-note-include-edit="ban.noteInclude"
				:ban-reason-for-edit="ban.reasonForBan"
				:edited="true"
			></add-ban>
		</div>
	</div>
</template>

<script>
import AddBan from '../../components/moderation/AddBan.vue';
export default {
	components: { AddBan },
	emits: ['doneSuccessfully'],
	beforeMount() {
		this.calculateTime();
	},
	props: {
		// @vuese
		//details of moderator
		// @type object
		ban: {
			type: Object,
			required: true,
			default: () => ({
				username: '',
				userId: '',
				avatar: '',
				bannedAt: '',
				banPeriod: 0,
				modNote: '',
				noteInclude: '',
				reasonForBan: '',
			}),
		},
		// @vuese
		//seacrhing value
		// @type string
		search: {
			type: String,
			default: '',
		},
		// @vuese
		//index to handle unique ids
		// @type number
		index: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	data() {
		return {
			sureShown: false,
			viewDetails: false,
			showAddBan: false,
			handleTime: '',
		};
	},
	computed: {
		// @vuese
		//at searching check if it is the value of seacrhing or not
		// @type boolean
		show() {
			if (this.search != '') {
				if (this.search == this.ban.username) {
					return true;
				} else return false;
			}
			return true;
		},

		// @vuese
		//return subreddit name
		// @type string
		subredditName() {
			// return this.$store.state.subredditName;
			return this.$route.params.subredditName;
		},
	},
	methods: {
		// @vuese
		// Used to show view Details
		// @arg no argument
		viewDetailsFunction() {
			this.viewDetails = !this.viewDetails;
		},
		// @vuese
		// Used to show add rule popup
		// @arg no argument
		showAddBanFunction() {
			this.showAddBan = !this.showAddBan;
		},
		// @vuese
		// Used to show add rule popup
		// @arg no argument
		doneSuccessfully() {
			this.$emit('doneSuccessfully');
		},
		// @vuese
		//calculate time
		// @arg no argument
		calculateTime() {
			var currentDate = new Date();
			var returnValue = '';
			var myTime = new Date(this.ban.bannedAt);
			if (currentDate.getFullYear() != myTime.getFullYear()) {
				returnValue = myTime.toJSON().slice(0, 10).replace(/-/g, '/');
			} else if (currentDate.getMonth() != myTime.getMonth()) {
				returnValue = currentDate.getMonth() - myTime.getMonth() + ' Month ago';
			} else if (currentDate.getDate() != myTime.getDate()) {
				returnValue = currentDate.getDate() - myTime.getDate() + ' Days ago';
			} else if (currentDate.getHours() != myTime.getHours()) {
				returnValue = currentDate.getHours() - myTime.getHours() + ' Hours ago';
			} else if (currentDate.getMinutes() != myTime.getMinutes()) {
				returnValue =
					currentDate.getMinutes() - myTime.getMinutes() + ' Minutes ago';
			} else {
				returnValue = 'Just now';
			}
			this.handleTime = returnValue;
		},
	},
};
</script>

<style scoped>
.item {
	display: flex;
	align-items: center;
	height: 5rem;
	justify-content: space-between;
	border-bottom: var(--line);
}
.image {
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 1rem;
	margin-left: 1.5rem;
	border-radius: 0.5rem;
	margin-right: 4.5rem;
}
.image:hover {
	background-color: var(--color-grey-light-10);
}
.img {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 0.3rem;
	margin-right: 0.6rem;
}
.time,
.permissions {
	align-items: center;
	font-size: 1.2rem;
}
.time {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex: 1 0 100px;
	line-height: normal;
	font-size: 1.2rem;
}
.permissions {
	margin-right: 2rem;
}
.heading-5 {
	color: var(--color-dark-1);
}
.delete-icon {
	margin-left: 1rem;
	cursor: pointer;
}
.rule-dialog {
	max-height: 100%;
	max-width: 53.8rem;
	min-width: 41rem;
}
.sure-text {
	line-height: 2.2rem;
	margin: 1rem 0;
	white-space: pre-wrap;
	font-family: Noto Sans, Arial, sans-serif;
	font-weight: 400;
	color: var(--color-dark-3);
	font-size: 1.4rem;
	line-height: 2.1rem;
	display: block;
}
.rule-box-p {
	align-items: flex-start;
	margin-top: 1.2rem;
	margin-bottom: 3rem;
}
.box {
	margin-top: 1rem;
	width: 15rem;
	background-color: var(--color-dark-1);
	color: var(--color-white-1);
	font-size: 0.9rem;
	padding: 1rem;
	position: absolute;
	border-radius: 0.4rem;
	text-align: center;
	pointer-events: none;
	transform: translateX(-50%);
	z-index: 100;
	right: -16rem;
}
.box-buttons {
	background-color: var(--color-grey-light-2);
	padding: 16px;
	margin: 16px -16px -16px;
	display: flex;
	justify-content: flex-end;
	border-bottom-right-radius: 4px;
	box-sizing: border-box;
}
button {
	min-height: 32px;
	min-width: 32px;
	padding: 4px 16px;
	margin-left: 8px;
	font-size: 14px;
	font-weight: 700;
}
.button-blue:hover {
	background-color: rgb(248, 89, 89);
	border: 1px solid rgb(248, 89, 89);
	padding: 0.4rem 1.6rem;
}
.button-white {
	border: 1px solid var(--color-blue-2);
	color: var(--color-blue-2);
	padding: 0.4rem 1.6rem;
}
.button-white:hover {
	border: 1px solid var(--color-grey-dark-8);
	color: var(--color-grey-dark-8);
	padding: 0.4rem 1.6rem;
}
.button-blue {
	background-color: var(--color-blue-2);
	border: 1px solid var(--color-blue-2);
	color: var(--color-white-1);
	padding: 0.4rem 1.6rem;
}
.no-messages {
	margin-top: 2rem;
	padding: 1rem;
}
.button-ban {
	background-color: transparent;
	color: var(--color-blue-2) !important;
	fill: var(--color-blue-2);
	font-size: 1.3rem;
}
.button-ban:hover {
	background-color: var(--color-grey-light-4);
}
.show-more {
	background-color: var(--color-grey-light-10);
	border-top: 0;
	padding: 16px;
	word-break: break-all;
	font-size: 1rem;
}
.banned-for {
	font-weight: 700;
	letter-spacing: 0.5px;
	line-height: 12px;
	text-transform: uppercase;
	color: var(--color-grey-dark-8);
	display: inline-block;
	margin-right: 3px;
}
.reason {
	font-family: Noto Sans, Arial, sans-serif;
	font-weight: 400;
	line-height: 18px;
	display: inline-block;
	padding-top: 10px;
	color: var(--color-dark-1);
}
/* 340px */
@media only screen and (max-width: 441px) {
	.time {
		display: none;
	}
	.icon-delete {
		display: none;
	}
	.permissions {
		margin-right: 0;
	}
	.image {
		margin: 0;
	}
	button {
		padding: 4px 2px;
	}
}
</style>

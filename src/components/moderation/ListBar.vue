<template>
	<div>
		<!-- <div class="bar" v-if="barTitle == 'Schedule Post'">
			<base-button class="base-button">{{ barTitle }}</base-button>
		</div> -->
		<div class="bar">
			<div class="bar" v-if="title == 'Moderators'">
				<base-button
					class="button-white"
					id="leave-mod-button"
					@click="leaveMod()"
					>Leave as mod</base-button
				>
				<base-button
					class="base-button"
					id="invite-user-mod-button"
					@click="inviteMod()"
					>Invite user as mod</base-button
				>
			</div>

			<div class="bar" v-if="title == 'approved'">
				<base-button
					class="base-button"
					id="approve-user-button"
					@click="ApproveUser()"
					>Approve user</base-button
				>
			</div>

			<div class="bar" v-if="title == 'muted'">
				<base-button
					class="base-button"
					id="mute-user-button"
					@click="MuteUser()"
					>Mute user</base-button
				>
			</div>

			<div class="bar" v-if="title == 'Rules' && !dragDrop">
				<base-button
					class="reorder-button"
					id="reorder-rules-button"
					:disabled="rulesCount < 1"
					:class="rulesCount > 1 ? '' : 'disable-button'"
					@click="reorderRules()"
					>Reorder rules</base-button
				>
				<base-button
					class="base-button"
					@click="showAddRuleFunction()"
					id="add-rules-button"
					:class="rulesCount == 15 ? 'content-controls-button' : ''"
					>Add rule</base-button
				>
			</div>

			<div class="bar" v-if="title == 'Rules' && dragDrop">
				<base-button
					class="button-white"
					id="cancel-reorder-rules-button"
					@click="reorderRules()"
					>Cancel</base-button
				>
				<base-button
					class="base-button"
					id="save-reorder-rules-button"
					@click="saveReorderRules()"
					>Save</base-button
				>
			</div>

			<div class="bar" v-if="title == 'banned'">
				<base-button
					class="base-button"
					id="ban-user-button"
					@click="showBanUser()"
					>Ban user</base-button
				>
			</div>

			<div class="bar" v-if="title == 'flair' && !dragDrop">
				<!-- <base-button class="button-white" id="post-flair-button"
				>Post flair settings</base-button
			> -->
				<base-button
					class="reorder-button"
					id="reorder-flairs-button"
					:disabled="flairsCount < 1"
					:class="flairsCount > 1 ? '' : 'disable-button'"
					@click="reorderFlairs()"
					>Reorder</base-button
				>
				<base-button
					class="base-button"
					id="add-flair-button"
					@click="showAddFlairFunction()"
					:disabled="showAddFlair"
					:class="showAddFlair ? 'disable-button ' : ''"
					>Add flair</base-button
				>
			</div>

			<div class="bar" v-if="title == 'flair' && dragDrop">
				<base-button
					class="button-white"
					id="cancel-reorder-flairs-button"
					@click="reorderFlairs()"
					>Cancel</base-button
				>
				<base-button
					class="base-button"
					id="save-reorder-flairs-button"
					@click="saveReorderFlairs()"
					>Save</base-button
				>
			</div>

			<div v-if="leftBar" class="bar second-bar">
				<base-button
					class="base-button"
					id="show-bar-button"
					@click="showBarFunction()"
					>Show Bar</base-button
				>
			</div>
		</div>

		<!-- <div class="bar" v-if="title == 'Post flair'">
			<base-button class="button-white">Post flair settings</base-button>
			<base-button class="reorder-post-flair-button">Reorder</base-button>
			<base-button class="base-button">Add flair</base-button>
		</div> -->
		<!-- <div v-if="title == 'Content controls'">
			<base-button class="content-controls-button" id="content-controls-button"
				>Save changes</base-button
			>
		</div> -->
	</div>
</template>

<script>
export default {
	emits: [
		'showAddRuleFunction',
		'reorderRules',
		'saveReorderRules',
		'showAddFlairFunction',
		'reorderFlairs',
		'savereorderFlairs',
		'showBanUser',
		'saveReorderFlairs',
		'inviteMod',
		'ApproveUser',
		'MuteUser',
		'leaveMod',
		'showBar',
	],
	props: {
		// @vuese
		// title to be written in bar
		// @type string
		title: {
			type: String,
			default: '',
			required: true,
		},
		// @vuese
		// subreddit name
		// @type string
		subredditName: {
			type: String,
			default: '',
			required: true,
		},
		// @vuese
		// rules count
		// @type number
		rulesCount: {
			type: Number,
			default: 0,
			required: true,
		},
		// @vuese
		// if there is drag and drop or not
		// @type boolean
		dragDrop: {
			type: Boolean,
			default: false,
			required: true,
		},
		// @vuese
		// if clicked on add flair or not
		// @type boolean
		showAddFlair: {
			type: Boolean,
			default: false,
			required: true,
		},
		// @vuese
		// flairs count
		// @type number
		flairsCount: {
			type: Number,
			default: 0,
			required: true,
		},
		// @vuese
		// to left bar or not
		// @type boolean
		leftBar: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	// computed: {
	// barTitle() {
	// 	if (this.title == 'Schedule Post') {
	// 		return 'Schedule Post';
	// 	} else return '';
	// },
	// },
	methods: {
		// @vuese
		// Used to show add rule popup
		// @arg no argument
		showAddRuleFunction() {
			this.$emit('showAddRuleFunction', this.showAddRule);
		},
		// @vuese
		// Used to show add flair
		// @arg no argument
		showAddFlairFunction() {
			this.$emit('showAddFlairFunction');
		},
		// @vuese
		// Used to handle re-order rules action
		// @arg no argument
		reorderRules() {
			this.$emit('reorderRules');
		},
		// @vuese
		// Used to show ban user
		// @arg no argument
		showBanUser() {
			this.$emit('showBanUser');
		},

		// @vuese
		// Used to handle re-order flairs action
		// @arg no argument
		reorderFlairs() {
			this.$emit('reorderFlairs');
		},
		// @vuese
		// Used to handle saving re-order rules action
		// @arg no argument
		saveReorderRules() {
			this.$emit('saveReorderRules');
		},

		// @vuese
		// Used to handle saving re-order rules action
		// @arg no argument
		saveReorderFlairs() {
			this.$emit('saveReorderFlairs');
		},
		// @vuese
		// Used to handle invite moderator action
		// @arg no argument
		inviteMod() {
			this.$emit('inviteMod');
		},
		// @vuese
		// Used to handle approve user action
		// @arg no argument
		ApproveUser() {
			this.$emit('ApproveUser');
		},
		// @vuese
		// Used to handle mute user action
		// @arg no argument
		MuteUser() {
			this.$emit('MuteUser');
		},
		// @vuese
		// Used to handle leave moderator action
		// @arg no argument
		leaveMod() {
			this.$emit('leaveMod');
		},
		// @vuese
		// Used to handle show left bar action
		// @arg no argument
		showBarFunction() {
			this.$emit('showBar');
		},
	},
};
</script>

<style scoped>
.bar {
	-ms-flex-align: center;
	align-items: center;
	background-color: var(--color-grey-light-10);
	display: -ms-flexbox;
	display: flex;
	-ms-flex-direction: row;
	flex-direction: row;
	height: 4.8rem;
	-ms-flex-pack: end;
	justify-content: flex-end;
	left: 28rem;
	padding: 0 2.4rem;
	position: fixed;
	right: 0;
	z-index: 3;
}
.second-bar {
	top: 13.8rem;
	justify-content: flex-start;
	border-top: 1px solid var(--color-blue-light-4);
}
button {
	position: relative;
	background-color: var(--color-blue-2);
	border: none;
	color: var(--main-white-color);
	fill: var(--main-white-color);
	font-family: Noto Sans, Arial, sans-serif;
	font-size: 1.4rem;
	font-weight: 700;
	letter-spacing: unset;
	line-height: 1.7rem;
	text-transform: unset;
	min-height: 3.2rem;
	min-width: 3.2rem;
	padding: 4px 1.6rem;
	-ms-flex-align: center;
	align-items: center;
	border-radius: 9999px;
	box-sizing: border-box;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-pack: center;
	justify-content: center;
	position: relative;
	text-align: center;
	width: auto;
}
.base-button:hover {
	background-color: var(--color-blue-6);
}
.button-white {
	margin-right: 0.8rem;
	border: 1px solid var(--color-blue-2);
	color: var(--color-blue-2);
	fill: var(--color-blue-2);
	background-color: transparent;
}
.button-white:hover {
	background-color: var(--color-blue-light-5);
}
.reorder-button {
	color: var(--color-blue-2) !important;
	fill: var(--color-blue-2);
	margin-right: 1rem;
	background-color: transparent;
}
.disable-button {
	filter: grayscale(1);
	cursor: not-allowed;
	color: var(--color-grey-light-5);
	fill: var(--color-grey-light-5);
}
.reorder-button:hover {
	background-color: var(--color-grey-light-4);
}
.reorder-post-flair-button {
	margin-left: 0.8rem;
	margin-right: 1.6rem;
	min-width: 10rem;
	cursor: not-allowed;
	filter: grayscale(1);
	border-color: var(--color-grey-light-5);
	border: 1px solid var(--color-grey-light-5);
	color: var(--color-grey-light-5);
	fill: var(--color-grey-light-5);
	background-color: transparent;
}
.content-controls-button {
	min-width: 15rem;
	cursor: not-allowed;
	filter: grayscale(1);
	border: none;
	color: rgba(255, 255, 255, 0.5);
	fill: rgba(255, 255, 255, 0.5);
	background-color: var(--color-grey-light-5);
}
.content-controls-button:hover {
	opacity: 0.8;
}
@media only screen and (max-width: 768px) {
	.bar {
		width: 100%;
		left: 0;
	}
	button {
		font-size: 1.2rem;
		padding: 0.2rem 1rem;
	}
}
</style>

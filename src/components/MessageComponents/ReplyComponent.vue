<template>
	<div class="child-reply" v-if="showReplyBox">
		<form action="#" class="form-reply">
			<div class="user-text-reply" :id="'reply-form-' + index">
				<div class="md">
					<textarea
						name="text"
						cols="1"
						rows="1"
						class="text-area"
						:id="'message-' + index"
						v-model="text"
					></textarea>
				</div>
			</div>
			<div class="markdown-links">
				<a href="#" target="__blank" :id="'content-policy-link-' + index"
					>content policy</a
				>
				<span
					class="markdown-link span-hide"
					@click="changeTitle()"
					:id="'formatting-button-' + index"
				>
					{{ formatting }} help
				</span>
			</div>
			<button
				class="submit-form"
				:id="'submit-form-' + index"
				v-if="!isMention"
				@click.prevent="replyFunction('send')"
			>
				Save
			</button>

			<button
				class="submit-form"
				:id="'submit-form-' + index"
				v-if="isMention"
				@click.prevent="replyCommentFunction('send')"
			>
				Save
			</button>
			<button
				class="submit-form"
				:id="'cancel-form-' + index"
				@click="replyFunction('hide')"
			>
				Cancel
			</button>
			<span class="delivered" v-if="delivered"
				>your reply has been delivered</span
			>
			<p class="error" v-if="error">we need something here</p>
			<div class="formatting-help" v-if="formatting == 'hide'">
				<p>
					reddit uses a slightly-customized version of
					<a
						href="https://daringfireball.net/projects/markdown/syntax"
						:id="'markdown-link-' + index"
						>Markdown</a
					>
					for formatting. See below for some basics, or check
					<a
						href="https://www.reddit.com/wiki/commenting/?utm_source=reddit&utm_medium=usertext&utm_name=frontpage&utm_content="
						:id="'the-commenting-wiki-page-link-' + index"
						>the commenting wiki page</a
					>
					for more detailed help and solutions to common issues.
				</p>
				<table>
					<tr>
						<th>You type</th>
						<th>You see</th>
					</tr>
					<tr>
						<td>*italic*</td>
						<td><i>italic</i></td>
					</tr>
					<tr>
						<td>**bold**</td>
						<td><strong>bold</strong></td>
					</tr>
					<tr>
						<td>[reddit!](https://reddit.com)</td>
						<td><router-link to="/">reddit!</router-link></td>
					</tr>
					<tr>
						<td>
							* item 1 <br />
							* item 2 <br />
							* item 3
						</td>
						<td>
							<li>item 1</li>
							<li>item 2</li>
							<li>item 3</li>
						</td>
					</tr>
					<tr>
						<td>> quoted text</td>
						<td>
							<blockquote class="block-quote">&nbsp;quoted text</blockquote>
						</td>
					</tr>
					<tr>
						<td>
							Lines starting with four spaces are treated like code:<br />
							&nbsp;&nbsp;&nbsp;&nbsp;if 1 * 2 &lt; 3: <br />
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print "hello,
							world!"
						</td>
						<td>
							Lines starting with four spaces are treated like code:<br />
							<pre>if 1 * 2 &lt; 3:<br/> &nbsp;&nbsp;&nbsp;&nbsp; print "hello, world!"</pre>
						</td>
					</tr>
					<tr>
						<td>~~strikethrough~~</td>
						<td><strike>strikethrough</strike></td>
					</tr>
					<tr>
						<td>super script</td>
						<td>super<sup>script</sup></td>
					</tr>
				</table>
			</div>
			<span class="error" v-if="errorResponse">{{ errorResponse }}</span>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formatting: 'formatting',
			error: null,
			errorResponse: null,
			delivered: false,
			text: '',
		};
	},
	emits: ['hideReplyBox', 'doneSuccessfully'],
	props: {
		// @vuese
		//show reply box prop
		// @type boolean
		showReplyBox: {
			type: Boolean,
			required: true,
			default: false,
		},
		// @vuese
		//index to handle unique ids
		// @type number
		index: {
			type: Number,
			required: true,
			default: 0,
		},
		// @vuese
		//id of the msg that this msg is a reply for
		// @type string
		id: {
			type: String,
			required: true,
			default: '',
		},
		// @vuese
		//receiver Username
		// @type string
		receiverUsername: {
			type: String,
			required: true,
			default: '',
		},
		// @vuese
		//sender Username
		// @type string
		senderUsername: {
			type: String,
			required: true,
			default: '',
		},
		// @vuese
		//subject
		// @type string
		subject: {
			type: String,
			required: true,
			default: '',
		},
		// @vuese
		//if the reply is mentions
		// @type boolean
		isMention: {
			type: Boolean,
			required: false,
			default: false,
		},
		// @vuese
		//post id
		// @type string
		postId: {
			type: String,
			required: false,
			default: '',
		},
		// @vuese
		//comment id
		// @type string
		parentId: {
			type: String,
			required: false,
			default: '',
		},
		// @vuese
		//parent type
		// @type string
		parentType: {
			type: String,
			required: false,
			default: '',
		},
		// @vuese
		//level of the comment
		// @type number
		level: {
			type: Number,
			required: false,
			default: 0,
		},
		// @vuese
		//subreddit name
		// @type string
		subredditName: {
			type: String,
			required: false,
			default: '',
		},
	},
	methods: {
		// @vuese
		//change title to formatting or hide
		// @arg no argument
		changeTitle() {
			if (this.formatting == 'formatting') this.formatting = 'hide';
			else this.formatting = 'formatting';
		},
		// @vuese
		//make form validation
		// @arg no argument
		formValidation() {
			this.delivered = false;
			this.errorResponse = null;
			if (this.text == '') {
				this.error = 'error';
			} else {
				this.error = '';
			}
		},
		// @vuese
		//show reply box or hide it, and handle request
		// @arg The argument is a string value representing if its show or hide
		async replyFunction(title) {
			if (title == 'hide') {
				this.$emit('hideReplyBox', true);
			} else if (title == 'send') {
				this.formValidation();
				if (this.error != '') return;
				this.delivered = false;
				this.errorResponse = null;
				try {
					await this.$store.dispatch('messages/sendMessage', {
						text: this.text,
						senderUsername: '/u/' + this.receiverUsername,
						receiverUsername: '/u/' + this.senderUsername,
						subredditName: this.subredditName,
						isReply: true,
						subject: 're: ' + this.subject,
						repliedMsgId: this.id,
						baseurl: this.$baseurl,
					});
					if (this.$store.getters['messages/sentSuccessfully']) {
						this.text = '';
						this.delivered = true;
						this.$emit('doneSuccessfully');
					} else {
						this.errorResponse = 'some thing wrong';
					}
				} catch (err) {
					console.log(err);
					this.errorResponse = err;
					this.delivered = false;
				}
			}
		},
		// @vuese
		//handle request of sending reply in user mention
		// @arg no argument
		async replyCommentFunction() {
			this.formValidation();
			if (this.error != '') return;
			this.delivered = false;
			this.errorResponse = null;
			let haveSubreddit = false;
			if (this.subredditName != '') {
				haveSubreddit = true;
			}
			try {
				await this.$store.dispatch('messages/addComment', {
					content: { ops: [{ insert: this.text }] },
					postId: this.postId,
					parentId: this.parentId,
					parentType: this.parentType,
					level: this.level,
					subredditName: this.subredditName,
					haveSubreddit: haveSubreddit,
					baseurl: this.$baseurl,
				});
				if (this.$store.getters['messages/addSuccessfully']) {
					this.text = '';
					this.delivered = true;
					// this.$emit('doneSuccessfully');
				} else {
					this.errorResponse = 'some thing wrong';
				}
			} catch (err) {
				console.log(err);
				this.errorResponse = err;
				this.delivered = false;
			}
		},
	},
};
</script>

<style scoped>
.child-reply {
	display: block;
}
.form-reply {
	margin-top: 1rem;
	margin-left: 1.2rem;
	font-size: small;
}
.user-text-reply {
	clear: left;
	margin-top: 1.5em;
	font-size: 1.2rem;
	padding: 0 1px;
	unicode-bidi: isolate;
}
.text-area {
	font: normal small verdana, arial, helvetica, sans-serif;
	line-height: 1.5em;
	width: 70%;
	height: 10rem;
	margin-top: 0;
	background-color: var(--color-white-1);
	color: black;
	display: block;
	padding: 3px 6px;
	box-sizing: border-box;
	border: var(--line-7);
	font-size: 1em;
	margin-bottom: 0.2rem;
}
.markdown-links {
	text-align: right;
	width: 70%;
}
.markdown-links a,
.markdown-link {
	margin-left: 1rem;
	font-size: smaller;
}
.submit-form {
	background-color: var(--color-blue-2);
	border-radius: 1rem;
	padding: 0rem;
	color: var(--color-white-1);
	border-color: var(--color-blue-2);
	font-weight: bolder;
	font-size: small;
	width: 8rem;
	text-transform: uppercase;
	margin-left: 1rem;
}
.markdown-link {
	border: none;
	color: #0d6efd;
	background-color: var(--color-white-1);
}
.formatting-help {
	border-top: var(--line-dashed-2);
	margin: 0.5rem 2rem;
	width: 56%;
}
table {
	width: 100%;
	margin: 5px 0px;
	font-size: 1.2rem;
	font-weight: 400;
	max-width: 60em;
	border-collapse: collapse;
	display: table;
	box-sizing: border-box;
	text-indent: initial;
	border-spacing: 2px;
	border-color: grey;
	clear: left;
	margin-top: 1.5em;
}
table td {
	text-align: left;
}
tr:first-child {
	width: 50%;
	border: 1px solid #c0c0c0;
	background-color: #ffff99;
}
td,
th {
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
}
.block-quote {
	margin-left: 5px;
	border-left: 2px solid #c5c1ad;
}
.error {
	color: var(--color-red-dark-1);
	padding: 0 2rem;
	font-size: small;
}
.span-hide {
	background-color: transparent;
	cursor: pointer;
}
/* 296px */
@media only screen and (max-width: 296px) {
	table {
		font-size: 1rem;
		font-weight: 300;
		width: 80%;
	}
	input,
	select,
	textarea {
		width: 70%;
	}
	.submit-form {
		font-size: 1rem;
	}
	.markdown-links {
		font-size: 1rem;
	}
	.formatting-help {
		font-size: 1rem;
		width: 80%;
		text-align: left;
		margin: 0.5rem 0rem;
	}
	.text-area {
		width: 100%;
	}
	.md {
		margin-left: 0rem;
	}
}
</style>

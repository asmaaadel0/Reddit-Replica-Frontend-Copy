<template>
	<div class="popup">
		<div class="popup-inner">
			<div class="comments">
				<div class="container bg-black" id="test">
					<div class="row justify-content-center align-items-center">
						<div class="col-7 d-flex">
							<div class="vote-box">
								<div class="upvote" @click="upvote" id="upvote">
									<svg
										class="icon icon-arrow-down p-1 up-clicked"
										v-if="upClicked"
									>
										<use xlink:href="../../../img/vote.svg#icon-arrow-up"></use>
									</svg>
									<svg class="icon icon-shift" v-else>
										<use xlink:href="../../../img/shift.svg#icon-shift"></use>
									</svg>
								</div>
								<div
									class="p-2 vote-count"
									:class="
										upClicked ? 'up-clicked' : downClicked ? 'down-clicked' : ''
									"
								>
									{{ counter }}
								</div>
								<div class="downvote" @click="downvote" id="downvote">
									<svg
										class="icon icon-arrow-down p-1"
										:class="downClicked ? 'down-clicked' : ''"
										v-if="downClicked"
									>
										<use
											xlink:href="../../../img/vote.svg#icon-arrow-down"
										></use>
									</svg>
									<svg class="icon icon-shift" v-else>
										<use xlink:href="../../../img/shift.svg#icon-shift"></use>
									</svg>
								</div>
							</div>
							<div class="post-title">
								<h4>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-card-text"
										viewBox="0 0 16 16"
									>
										<path
											d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
										/>
										<path
											d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
										/>
									</svg>
									{{ postDetails.title }}
								</h4>
							</div>
						</div>
						<div class="col-3 close">
							<button id="close" @click="closeComments">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-x"
									viewBox="0 0 16 16"
								>
									<path
										d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
									/>
								</svg>
								<span>close</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="post">
				<div class="container bg-grey">
					<div class="row justify-content-center">
						<div class="col-lg-7">
							<!-- section to display post information -->
							<div class="post-left">
								<div class="post-content d-flex">
									<div class="d-flex flex-column post-vote-box">
										<div class="upvote" @click="upvote" id="post-upvote">
											<svg
												class="icon icon-arrow-down p-1 up-clicked"
												v-if="upClicked"
											>
												<use
													xlink:href="../../../img/vote.svg#icon-arrow-up"
												></use>
											</svg>
											<svg class="icon icon-shift" v-else>
												<use
													xlink:href="../../../img/shift.svg#icon-shift"
												></use>
											</svg>
										</div>
										<div
											class="p-2 post-vote-count"
											:class="
												upClicked
													? 'up-clicked'
													: downClicked
													? 'down-clicked'
													: ''
											"
										>
											{{ counter }}
										</div>
										<div class="downvote" @click="downvote" id="post-downvote">
											<svg
												class="icon icon-arrow-down p-1"
												:class="downClicked ? 'down-clicked' : ''"
												v-if="downClicked"
											>
												<use
													xlink:href="../../../img/vote.svg#icon-arrow-down"
												></use>
											</svg>
											<svg class="icon icon-shift" v-else>
												<use
													xlink:href="../../../img/shift.svg#icon-shift"
												></use>
											</svg>
										</div>
									</div>
									<div class="main">
										<div
											class="content"
											v-if="Object.keys(postDetails).length != 0"
										>
											<post-content
												:editing="this.$route.query.edit == 'true'"
												:post="postDetails"
												:blur="false"
											></post-content>
											<div>
												<post-submit
													v-if="this.$route.query.edit == 'true'"
													:initial-content="postDetails.content"
												></post-submit>
												<div class="edit-post-buttons">
													<base-button
														v-if="this.$route.query.edit == 'true'"
														button-text="cancel"
														class="cancel"
														@click="cancePostEditing"
													/>
													<base-button
														v-if="this.$route.query.edit == 'true'"
														button-text="save"
														class="save"
														:disabled="!savePostEditing"
														@click="savePostEdit"
													/>
												</div>
											</div>
										</div>
										<div class="post-services">
											<ul
												class="services"
												v-if="
													(!postDetails.inYourSubreddit &&
														postDetails.subreddit != undefined) ||
													(postDetails.subreddit == undefined &&
														postDetails.postedBy != getuserName)
												"
											>
												<li>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														class="bi bi-chat-square"
														viewBox="0 0 16 16"
													>
														<path
															d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
														/>
													</svg>
													{{ commentsCount }} Comments
												</li>
												<li @click="showShareSubMenu" id="share">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														class="bi bi-arrow-90deg-right"
														viewBox="0 0 16 16"
													>
														<path
															fill-rule="evenodd"
															d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
														/>
													</svg>
													Share
													<ul class="sub-menu" v-if="shareSubMenuDisplay">
														<li>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																fill="currentColor"
																class="bi bi-signpost-2"
																viewBox="0 0 16 16"
															>
																<path
																	d="M7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586a1 1 0 0 0-2 0zM13.5 3l.75 1-.75 1H2V3h11.5zm.5 5v2H2.5l-.75-1 .75-1H14z"
																/>
															</svg>
															Crosspost
														</li>
													</ul>
												</li>

												<li id="post-direct-save">
													<div v-if="!saved" @click="savePost" id="save">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															class="bi bi-bookmark"
															viewBox="0 0 16 16"
														>
															<path
																d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
															/>
														</svg>
														Save
													</div>
													<div v-else @click="savePost" id="unsave">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															class="bi bi-bookmarks"
															viewBox="0 0 16 16"
														>
															<path
																d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"
															/>
															<path
																d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"
															/>
														</svg>
														Unsave
													</div>
												</li>
												<li @click="showSubMenu" id="submenu">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														class="bi bi-three-dots"
														viewBox="0 0 16 16"
													>
														<path
															d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
														/>
													</svg>
													<ul class="sub-menu" v-if="subMenuDisplay">
														<li
															v-if="!saved"
															@click="savePost"
															class="post-sub-save"
															id="sub-save"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																fill="currentColor"
																class="bi bi-bookmark"
																viewBox="0 0 16 16"
															>
																<path
																	d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
																/>
															</svg>
															Save
														</li>
														<li
															v-else
															@click="savePost"
															class="post-sub-save"
															id="sub-unsave"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																fill="currentColor"
																class="bi bi-bookmarks"
																viewBox="0 0 16 16"
															>
																<path
																	d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"
																/>
																<path
																	d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"
																/>
															</svg>
															Unsave
														</li>
														<li @click="hidePost" v-if="!postHidden" id="hide">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																fill="currentColor"
																class="bi bi-eye-slash"
																viewBox="0 0 16 16"
															>
																<path
																	d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
																/>
																<path
																	d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
																/>
																<path
																	d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
																/>
															</svg>
															Hide
														</li>
														<li @click="hidePost" id="unhide" v-else>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																fill="currentColor"
																class="bi bi-eye-slash"
																viewBox="0 0 16 16"
															>
																<path
																	d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
																/>
																<path
																	d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
																/>
																<path
																	d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
																/>
															</svg>
															Unhide
														</li>
													</ul>
												</li>
											</ul>
											<post-options
												v-else-if="postDetails.postedBy == getuserName"
												:post-data="{ data: postDetails, id: postDetails.id }"
												:pinned-post-flag="false"
												page="comment"
											></post-options>
										</div>
										<div class="comment-submit">
											<div class="comment-as-name" v-if="getuserName != ''">
												Comment as
												<router-link
													:to="{
														name: 'user',
														params: {
															userName: getuserName,
														},
													}"
													id="user-router"
													>{{ getuserName }}</router-link
												>
											</div>
											<comment-submit
												type="comment"
												parent-type="post"
												:parent-id="this.$route.path.split('/')[4]"
												:level="1"
												@new-comment="newComment"
												identifier="tool1"
												:current-text="{ ops: [{ insert: '\n' }] }"
												:subreddit-name="postDetails.subreddit"
											/>
										</div>
										<div class="sort-by" @click="displaySortByMenu" id="sort">
											<span class="title"
												>Sort By:{{ currentSortType }}
												<font-awesome-icon icon="fa-solid fa-caret-down"
											/></span>
											<subMenu
												:titles="['best', 'top', 'new', 'old']"
												class="sort-by-sub-menu"
												:display="showSortByMenu"
												@change-title="changeSortByTitle"
												:clicked-prop="currentSortType"
											/>
										</div>
									</div>
									<div class="bell" @click="follow" id="follow">
										<svg
											v-if="!isFollowed"
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											class="bi bi-bell"
											viewBox="0 0 22 22"
										>
											<path
												d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
											/>
										</svg>
										<svg
											v-else
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											class="bi bi-bell-fill"
											viewBox="0 0 22 22"
										>
											<path
												d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
											/>
										</svg>
									</div>
								</div>
								<div class="post-comments">
									<my-comment
										v-for="userComment in userComments"
										:key="userComment.commentId"
										:comment="userComment"
										:post-id="$route.path.split('/')[4]"
									></my-comment>
								</div>
							</div>
						</div>
						<div class="col-lg-3 left-left">
							<subreddit-info
								:subreddit-name="subredditName"
								v-if="postDetails.subreddit != undefined"
							></subreddit-info>
							<profile-card
								v-else-if="userData"
								:user-data="userData"
								:state="userState"
								:user-name="$route.params.userName"
							></profile-card>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- <button @click="click"></button> -->
	<div class="positioning">
		<SaveUnsavePopupMessage v-for="action in savedUnsavedPosts" :key="action">{{
			action
		}}</SaveUnsavePopupMessage>
	</div>
</template>
<script>
import SaveUnsavePopupMessage from '../../components/PostComponents/SaveUnsavePopupMessage.vue';
import SubMenu from '../BaseComponents/SubMenu.vue';
import SubredditInfo from './SubredditInfo.vue';
import MyComment from './MyComment.vue';
import CommentSubmit from './CommentSubmit.vue';
import ProfileCard from '../UserComponents/BaseUserComponents/Cards/ProfileCard.vue';
import PostOptions from '../UserComponents/BaseUserComponents/PostComponents/PostOptions.vue';
import PostContent from './PostContent.vue';
import PostSubmit from '../SubmitComponents/PostSubmit.vue';
export default {
	components: {
		PostSubmit,
		SubMenu,
		SubredditInfo,
		MyComment,
		CommentSubmit,
		ProfileCard,
		PostOptions,
		PostContent,
		SaveUnsavePopupMessage,
	},
	data() {
		return {
			postDetails: {},
			subredditName: this.$route.path.split('/')[2],
			haveSubreddit: false,
			upClicked: false,
			downClicked: false,
			counter: 22,
			postDescription: '',
			commentsCount: 22,
			postedBy: 'dummy',
			postedAt: '',
			isFollowed: false,
			subMenuDisplay: false,
			shareSubMenuDisplay: false,
			postHidden: false,
			saved: false,
			menuIsDisplayed: false,
			showSortByMenu: false,
			sortByTitle: 'Best',
			userComments: [],
			userState: '',
			userData: null,
		};
	},
	computed: {
		//@vuese
		//get userName
		getuserName() {
			if (localStorage.getItem('userName') == null) return '';
			else return localStorage.getItem('userName');
		},
		currentSortType() {
			if (this.$route.query.sort) return this.$route.query.sort;
			else return 'best';
		},
		savedUnsavedPosts() {
			return this.$store.getters['postCommentActions/getActions'];
		},
		savePostEditing() {
			if (this.$store.getters['posts/getContent'] == null) return false;
			else return true;
		},
	},
	watch: {
		async '$route.params.postId'(value) {
			if (value != undefined) {
				await this.getPostDetails();
				//if (this.$route.params.userName != undefined) this.RequestUserData();
				if (this.postDetails.subreddit == undefined)
					await this.RequestUserData();
				this.fetchPostComments();
				// document.getElementById('test').addEventListener('scroll', () => {
				// 	//console.log('scroll');
				// });
			}
		},
	},
	//@vuese
	//before mount fetch posts according to type of sorting
	async beforeMount() {
		await this.getPostDetails();
		//if (this.$route.params.userName != undefined) this.RequestUserData();
		if (this.postDetails.subreddit == undefined) await this.RequestUserData();
		this.fetchPostComments();
		document.getElementById('test').addEventListener('scroll', () => {
			// //console.log('scroll');
		});
	},
	methods: {
		click() {},
		handleScroll: function () {
			// //console.log('scroll');
			if (window.scrollY > 50) {
				this.fetchPostComments();
			}
			//return window.scrollY > 100;
		},
		async savePostEdit() {
			this.$router.push({ query: { edit: 'false' } });
			this.postDetails.content = this.$store.getters['posts/getContent'];
			try {
				await this.$store.dispatch('postCommentActions/editPost', {
					baseurl: this.$baseurl,
					content: this.$store.getters['posts/getContent'],
					id: this.postDetails.id,
				});
			} catch (error) {
				this.error = error.message || 'Something went wrong';
			}
		},
		async fetchPostComments() {
			try {
				await this.$store.dispatch('comments/fetchPostComments', {
					baseurl: this.$baseurl,
					id: this.$route.path.split('/')[4],
					beforeMod: '',
					afterMod: '',
					sort: this.sortByTitle.toLowerCase(),
				});
			} catch (error) {
				this.error = error.message || 'Something went wrong';
			}
			this.userComments =
				this.$store.getters['comments/getListOfComments'].children;
		},
		async RequestUserData() {
			let responseData;
			try {
				responseData = await this.$store.dispatch('user/getUserTempData', {
					baseurl: this.$baseurl,
					userName: this.$route.params.userName,
				});
			} catch (error) {
				this.error = error.message || 'Something went wrong';
			}
			if (responseData != null) this.userData = responseData;
		},
		renderingHTML() {
			var QuillDeltaToHtmlConverter =
				require('quill-delta-to-html').QuillDeltaToHtmlConverter;

			// TypeScript / ES6:
			// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

			var deltaOps = this.postDetails.content.ops;

			var cfg = {};

			var converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);

			var html = converter.convert();
			return html;
		},
		newComment(comment) {
			if (localStorage.getItem('userName') != null) {
				this.userComments.unshift(comment);
			} else {
				this.$router.replace('/login');
			}
		},
		//@vuese
		//fetch posts according to type of sorting
		async getPostDetails() {
			try {
				await this.$store.dispatch('listing/postDetails', {
					baseurl: this.$baseurl,
					id: this.$route.path.split('/')[4],
				});
			} catch (error) {
				this.error = error.message || 'Something went wrong';
			}
			this.postDetails = this.$store.getters['listing/getPostDetails'];
			this.counter = this.postDetails.votes;
			this.commentsCount = this.postDetails.comments;
			this.postedAt = this.postDetails.postedAt;
			this.isFollowed = this.postDetails.followed;
			this.upClicked = this.postDetails.votingType == 1 ? true : false;
			this.downClicked = this.postDetails.votingType == -1 ? true : false;
			this.saved = this.postDetails.saved;
			this.postHidden = this.postDetails.hidden;
			this.userState =
				localStorage.getItem('userName') == this.postDetails.postedBy
					? 'profile'
					: 'user';
		},
		//@vuese
		//change the order of comments listing according to parameter passed to it
		// @arg The argument is a string value representing sort type
		async changeSortByTitle(title) {
			this.sortByTitle = title;
			await this.$router.push({
				path: this.$route.fullPath,
				query: { sort: this.sortByTitle.toLowerCase() },
			});
			this.fetchPostComments();
		},
		//@vuese
		//opens the sorting menu of comments
		displaySortByMenu() {
			this.showSortByMenu = !this.showSortByMenu;
		},
		//@vuese
		//upvote on post
		async upvote() {
			if (localStorage.getItem('accessToken') != null) {
				if (this.downClicked) {
					this.downClicked = false;
					this.counter++;
				}
				if (this.upClicked == false) {
					this.upClicked = true;
					this.counter++;
				} else {
					this.upClicked = false;
					this.counter--;
				}
				try {
					await this.$store.dispatch('postCommentActions/vote', {
						baseurl: this.$baseurl,
						id: this.postDetails.id,
						type: 'post',
						direction: 1,
					});
				} catch (error) {
					this.error = error.message || 'Something went wrong';
				}
			} else {
				this.$router.replace('/login');
			}
		},
		//@vuese
		//downvote on post
		async downvote() {
			if (this.upClicked) {
				this.upClicked = false;
				this.counter--;
			}
			if (this.downClicked == false) {
				this.downClicked = true;
				this.counter--;
			} else {
				this.downClicked = false;
				this.counter++;
			}
			try {
				await this.$store.dispatch('postCommentActions/vote', {
					baseurl: this.$baseurl,
					id: this.postDetails.id,
					type: 'post',
					direction: -1,
				});
			} catch (error) {
				this.error = error.message || 'Something went wrong';
			}
		},
		//@vuese
		//follow post
		async follow() {
			if (localStorage.getItem('userName') != null) {
				try {
					await this.$store.dispatch('postCommentActions/followPost', {
						baseurl: this.$baseurl,
						id: this.$route.path.split('/')[4],
						follow: !this.isFollowed,
					});
				} catch (error) {
					this.error = error.message || 'Something went wrong';
				}
				this.isFollowed = !this.isFollowed;
			} else {
				this.$router.replace('/login');
			}
		},
		//@vuese
		//show services submenu of post
		showSubMenu() {
			this.subMenuDisplay = !this.subMenuDisplay;
			this.shareSubMenuDisplay = false;
		},
		//@vuese
		//hide post
		async hidePost() {
			if (localStorage.getItem('accessToken') != null) {
				this.postHidden = !this.postHidden;
				if (this.postHidden) {
					try {
						await this.$store.dispatch('postCommentActions/hide', {
							baseurl: this.$baseurl,
							id: this.$route.path.split('/')[4],
						});
					} catch (error) {
						this.error = error.message || 'Something went wrong';
					}
				} else {
					try {
						await this.$store.dispatch('postCommentActions/unhide', {
							baseurl: this.$baseurl,
							id: this.$route.path.split('/')[4],
						});
					} catch (error) {
						this.error = error.message || 'Something went wrong';
					}
				}
			} else {
				this.$router.replace('/login');
			}
		},
		//@vuese
		//save post
		async savePost() {
			if (localStorage.getItem('accessToken') != null) {
				this.saved = !this.saved;
				if (this.saved == true) {
					try {
						await this.$store.dispatch('postCommentActions/save', {
							baseurl: this.$baseurl,
							id: this.postDetails.id,
							type: 'post',
						});
					} catch (error) {
						this.error = error.message || 'Something went wrong';
					}
				} else {
					try {
						await this.$store.dispatch('postCommentActions/unsave', {
							baseurl: this.$baseurl,
							id: this.postDetails.id,
							type: 'post',
						});
					} catch (error) {
						this.error = error.message || 'Something went wrong';
					}
				}
			} else {
				this.$router.replace('/login');
			}
		},
		//@vuese
		//show share submenu of post
		showShareSubMenu() {
			this.shareSubMenuDisplay = !this.shareSubMenuDisplay;
			this.subMenuDisplay = false;
		},
		//@vuese
		//show menu of text area in fancy mode
		displayMenu() {
			this.menuIsDisplayed = !this.menuIsDisplayed;
		},
		//@vuese
		//swich mode of text area between mark down and fancy modes
		switchMode() {
			this.markdownMode = !this.markdownMode;
		},
		//@vuese
		//close comments page
		closeComments() {
			//if (this.$route.path.split('/')[1] == 'r')
			this.$router.push('/main');
			//else this.$router.back();
		},
		cancePostEditing() {
			this.$router.push({ query: { edit: 'false' } });
		},
	},
};
</script>
<style scoped>
.popup {
	position: absolute;
	top: 50px;
	left: 0;
	right: 0;
	z-index: 2;
	background-color: rgba(0, 0, 0, 0.2);

	display: flex;
	align-items: center;
	justify-content: center;
}
.popup-inner {
	width: 100%;
}
.bg-black {
	background-color: black;
}
.bg-grey {
	background-color: var(--color-grey-light-8);
	padding-top: 22px;
	height: 87.6vh;
	overflow: auto;
}
.post-left {
	background-color: white;
	padding: 8px 8px 3px 5px;
	width: 100%;
	border-radius: 5px;
}
.vote-box {
	text-align: center;
	display: flex;
	justify-content: center;
	border-left: 0.2px solid var(--color-grey-light-6);
	border-right: 0.2px solid var(--color-grey-light-6);
	width: 122px;
	height: 27.5px;
	padding: 0px 12px;
}
.vote-box .downvote svg,
.vote-box .upvote svg,
.post-vote-box svg {
	height: 27.5px;
	width: 27.5px;
	fill: var(--color-grey-light-6);
}
.vote-box .downvote:has(.icon-arrow-down),
.vote-box .upvote:has(.icon-arrow-down) {
	background-color: var(--color-grey-dark-6);
}
.downvote .icon-shift {
	transform: rotate(180deg);
}
.downvote .icon-shift:hover,
.downvote svg.icon-arrow-down {
	fill: var(--color-blue);
}
.upvote .icon-shift:hover,
.upvote svg.icon-arrow-down {
	fill: var(--color-orange);
}
.vote-count {
	color: white;
	font-size: 12px;
	font-weight: 700;
	line-height: 18px;
	margin: 0 1px;
	text-align: center;
	width: 32px;
}
.post-title {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: middle;
	line-height: 29px;
}
.post-title svg {
	width: 16.67px;
	height: 16.67px;
	fill: var(--color-grey-light-7);
	margin: 0px 5px;
}
.post-title h4 {
	font-weight: 600;
	display: inline;
	color: var(--color-grey-light-7);
}
.close button {
	display: block;
	margin-left: auto;
	background-color: black;
	color: var(--color-grey-light-7);
	font-family: Noto Sans, Arial, sans-serif;
	font-size: 15px;
	font-weight: 700;
	border: none;
}
.close svg {
	display: inline-block;
	height: 44px;
	width: 44px;
	font-size: 44px;
	line-height: 44px;
	padding: 0 4px 0 0;
}
.close span {
	margin-left: -5px;
}
.info {
	display: flex;
	justify-content: space-between;
	width: 100%;
}
.subreddit-info .subreddit-image img {
	width: 20px;
	height: 20px;
	border-radius: 50%;
}
.subreddit-info .subreddit-image {
	padding-right: 5px;
}
.subreddit-info a {
	color: black;
	font-weight: bold;
}
.subreddit-info a:hover {
	text-decoration: underline;
}

.post-vote-box {
	text-align: center;
	border-radius: 5px 0px 0px 5px;
	width: 40px;
	margin-right: 5px;
}
.post-vote-count {
	color: black;
	font-weight: 700;
}
.post-vote-count.up-clicked {
	color: var(--color-orange);
}
.post-vote-count.down-clicked {
	color: var(--color-blue);
}
.post-vote-box .downvote:hover svg,
.post-vote-box .upvote:hover svg,
.post-vote-box .upvote svg.up-clicked,
.post-vote-box .downvote svg.down-clicked,
.post-vote-box .downvote:hover svg,
.post-vote-box .upvote:hover svg,
.post-vote-box .upvote svg.up-clicked,
.post-vote-box .downvote svg.down-clicked {
	background-color: var(--color-grey-light-4);
}
.post-vote-box .downvote:hover svg {
	fill: var(--color-blue);
}
.post-vote-box .upvote:hover svg {
	fill: var(--color-orange);
}
.main,
.content,
.content img,
.content video {
	width: 100%;
}
.post-name h3 {
	color: black;
	margin: 10px 0px;
}
.post-text {
	color: black;
	font-size: 12px;
}
.services {
	padding: 0px;
	margin: 0px;
	display: inline;
}
.services > li {
	display: inline-block;
	list-style: none;
	height: 40px;
	text-align: center;
	line-height: 40px;
	padding: 0px 12px;
	border-radius: 5px;
	color: var(--color-grey-dark-2);
	font-weight: bold;
	font-size: 11px;
	position: relative;
}
.post-services .services > li:not(:first-of-type):hover {
	background-color: var(--color-grey-light-2);
	cursor: pointer;
}
.sub-menu {
	position: absolute;
	background-color: white;
	padding: 0px;
	left: 0px;
	box-shadow: 0px 2px 4px var(--color-grey-dark-2);
	border-radius: 5px;
	z-index: 2;
}
.sub-menu li {
	color: var(--color-grey-dark-2);
	font-size: 15px;
	font-weight: lighter;
	list-style: none;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
}
.sub-menu li:hover {
	color: black;
	background-color: var(--color-blue-light-2);
}
.sub-menu li:first-of-type:hover {
	border-radius: 5px 5px 0px 0px;
}
.sub-menu li:last-of-type:hover {
	border-radius: 0px 0px 5px 5px;
}
.sub-menu li svg {
	fill: var(--color-grey-dark-2);
	width: 20px;
	height: 20px;
	margin-right: 10px;
}
.sub-menu li:hover svg {
	fill: black;
}
.sub-menu li {
	padding: 0px 10px;
}
.sub-menu li:not(:last-of-type) {
	border-bottom: 1px solid var(--color-grey-light-3);
}
.sub-menu li#unsave,
.sub-menu li#unhide {
	color: var(--color-blue);
}
.sub-menu li#unsave svg,
.sub-menu li#unhide svg {
	fill: var(--color-blue);
}
.sub-menu li.post-sub-save,
.sub-menu li.share-items-in-sub-menu,
.sub-menu li.awards-item-in-sub-menu {
	display: none;
}
.comment-as-name {
	margin-bottom: 4px;
	font-family: Noto Sans, Arial, sans-serif;
	font-size: 12px;
	font-weight: 400;
	line-height: 18px;
	color: black;
	margin-right: 4px;
}
.comment-as-name a {
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	color: var(--color-pink);
}
.comment-as-name a:hover {
	text-decoration: underline;
}
.sort-by {
	position: relative;
	color: var(--color-pink);
	font-size: 12px;
	font-weight: 700;
	line-height: 16px;
	cursor: pointer;
	margin: 16px 40px 0 0px;
	padding: 0 16px 4px 0;
	border-bottom: 1px solid var(--color-grey-light-11);
}
.edit-post-buttons {
	display: flex;
	justify-content: end;
}
.edit-post-buttons .save {
	margin: 5px 22px;
	width: 65px;
	height: 33px;
	font-size: 12px;
	font-weight: bolder;
	color: white;
	background: var(--color-blue-2);
}
.edit-post-buttons .save {
	margin: 5px 22px 0 5px;
	width: 65px;
	height: 33px;
	font-size: 12px;
	font-weight: bolder;
	color: white;
	background: var(--color-blue-2);
}
.edit-post-buttons .save:disabled {
	background-color: var(--color-grey-dark-4);
}
.edit-post-buttons .cancel {
	margin-top: 5px;
	width: 65px;
	height: 33px;
	font-size: 12px;
	font-weight: bolder;
	color: var(--color-blue-2);
	background-color: white;
}
.edit-post-buttons .cancel:hover {
	background-color: var(--color-grey-light-3);
}
@media (max-width: 1079px) {
	.sub-menu li.post-sub-save {
		display: flex;
	}
	#post-direct-save {
		display: none;
	}
}
@media (max-width: 991px) {
	.left-left {
		display: none;
	}
}
@media (max-width: 767px) {
	#share {
		display: none;
	}
	.share-items-in-sub-menu {
		display: flex !important;
	}
}
@media (max-width: 495px) {
	.awards-item-in-sub-menu {
		display: flex !important;
	}
	#awards {
		display: none;
	}
}
.positioning {
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 4;
}
</style>

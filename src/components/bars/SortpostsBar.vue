<template>
	<div class="sort-post-content">
		<div class="sort-post-box-1-1">
			<div
				class="sort-post-icon-box clicked"
				@click="showSubMenu()"
				id="show-sub-menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-airplane-fill sort-post-icon"
					viewBox="0 0 16 16"
				>
					<path
						d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"
					/>
				</svg>
				<span>{{ clicked }}</span>

				<svg class="sort-post-arrow-icon sort-post-icon" id="arrow-icon">
					<use xlink:href="../../../img/sprite.svg#icon-chevron-small-down" />
				</svg>
			</div>
		</div>
		<div class="sort-post-box-1">
			<div
				v-if="best"
				class="sort-post-icon-box"
				:class="{ clicked: clicked == 'best' }"
				@click="selectSort('best')"
				id="best-sort"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-airplane-fill sort-post-icon"
					viewBox="0 0 16 16"
				>
					<path
						d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"
					/>
				</svg>
				<span>Best</span>
			</div>

			<div
				class="sort-post-icon-box"
				:class="{ clicked: clicked == 'hot' }"
				@click="selectSort('hot')"
				id="hot-sort"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-fire sort-post-icon"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"
					/>
				</svg>
				<!-- <i class="fa-brands fa-hotjar icon"></i> -->
				<span>Hot</span>
			</div>
			<div
				class="sort-post-icon-box"
				:class="{ clicked: clicked == 'new' }"
				@click="selectSort('new')"
				id="new-sort"
			>
				<!-- <i class="fa-regular fa-sun icon"></i> -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-brightness-high sort-post-icon"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
					/>
				</svg>
				<span>New</span>
			</div>
			<div
				class="sort-post-icon-box"
				:class="{ clicked: clicked == 'top' }"
				@click="selectSort('top')"
				id="top-sort"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-box-arrow-up sort-post-icon"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"
					/>
					<path
						fill-rule="evenodd"
						d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"
					/>
				</svg>
				<span>Top</span>
			</div>
			<div
				class="sort-post-icon-box clicked"
				@click="showTimeSubMenu()"
				id="show-sub-time-menu"
				v-if="clicked == 'top'"
			>
				<span>{{ time }}</span>
				<svg class="sort-post-arrow-icon sort-post-icon" id="arrow-icon">
					<use xlink:href="../../../img/sprite.svg#icon-chevron-small-down" />
				</svg>
				<ul class="sort-post-sub-menu" v-if="showTimeMenu">
					<li
						class="sort-post-box"
						:class="{ clicked: time == 'Now' }"
						@click="selectTime('Now', 'hour')"
						id="now-sort-sub-menu"
					>
						<span>Now</span>
					</li>
					<li
						class="sort-post-box"
						:class="{ clicked: time == 'Today' }"
						@click="selectTime('Today', 'day')"
						id="today-sort-sub-menu"
					>
						<span>Today</span>
					</li>
					<li
						class="sort-post-box"
						:class="{ clicked: time == 'This Week' }"
						@click="selectTime('This Week', 'week')"
						id="this-week-sort-sub-menu"
					>
						<span>This Week</span>
					</li>
					<li
						class="sort-post-box"
						:class="{ clicked: time == 'This Month' }"
						@click="selectTime('This Month', 'month')"
						id="this-month-sort-sub-menu"
					>
						<span>This Month</span>
					</li>
					<li
						class="sort-post-box"
						:class="{ clicked: time == 'this-year' }"
						@click="selectTime('This Year', 'year')"
						id="this-year-sort-sub-menu"
					>
						<span>This Year</span>
					</li>
					<li
						class="sort-post-box"
						:class="{ clicked: time == 'All Time' }"
						@click="selectTime('All Time', 'all')"
						id="all-time-sort-sub-menu"
					>
						<span>All Time</span>
					</li>
				</ul>
			</div>
			<div
				class="sort-post-icon-box"
				@click="showRising()"
				id="show-sub-rising-menu"
				v-if="clicked != 'trending'"
			>
				<font-awesome-icon icon="fa-solid fa-ellipsis" />
				<ul class="sort-post-sub-menu" v-if="risingListShow">
					<li
						class="sort-post-box"
						:class="{ clicked: clicked == 'trending' }"
						@click="selectSort('trending')"
						id="now-sort-sub-menu"
					>
						<font-awesome-icon icon="fa-solid fa-arrow-trend-up" />
						<span>Rising</span>
					</li>
				</ul>
			</div>
			<div
				class="sort-post-icon-box clicked"
				id="show-sub-rising-menu"
				v-if="clicked == 'trending'"
			>
				<font-awesome-icon icon="fa-solid fa-arrow-trend-up" />
				<span>Rising</span>
			</div>
		</div>
		<ul class="sort-post-sub-menu" v-if="showMenu">
			<li
				v-if="best"
				class="sort-post-icon-box"
				:class="{ clicked: clicked == 'best' }"
				@click="selectSort('best')"
				id="best-sort-sub-menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-airplane-fill sort-post-icon"
					viewBox="0 0 16 16"
				>
					<path
						d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"
					/>
				</svg>
				<!-- <i class="fa-brands fa-space-awesome icon"></i> -->
				<span>Best</span>
			</li>
			<li
				class="sort-post-icon-box"
				:class="{ clicked: clicked == 'hot' }"
				@click="selectSort('hot')"
				id="hot-sort-sub-menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-fire sort-post-icon"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"
					/>
				</svg>
				<!-- <i class="fa-brands fa-hotjar icon"></i> -->
				<span>Hot</span>
			</li>
			<li
				class="sort-post-icon-box"
				:class="{ clicked: clicked == 'new' }"
				@click="selectSort('new')"
				id="new-sort-sub-menu"
			>
				<!-- <i class="fa-regular fa-sun icon"></i> -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-brightness-high sort-post-icon"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
					/>
				</svg>
				<span>New</span>
			</li>
			<li
				class="sort-post-icon-box"
				:class="{ clicked: clicked == 'top' }"
				@click="selectTime(time)"
				id="top-sort-sub-menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-box-arrow-up sort-post-icon"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"
					/>
					<path
						fill-rule="evenodd"
						d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"
					/>
				</svg>
				<!-- <i class="fa-solid fa-arrow-up-from-ground-water icon"></i> -->
				<span>Top</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	emits: ['title', 'time'],
	props: {
		initialTitle: {
			type: String,
			required: true,
			default: '',
		},
		best: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	data() {
		return {
			showMenu: false,
			showTimeMenu: false,
			risingListShow: false,
			clicked: this.initialTitle,
			time: 'Today',
		};
	},
	methods: {
		// @vuese
		// Used to know which sort type is clicked
		// @arg The argument is a string value representing choosen value from user
		selectSort(title) {
			this.clicked = title;
			if (this.showMenu) this.showSubMenu();
			this.$emit('title', title.toLowerCase());
		},
		selectTime(time, title) {
			this.clicked = 'top';
			this.time = time;
			if (this.showMenu) this.showSubMenu();
			this.$emit('time', title.toLowerCase());
		},
		// @vuese
		// Used to show submenu for responsive design
		// @arg no argument
		showSubMenu() {
			this.showMenu = !this.showMenu;
		},
		showTimeSubMenu() {
			this.showTimeMenu = !this.showTimeMenu;
			this.risingListShow = false;
		},
		showRising() {
			this.risingListShow = !this.risingListShow;
			this.showTimeMenu = false;
		},
	},
	watch: {
		$route() {
			if (this.$route.params.title != 'trending') this.risingListShow = false;
		},
	},
};
</script>

<style scoped>
.sort-post-content {
	margin-top: 1.5rem;
	font-size: 1.4rem;
	height: 5.5rem;
	background-color: #fff;
	border-bottom: var(--line);
	border-radius: 0.5rem;
	padding: 1rem;

	display: flex;
	/* justify-content: left; */
	align-items: center;
	justify-content: space-between;
	position: relative;
}
.sort-post-content img {
	height: 5rem;
	cursor: pointer;
}
.sort-post-box-1-1 {
	display: none;
}
.sort-post-box-1-2 {
	display: flex;
}
.sort-post-box-1 {
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.sort-post-box-1 > *,
.sort-post-box-2 > *,
.sort-post-box-1-1 > *,
.sort-post-box-1-2 > * {
	padding: 0 1rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	height: 35px;
	margin: 0 5px;
}
.sort-post-box-1 > *:hover,
.sort-post-box-2 > *:hover,
.sort-post-box-1-1 > *:hover,
.sort-post-box-1-2 > *:hover {
	background-color: var(--color-grey-light-2);
	border-radius: 2rem;
}
.sort-post-icon {
	height: 2em;
	width: 2rem;
	margin: 0.6rem;
	fill: var(--color-grey-dark-3);
}
.sort-post-arrow-icon {
	height: 2.5em;
	width: 2.5rem;
	margin: 0;
}
.sort-post-icon-square {
	margin: 0;
}
.sort-post-icon-box.clicked {
	background-color: var(--color-grey-light-1);
	color: var(--color-blue-light);
	border-radius: 2rem;
}
.clicked .sort-post-icon {
	fill: var(--color-blue-light);
}
.sort-post-sub-menu {
	display: flex;
	position: absolute;
	background-color: white;
	padding: 0px;
	left: 1rem;
	top: 4rem;
	box-shadow: 0px 2px 4px var(--color-grey-dark-2);
	border-radius: 5px;
	z-index: 2;
	overflow: hidden;
}
.sort-post-sub-menu li {
	color: var(--color-grey-dark-2);
	font-size: 15px;
	font-weight: lighter;
	list-style: none;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: max-content;
	padding: 0 5px;
	height: 35px;
}
.sort-post-sub-menu li:hover {
	background-color: var(--color-grey-light-2);
	color: black;
}
.sub-menu li {
	padding: 0px 10px;
}
.sort-post-sub-menu li.clicked {
	color: var(--color-blue-light);
}
@media only screen and (max-width: 40em) {
	.sort-post-box-1 {
		display: none;
	}
	.sort-post-box-1-1 {
		display: flex;
	}
}
#show-sub-time-menu,
#show-sub-rising-menu {
	position: relative;
}
#show-sub-rising-menu span {
	margin-left: 2px;
}
</style>

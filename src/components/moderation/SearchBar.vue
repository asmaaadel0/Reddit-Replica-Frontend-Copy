<template>
	<div class="content">
		<form class="input-search" @submit.prevent="enterSearch" id="search-form">
			<input
				type="text"
				name="search-moderator"
				id="search-moderator"
				class="search"
				placeholder="Search for a user"
				v-model="search"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-search icon-search icon"
				viewBox="0 0 16 16"
				id="search-icon"
				@click="enterSearch()"
			>
				<path
					d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
				/>
			</svg>
		</form>
		<div class="arrows">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-arrow-left icon"
				viewBox="0 0 16 16"
				id="arrow-left"
				v-if="before"
				@click="fetchBefore()"
				:class="!after ? 'more-margin' : ''"
			>
				<path
					fill-rule="evenodd"
					d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-arrow-right icon"
				viewBox="0 0 16 16"
				id="arrow-right"
				v-if="after"
				@click="fetchAfter()"
			>
				<path
					fill-rule="evenodd"
					d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
				/>
			</svg>
		</div>
	</div>
</template>

<script>
export default {
	emits: ['enterSearch', 'fetchBefore', 'fetchAfter'],
	props: {
		// @vuese
		//if clicked in see all then value of searching should be ''
		//@type string
		emptyInput: {
			type: String,
			default: '',
			required: true,
		},
		// @vuese
		//return if there is moderators before
		//@type string
		before: {
			type: String,
			default: '',
			required: true,
		},
		// @vuese
		//return if there is moderators after
		//@type string
		after: {
			type: String,
			default: '',
			required: true,
		},
	},
	watch: {
		// @vuese
		//watch if clicked in see all then value of searching should be ''
		// @arg no parameters
		emptyInput() {
			if (this.emptyInput == '') {
				this.search = '';
			}
		},
	},
	data() {
		return {
			search: '',
		};
	},
	methods: {
		// @vuese
		//used to take action at entering value of search
		// @arg no argument
		enterSearch() {
			// Fire when entered search value
			// @arg The argument is a string value representing search input
			this.$emit('enterSearch', this.search);
		},
		// @vuese
		//used to fetch more moderators before
		// @arg no argument
		fetchBefore() {
			// Fire when fetch more moderators before
			// @arg no argument
			this.$emit('fetchBefore');
		},
		// @vuese
		//used to fetch more moderators after
		// @arg no argument
		fetchAfter() {
			// Fire when fetch more moderators after
			// @arg no argument
			this.$emit('fetchAfter');
		},
	},
};
</script>

<style scoped>
.content {
	background-color: var(--color-grey-light-10);
	height: 5.5rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 0.5rem 0.5rem 0 0.5rem;
}
.input-search {
	margin-left: 1.5rem;
	width: 23%;
	height: 3.5rem;
	display: flex;
	align-items: center;
	background-color: var(--color-grey-dark-3);
	border-radius: 0.4rem;
}
.search {
	width: 100%;
	border: var(--line-7);
	height: 3.5rem;
	border-radius: 0.4rem 0 0 0.4rem;
	padding: 0.8rem;
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	font-family: inherit;
}
.icon-search {
	fill: var(--color-white-1);
	margin: 1rem;
}
.arrows {
	margin: 1.5rem;
	/* display: none; */
}
.icon {
	margin: 0.5rem;
	cursor: pointer;
}
.more-margin {
	margin-right: 3.1rem;
}
@media only screen and (max-width: 60em) {
	.input-search {
		width: 50%;
	}
}
@media only screen and (max-width: 50em) {
	.input-search {
		width: 70%;
	}
}
@media only screen and (max-width: 25em) {
	.input-search {
		width: 80%;
	}
}
</style>

<template>
	<div class="popup">
		<div class="popup-inner">
			<slot />
			<button v-if="isCloseButton" class="btn btn-primary popup-close" @click="TogglePopup()">
				Close Popup
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		TogglePopup: {
			type: Function,
			default: () => { },
		},
		isCloseButton: {
			type: Boolean,
			default: false,
		},
	}
}
</script>

<style lang="scss" scoped>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);

	display: flex;
	align-items: center;
	justify-content: center;

	.popup-inner {
		border-radius: 1rem;
		background: white;
		padding: 32px;
	}

	.popup-close {
		margin-top: 24px;
		margin-bottom: 0px;
	}
}
</style>
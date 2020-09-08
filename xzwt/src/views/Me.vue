<template>
	<div>
		<mt-header title="学前端，到学问"></mt-header>
		<!-- 头像区域开始 -->
		<div class="avatar">
		  <img src="../assets/avatar2.jpg" alt="">
		</div>
		<!-- 头像区域结束 -->
		<!-- 设置区域开始 -->
		<div>
			<mt-cell title="个人设置">
				<img src="../assets/setting.png" alt="" slot="icon">
			</mt-cell>
			<mt-cell title="关于我们">
			    <img src="../assets/about.png" slot="icon">
			</mt-cell>
		</div>
		<!-- 设置区域开始 -->
		<!-- 底部选项卡区域开始 -->
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="index">首页
				<img src="../assets/index_active.png" slot="icon" v-if="selected=='index'">
				<img src="../assets/index.png" slot="icon" v-else>
			</mt-tab-item>
			<mt-tab-item id="me">我的
			    <img src="../assets/me_active.png" slot="icon" v-if="selected=='me'">
			    <img src="../assets/me.png" slot="icon" v-else>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				selected:'me'
			}
		},
		watch:{
			selected(value){
				switch(value){
					case 'index':
						this.$router.push('/index');
						break;
					case 'me':
						this.$router.push('/me');
						break;
				}
			}
		}
	}
</script>

<style>
	.avatar{
	    text-align: center;
	    margin-top: 15px;
	  }
	  .avatar img{
	    width: 120px;height: 120px;
	    border-radius: 100%;
	  }
</style>

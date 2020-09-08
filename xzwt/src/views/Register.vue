<template>
	<div>
		<mt-header title="学前端,到学问">
			<router-link to="/index.vue" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<!-- 用户注册表单区域 -->
		<mt-field type="text" label="用户名" placeholder="请输入用户名" :state="usernameState" :attr="{maxlength:'12'}" disableClear v-model="username" @blur.native.capture="checkUsername"></mt-field>
		<mt-field type="password" label="密码" placeholder="请输入密码" :state="passwordState" :attr="{maxlength:'20',autocomplete:'off'}" v-model="password" @blur.native.capture="checkPassword"></mt-field>
		<mt-field type="password" label="确认密码" placeholder="请再次输入密码" :state="password2State" v-model="password2" @blur.native.capture="checkConPassword"></mt-field>
		<mt-button type='primary' size='large' @click="handle">免费注册</mt-button>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				username:'',
				password:'',
				password2:'',
				usernameState:'',
				passwordState:'',
				password2State:''
			}
		},
		methods:{
			checkUsername(){
				// 1.检测用户名
				let usernameRegExp = /^[a-zA-Z0-9_]{6,12}$/;
				if(usernameRegExp.test(this.username)){
					this.usernameState="success";
					return true;
				}
				else{
					this.usernameState="warning";
					this.$toast({
						message:"用户名错误",
						position:"middle",
						duration:5000						
					});
					return false;
				}
			},
			 // 2.检测密码
			checkPassword(){
			    let passwordRegExp = /^[a-zA-Z0-9_]{8,20}$/;
			    if(passwordRegExp.test(this.password)){
			      this.passwordState='success';
			      return true;
			    }else{
			      this.passwordState='error';
			      this.$toast({
			        message:"密码错误",
			        position:"middle",
			        duration:3000
			      });
			      return false;
			    }			    
			},
			// 3.确认密码
			checkConPassword(){
			      if(this.password==this.password2){
			        this.password2State='success';
			        return true;
			      }else{
			        this.password2State='error';
			        this.$toast({
			          message:"两次密码不一致",
			          position:"middle",
			          duration:3000
			        });
			        return false;
			      }
			},
			// 4.都正确了，提交代码
			 handle(){
					 if(this.checkUsername() && this.checkPassword() && this.checkConPassword()){
						 this.axios.post("/register","username="+this.username+"&password="+this.password).then((res)=>{
							 if(res.data.code==0){
							    this.$messagebox("注册提示","用户名已被占用");
							 }else{
							    this.$router.push("/index");
							 }
						 })
						 // if(this.username=="admin666"){
							//  this.$messagebox("注册提示框","用户名已被占用");
						 // }
					 }
				 }
		}
	}
</script>

<style>
</style>

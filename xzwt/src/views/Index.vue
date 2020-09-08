<template>
	<div>
		<div class="top_">
			<!-- 顶部导航开始 -->
			<mt-header title="学前端,到学问">
				<div slot="right" class="shortcut">
					<router-link to="/register">注册</router-link>
					<router-link to="/login">登录</router-link>
				</div>
			</mt-header>
			<!-- 顶部导航结束 -->
			<!-- 顶部选项卡开始 -->
			<mt-navbar v-model="active">
				<mt-tab-item :id="String(item.id)" v-for="(item,index) of category" :key="index">
				{{item.category_name}}
				</mt-tab-item>			
			</mt-navbar>
			<!-- 顶部选项卡结束 -->
		</div>
		<!-- 面板区域开始 -->
		<div class="main"
		infinite-scroll-distance="20"
		v-infinite-scroll="loadMore"
		infinite-scroll-disabled="busy"
		>
		    <h1 style="font-size:40px">{{articles.length}}</h1>
			<mt-tab-container v-model="active">
				<mt-tab-container-item :id="active">
					<div class="all" v-for="(article,index) of articles" :key="index">
						<router-link :to="`/article/${article.id}`">
							<h3 class="article_txt">{{article.subject}}</h3>
							<div class="image">
								<img v-lazy="article.image" v-if="article.image!=null">
								<div>{{article.description}}</div>
							</div>
						</router-link>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<!-- 面板区域结束 -->
		<!-- 底部选项卡开始 -->
		    <tabbar :selected="selected"></tabbar>
		<!-- 底部选项卡结束 -->
	</div>
</template>

<script>
	// 导入子组件
	import Tabbar from '../components/Tabbar.vue';
	export default{
		components:{
			Tabbar
		},
		data(){
			return {
				// 默认被选中的顶部选项卡
				active:'1',
				 // 默认被选中的底部选项卡
				selected:'index',
				category:[],
				articles:[],
				page:1,
				busy:false,
				pagecount:0
			}
		},
		methods:{
			loadData(){
				this.busy=true;
				this.$indicator.open({
					text:"加载中...",
					spinnerType:"snake"
				});
				this.axios.get('/articles?cid='+this.active+'&page='+this.page).then(res=>{
				  this.pagecount=res.data.pagecount;
				  let data =  res.data.results;
				  // item代表文章对象，包含id,subject,description,image
				  data.forEach(item=>{
				    if(item.image!=null){
				      item.image = require('../../../resource/articles/' + item.image);
				    }
				    // 将item添加到articles数组中
				    this.articles.push(item);
				  });
				  this.$indicator.close();
				  this.busy=false;
				});
			},
			// 向下滚动时加载数据
			loadMore(){			
				// 每调用一次LoadMore方法，这个变量就要累加
				this.page++;
				if(this.page<=this.pagecount){
					this.loadData();
				}
			},
		},
		 watch:{
		    active(){
		      // console.log(value);
		      this.articles=[];
			  this.page=1;
			  this.loadData();
		    }
		  },
		// 钩子函数，加载时就向服务器发送请求
		mounted(){
			this.axios.get('/category').then(res=>{
				this.category=res.data.results;
			});
			// 获取默认顶部选项卡包含的文章信息
			this.loadData();
		},
	}
</script>

<style>
	.shortcut a{
		display: inline-block;
		margin-left: 5px;
		color: #fff;
		text-decoration: none;
	}
	 .main{
	    margin-bottom: 55px;
		    margin-top: 90px;
	  }
	    .top_{position: fixed;top: 0; right: 0;left: 0;z-index: 999;}
	  .all{padding: 15px 0 14px;margin: 0 15px; border-bottom: .5px solid #d3d3d3;}
	    .all>a{text-decoration: none;}
	    .article_txt{font-size: 13px;color: red; line-height: 22px;}
	    .image{
	      display: flex;
	      padding-top: 11px;
	      align-items: center;
	      width: 100%;
	    }
	    .image>div{
	      font-size: 15px;
	      overflow: hidden;
	      font-weight: 400;
	      text-overflow: ellipsis;
	      line-height: 21px;
	      letter-spacing: normal;
	      color: #444;
	      margin: 4px 15px 4px 0;
	      height: 65px;
	    }
	    .image>img{
	       width: 112px;
	      border-radius: 5px;
	      background: #ccc;
	      margin-right:15px;
	    }
</style>

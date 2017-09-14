var Util = {
	ajax:function(url,fn){
		var xhr = new XMLHttpRequest();
		//监听事件
		xhr.onreadystatechange = function(){
			//判断状态
			if(xhr.readyState===4){
				//判断状态码
				if(xhr.status===200){
					fn && fn(JSON.parse(xhr.responseText))
				}
			}
		}
		xhr.open('GET',url,true);
		xhr.send(null);
	}
}
//定义组件类
var Home = Vue.extend({
	template:'#tpl_home',
	data:function(){
		return {
			banner_img:[
				{url:'01.jpg'},
				{url:'02.jpg'},
				{url:'03.jpg'},
				{url:'04.jpg'},
				{url:'05.jpg'},
				{url:'06.jpg'},
				{url:'01.jpg'}
			],
			left:0,
			startX:0,
			moveX:0,
			idx:0,
			width:document.documentElement.clientWidth,
			time:0.3,
			timer:'',
			nav:[],
			ad:[],
			lowPrice:[],
			commend:[]

		}
	},
	created:function(){
		//作用域是组件实例化对象
		var me = this;
		Util.ajax('data/home.json',function(res){
			if(res&&res.errno===0){
				me.nav = res.data.nav;
				// console.log(me.nav)
				me.ad = res.data.ad;
				me.lowPrice = res.data.lowPrice;
				me.commend = res.data.commend;
			}
		})
	},
	mounted:function(){
		var me = this;
		this.timer=setInterval(function(){
			me.idx++;
			me.left=-me.idx*me.width;
			setTimeout(function(){

	  			if(me.idx===6){
					me.idx=0;
					me.time=0
					me.left=-me.idx*me.width
					console.log('idx:'+me.idx)
				}
			},300)
			me.time=0.3
		}, 3000)
	},
	methods:{
		start:function(e){
			clearInterval(this.timer);
			this.startX = e.touches[0].clientX;
			// console.log(this.startX);
			this.time=0;
		},
		move:function(e){
			this.moveX = e.touches[0].clientX-this.startX;
			this.left = -this.idx*this.width+e.touches[0].clientX-this.startX;
			if(this.moveX<0 && this.idx === 6){
				this.idx=0;
			}else if(this.moveX>0&&this.idx===0){
				this.idx=6;
			}
			this.time=0
			
			
		},
		end:function(e){
			if(Math.abs(this.moveX)<this.width/3){
				this.left=-this.idx*this.width
			}else if(this.moveX<0){
				this.idx++;
				this.left=-this.idx*this.width
			}else if(this.moveX){
				this.idx--;
				console.log(this.idx)
				this.left=-this.idx*this.width
			}
			this.moveX=0;
			this.time=0.3;
			// console.log(this.time)
			var me=this;
			this.timer=setInterval(function(){
				me.idx++;
				me.left=-me.idx*me.width;
				setTimeout(function(){

		  			if(me.idx===6){
						me.idx=0;
						me.time=0
						me.left=-me.idx*me.width
						console.log('idx:'+me.idx)
					}
				},300)
				me.time=0.3
			}, 3000)
		},
		
	}
})
var List=Vue.extend({
	template:'#tpl_list',
	data:function(){
		return {
			haha:"",
			li_index:0,
			nav:[],
			list:[],
			sort:["升序",'升序','升序',''],
			choose:[],
			wid:false
		}
	},
	computed:{
		dealList:function(){
			var search = this.haha;
			var result = [];
			for (var i=0;i<this.list.length;i++){
				// console.log(result)
				if(this.list[i].title.indexOf(search)>=0){
					result.push(this.list[i]);
				}
			}
			return result;
		}
	},
	methods:{
		close:function(){
			this.haha="";
		},
		check:function(index,id){
			if(id==="choose"){
				this.wid=true
			}
			console.log(this.wid);
			this.li_index=index;
			var me = this;
			if(me.sort[index]==='升序'){
				this.list.sort(function(a,b){
	
					me.sort[index]='降序'
					return a[id]-b[id]
				})
			}else if(me.sort[index]==='降序'){
					this.list.sort(function(a,b){
	
					me.sort[index]='升序'
					return b[id]-a[id]
				})
			}

		},
		back:function(){
			this.wid=false;
		},
		click:function(msg){
			this.haha=msg;
			this.back();
		}
		

	},
	created:function(){
		var me = this;
		Util.ajax("data/list.json",function(res){
			if(res&&res.errno===0){
				me.nav=res.data.nav;
				me.list = res.data.list;
				me.choose = res.data.choose;
				
			}
		})
	}
})
var Detail = Vue.extend({
	template:'#tpl_detail',
	data:function(){
		return {
			lunbo:[],
			msg:[],
			circle:[],
			choose:[],
			width:document.documentElement.clientWidth,
			moveX:0,
			startX:0,
			endX:0,
			left:0,
			idx:0,
			time:0,
			idxc:0,
			checkIndex:0,
			num:1,

		}
	},
	created:function(){
		var me = this;
		Util.ajax("data/detail.json" ,function(res){
			if(res&&res.errno===0){
				me.lunbo=res.data.lunbo;
				me.msg = res.data.msg;
				me.circle = res.data.circle;
				me.choose = res.data.choose;
			}
		})
	},
	methods:{
		start:function(e){
			this.startX = e.touches[0].clientX;
			console.log(this.startX)
			this.time=0
		},
		move:function(e){
			this.moveX = e.touches[0].clientX-this.startX;
			this.left = -this.idx*this.width+this.moveX;
			// console.log(this.left)
				if(this.moveX<0&&this.idx===6){
					this.idx=0;
				}else if(this.moveX>0&&this.idx===0){
					this.idx=6;
				}
		
			
		},
		end:function(){
			this.time=0.3;
			if(Math.abs(this.moveX)<this.width/3){
				
				this.left=-this.idx*this.width
			}else if(this.moveX<0){
				this.idx++;
				
				this.left=-this.idx*this.width
			}else{
				this.idx--;
				this.left=-this.idx*this.width
			}
				this.moveX=0;

			this.idxc=this.idx
			if(this.idxc===6){
				this.idxc=0;
			}
			
		},
		check:function(index){
			this.checkIndex=index;
		},
		reduce:function(){
			this.num--;
			if(this.num<1){
				this.num=1;
			}
		},
		add:function(){
			this.num++;
		}
	}
})
var Class = Vue.extend({
	template:"#tpl_class",
	data:function(){
		return {
			cla:[],
			show:0
		}
	},
	created:function(){
		var me = this;
		Util.ajax("data/class.json",function(res){
			// console.log(res)
			if(res.errno===0&&res){
				me.cla = res.data.cla 
			}
		})
	},
	methods:{
		hide:function(){
			this.show=this.show===0?40:0
		}

	}
})
var Shopcar = Vue.extend({
	template:'#tpl_car',
	data:function(){
		return {
			show:0
		}
	},
	methods:{
		hide:function(){
			this.show=this.show===0?40:0
		}
	}


})
var Login = Vue.extend({
	template:"#tpl_login",
	data:function(){
		return {
			login:[
				{title:"快捷登录"},
				{title:"普通登录"}
			],
			idx:0,
			check:'',
			phone:'',
			email:'',
			show:0,
			msg:'获取动态密码'
		}
	},
	methods:{
		choose:function(index){
			this.idx=index;
			
		},
		checkPhone:function(){
			console.log(this.phone)
			if(this.phone){
				if(!/^1[0-9]{10}$/.test(this.phone)){
					this.check="手机号格式不对"
				}else{
					this.check=""
				}
				console.log(this.check)
				
			}
		},
		hide:function(){
			this.show=this.show===0?40:0
		},
		psd:function(){
			this.msg=6;
			var me = this;
			var timer=setInterval(function(){
				me.msg--;
				if(me.msg<0){
					me.msg="点击重试";
					clearInterval(timer)
				}
			},1000)

		}

	}
})
var routes=[
	{
		path:'/home',
		component:Home
	},
	{
		path:'/list',
		component:List
	},
	{
		path:'/detail/:detailId',
		component:Detail
	},
	{
		path:'/class',
		component:Class
	},
	{
		path:'/shopcar',
		component:Shopcar
	},
	{
		path:'/login',
		component:Login
	},
	{
		path:'*',
		redirect:'/home'
	}
]
var router = new VueRouter({
	routes:routes
})
var app = new Vue({
	el:'#app',
	router:router
})
function PubSub(){
	this.handlers={};
}
PubSub.prototype={
	
	//subscribe
	on:function(eventType,handler){
		var self=this;
		if(!(eventType in self.handlers)){
			self.handlers[eventType]=[];
		}
		self.handlers[eventType].push(handler);
		return this;
	},
	
	//publish
	emit:function(eventType){
		var self=this;
		var handlerArgs=Array.prototype.slice.call(arguments,1);
		for(var i=0;i<self.handlers[eventType].length;i++){
			self.handlers[eventType][i].apply(self,handlerArgs);
		}
		return self;
	},
};

var pubsub=new PubSub();
var callback=function(data){
	console.log("callback: "+data);
}

//subscribe event
pubsub.on('a',function(data){
	console.log("subscribe: "+data);
});

pubsub.on('a',callback);

//publish a
pubsub.emit('a','hello world!');

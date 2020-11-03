aurora = {
	//判断该时间是否极光
	isAurora: function(eWeather) {//date是个时间类型,艾欧泽亚时间
		var eStart = parseInt(eWeather.getUTCHours()/8)*8;//上一个天气变化的艾欧泽亚时间
		if(eStart) return false;//不是0返回
		eWeather.setUTCHours(eStart);//设置为上一个天气变化的艾欧泽亚时间
		eWeather.setUTCMinutes(0);
		eWeather.setUTCSeconds(0);
		var lDate = new Date(eWeather.getTime()/20.571428571428573);
		var unixSeconds = parseInt(lDate.getTime()/1000);
		var bell = unixSeconds/175;
		var increment = (bell+8-(bell%8))%24;
		var totalDays = unixSeconds/4200;
		totalDays = (totalDays<<32)>>>0;
		var calcBase = totalDays*100+increment;
		var step1 = ((calcBase<<11)^calcBase)>>>0;
		var step2 = ((step1>>>8)^step1)>>>0;
		var weatherId = step2%100;
		if(weatherId>=70&&weatherId<75) {
			return lDate;
		}
	},
	//计算接下来的num次极光
	getAuroraList: function(num) {
		var array = [];
		var i = 0;
		var eTime = new Date(new Date().getTime()*20.571428571428573);
		while(i<num) {
			var eWeather = aurora.isAurora(eTime);
			if(eWeather) {
				array.push(eWeather);//合适就放进array里
				i++;
			}
			eTime = new Date(eTime.getTime()+28800000);//8*3600*1000;
		}
		return array;
	}
};
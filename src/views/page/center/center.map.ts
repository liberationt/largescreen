

//mapData数据结构
export interface MapdataType {
    name: string;
    value: [number, number, number]; //x,y,value  第一个x 第二个y  第三个value
}
export const optionHandle = (regionCode: string,
    list: object[],
    mapData: MapdataType[]) => {
    let top = 45;
    // let zoom = ["china"].includes(regionCode) ? 1.05 : 1;
    let zoom = 1.1

    return {
        backgroundColor: "",
        tooltip: {
            show:false
            // show: true,
            // trigger:'item',
            // backgroundColor:'#296F55',
            // padding:10,
            // formatter: function(params) {
            //     let str = `<div>${params.name}</div>
            //     <div>出版社：12</div>
            //     <div>编辑：3412</div>
            //     `
            //     return str
            //   // return (`&nbsp;&nbsp;${params.name}&nbsp;&nbsp;&nbsp;<p style="color:#d4d400">100</p>`)
            // },
            // extraCssText:'z-index:2',
            // textStyle: {
            //   color:'#d5ffff',
            //   fontSize:16
            // }
        },
        legend: {
            show: false,
        },
        geo: [
			{
	            map: regionCode,
	            zlevel:5,
                aspectScale: 0.83, //长宽比
//             top:'1%',
                bottom:35,
                top:35,
                selectedMode: false, //是否允许选中多个区域
                geoIndex: 1,
                zoom: zoom, //当前视角的缩放比例
                roam: false, //是否开启平游或缩放
                scaleLimit: { //滚轮缩放的极限控制
                min: 1,
                max: 2
                },
	            label: {
	                show: false, //各省名称
	                color: '#eee'
	            },
	            itemStyle: {
	                color: '#273857', // 背景
	                borderWidth: '3', // 边框宽度
	                borderColor: '#7BA5B9', // 边框颜色
                    shadowOffsetY: 10,
                    shadowColor: "#173360",
                    // emphasis: { // 旧版本
                    //     areaColor: "#31886C", //背景
                    // }
	            },
                emphasis: { //新版本
                    // borderWidth: 0,
                    // color: "green",
                    label: {
                        show: false
                    },
                    itemStyle:{
                        areaColor: "#31886C", //背景
                    }
                }
	        },
		],
        series: [
            {
                name: "MAP",
                type: "map",
                map: regionCode,
                // aspectScale: 0.78,
                data: list,
                selectedMode: false, //是否允许选中多个区域
                // geoIndex: 1,
				zlevel:20,
                zoom: zoom, //当前视角的缩放比例
                roam: false, //是否开启平游或缩放
                scaleLimit: { //滚轮缩放的极限控制
                min: 1,
                max: 2
                },
				bottom:35,
                top:35,
                aspectScale: 0.83, //长宽比
                tooltip: {
                    show: true,
                    trigger:'item',
                    backgroundColor:'#296F55',
                    padding:10,
                    formatter: function(params) {
                        let str
                        if(params.data){
                            str = `<div>${params.name}</div>
                            <div>出版社：${params.data.value.agentNum}</div>
                            <div>编辑：${params.data.value.adviserNum}</div>
                        `
                        }else{
                            str = `<div>${params.name}</div>
                            <div>出版社：0</div>
                            <div>编辑：0</div>
                            ` 
                        }
                        return str
                    },
                    extraCssText:'z-index:2',
                    textStyle: {
                        color:'#d5ffff',
                        fontSize:16
                    }
                },
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        areaColor: "#31886C",
                        borderWidth: 1,
                    },
                },
                itemStyle: {
                    borderColor: "rgba(147, 235, 248, .8)",
                    borderWidth: 1,
					areaColor:"#273857",
                    shadowColor: "rgba(128, 217, 248, .3)",
                    shadowOffsetX: -2,
                    shadowOffsetY: 10,
                    shadowBlur: 1,
                },
            },
            {
                data: mapData,
                type: "effectScatter",
                coordinateSystem: "geo",
                symbolSize: function (val: any) {
                    return 4;
                },
                tooltip:{
                    show:false
                },
                legendHoverLink: true,
                showEffectOn: "render",
                rippleEffect: {
                    // period: 4,
                    scale: 6,
                    color: "rgba(255,255,255, 1)",
                    brushType: "fill",
                },
                label: {
                    formatter: (param: any) => {
                        return param.name.slice(0, 2);
                    },
                    fontSize: 11,
                    offset: [0, 2],
                    position: "bottom",
                    textBorderColor: "#fff",
                    textShadowColor: "#000",
                    textShadowBlur: 10,
                    textBorderWidth: 0,
                    color: "#FFF",
                    show: false,
                }
            },
        ],
        //动画效果
        // animationDuration: 1000,
        // animationEasing: 'linear',
        // animationDurationUpdate: 1000
    };
}


export const regionCodes: any = {
    "中国": {
        "adcode": "100000",
        "level": "country",
        "name": "中华人民共和国"
    },
    "新疆维吾尔自治区": {
        "adcode": "650000",
        "level": "province",
        "name": "新疆维吾尔自治区"
    },
    "湖北省": {
        "adcode": "420000",
        "level": "province",
        "name": "湖北省"
    },
    "辽宁省": {
        "adcode": "210000",
        "level": "province",
        "name": "辽宁省"
    },
    "广东省": {
        "adcode": "440000",
        "level": "province",
        "name": "广东省"
    },
    "内蒙古自治区": {
        "adcode": "150000",
        "level": "province",
        "name": "内蒙古自治区"
    },
    "黑龙江省": {
        "adcode": "230000",
        "level": "province",
        "name": "黑龙江省"
    },
    "河南省": {
        "adcode": "410000",
        "level": "province",
        "name": "河南省"
    },
    "山东省": {
        "adcode": "370000",
        "level": "province",
        "name": "山东省"
    },
    "陕西省": {
        "adcode": "610000",
        "level": "province",
        "name": "陕西省"
    },
    "贵州省": {
        "adcode": "520000",
        "level": "province",
        "name": "贵州省"
    },
    "上海市": {
        "adcode": "310000",
        "level": "province",
        "name": "上海市"
    },
    "重庆市": {
        "adcode": "500000",
        "level": "province",
        "name": "重庆市"
    },
    "西藏自治区": {
        "adcode": "540000",
        "level": "province",
        "name": "西藏自治区"
    },
    "安徽省": {
        "adcode": "340000",
        "level": "province",
        "name": "安徽省"
    },
    "福建省": {
        "adcode": "350000",
        "level": "province",
        "name": "福建省"
    },
    "湖南省": {
        "adcode": "430000",
        "level": "province",
        "name": "湖南省"
    },
    "海南省": {
        "adcode": "460000",
        "level": "province",
        "name": "海南省"
    },
    "江苏省": {
        "adcode": "320000",
        "level": "province",
        "name": "江苏省"
    },
    "青海省": {
        "adcode": "630000",
        "level": "province",
        "name": "青海省"
    },
    "广西壮族自治区": {
        "adcode": "450000",
        "level": "province",
        "name": "广西壮族自治区"
    },
    "宁夏回族自治区": {
        "adcode": "640000",
        "level": "province",
        "name": "宁夏回族自治区"
    },
    "浙江省": {
        "adcode": "330000",
        "level": "province",
        "name": "浙江省"
    },
    "河北省": {
        "adcode": "130000",
        "level": "province",
        "name": "河北省"
    },
    "香港特别行政区": {
        "adcode": "810000",
        "level": "province",
        "name": "香港特别行政区"
    },
    "台湾省": {
        "adcode": "710000",
        "level": "province",
        "name": "台湾省"
    },
    "澳门特别行政区": {
        "adcode": "820000",
        "level": "province",
        "name": "澳门特别行政区"
    },
    "甘肃省": {
        "adcode": "620000",
        "level": "province",
        "name": "甘肃省"
    },
    "四川省": {
        "adcode": "510000",
        "level": "province",
        "name": "四川省"
    },
    "天津市": {
        "adcode": "120000",
        "level": "province",
        "name": "天津市"
    },
    "江西省": {
        "adcode": "360000",
        "level": "province",
        "name": "江西省"
    },
    "云南省": {
        "adcode": "530000",
        "level": "province",
        "name": "云南省"
    },
    "山西省": {
        "adcode": "140000",
        "level": "province",
        "name": "山西省"
    },
    "北京市": {
        "adcode": "110000",
        "level": "province",
        "name": "北京市"
    },
    "吉林省": {
        "adcode": "220000",
        "level": "province",
        "name": "吉林省"
    }
}
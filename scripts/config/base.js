define(function(require, exports, module) {
	var config = {
		area: {
			"city": {
				"anhui": [{
					"name": "蚌埠",
					"pinyin": "bengbu"
				}, {
					"name": "合肥",
					"pinyin": "hefei"
				}, {
					"name": "芜湖",
					"pinyin": "wuhu"
				}, {
					"name": "淮南",
					"pinyin": "huainan"
				}, {
					"name": "滁州",
					"pinyin": "chuzhou"
				}, {
					"name": "阜阳",
					"pinyin": "fuyang"
				}, {
					"name": "巢湖",
					"pinyin": "chaohu"
				}, {
					"name": "宿州",
					"pinyin": "suzhou2"
				}, {
					"name": "铜陵",
					"pinyin": "tongling"
				}, {
					"name": "黄山",
					"pinyin": "huangshan"
				}, {
					"name": "六安",
					"pinyin": "luan"
				}, {
					"name": "马鞍山",
					"pinyin": "maanshan"
				}, {
					"name": "淮北",
					"pinyin": "huaibei"
				}, {
					"name": "安庆",
					"pinyin": "anqing"
				}, {
					"name": "池州",
					"pinyin": "chizhou"
				}, {
					"name": "宣城",
					"pinyin": "xuancheng"
				}, {
					"name": "亳州",
					"pinyin": "bozhou"
				}],
				"aomen": [{
					"name": "澳门",
					"pinyin": "aomen2"
				}],
				"beijing": [{
					"name": "北京",
					"pinyin": "beijing2"
				}],
				"chongqing": [{
					"name": "重庆",
					"pinyin": "chongqing2"
				}],
				"fujian": [{
					"name": "厦门",
					"pinyin": "xiamen"
				}, {
					"name": "福州",
					"pinyin": "fuzhou"
				}, {
					"name": "泉州",
					"pinyin": "quanzhou"
				}, {
					"name": "莆田",
					"pinyin": "putian"
				}, {
					"name": "龙岩",
					"pinyin": "longyan"
				}, {
					"name": "漳州",
					"pinyin": "zhangzhou"
				}, {
					"name": "宁德",
					"pinyin": "ningde"
				}, {
					"name": "三明",
					"pinyin": "sanming"
				}, {
					"name": "南平",
					"pinyin": "nanping"
				}, {
					"name": "沙县",
					"pinyin": "shaxian"
				}],
				"gansu": [{
					"name": "兰州",
					"pinyin": "lanzhou"
				}, {
					"name": "嘉峪关",
					"pinyin": "jiayuguan"
				}, {
					"name": "金昌",
					"pinyin": "jinchang"
				}, {
					"name": "白银",
					"pinyin": "baiyin"
				}, {
					"name": "天水",
					"pinyin": "tianshui"
				}, {
					"name": "酒泉",
					"pinyin": "jiuquan"
				}, {
					"name": "张掖",
					"pinyin": "zhangye"
				}, {
					"name": "武威",
					"pinyin": "wuwei"
				}, {
					"name": "定西",
					"pinyin": "dingxi"
				}, {
					"name": "陇南",
					"pinyin": "longnan"
				}, {
					"name": "平凉",
					"pinyin": "pingliang"
				}, {
					"name": "庆阳",
					"pinyin": "qingyang"
				}, {
					"name": "临夏",
					"pinyin": "linxia"
				}, {
					"name": "甘南",
					"pinyin": "gannan2"
				}],
				"guangdong": [{
					"name": "深圳",
					"pinyin": "shenzhen"
				}, {
					"name": "东莞",
					"pinyin": "dongguan"
				}, {
					"name": "佛山",
					"pinyin": "foshan"
				}, {
					"name": "中山",
					"pinyin": "zhongshan"
				}, {
					"name": "江门",
					"pinyin": "jiangmen"
				}, {
					"name": "阳江",
					"pinyin": "yangjiang"
				}, {
					"name": "珠海",
					"pinyin": "zhuhai"
				}, {
					"name": "惠州",
					"pinyin": "huizhou"
				}, {
					"name": "揭阳",
					"pinyin": "jieyang"
				}, {
					"name": "汕头",
					"pinyin": "shantou"
				}, {
					"name": "肇庆",
					"pinyin": "zhaoqing"
				}, {
					"name": "茂名",
					"pinyin": "maoming"
				}, {
					"name": "清远",
					"pinyin": "qingyuan"
				}, {
					"name": "广州",
					"pinyin": "guangzhou"
				}, {
					"name": "韶关",
					"pinyin": "shaoguan"
				}, {
					"name": "湛江",
					"pinyin": "zhanjiang"
				}, {
					"name": "梅州",
					"pinyin": "meizhou"
				}, {
					"name": "汕尾",
					"pinyin": "shanwei"
				}, {
					"name": "河源",
					"pinyin": "heyuan"
				}, {
					"name": "潮州",
					"pinyin": "chaozhou"
				}, {
					"name": "云浮",
					"pinyin": "yunfu"
				}, {
					"name": "端州",
					"pinyin": "duanzhou"
				}, {
					"name": "粤东",
					"pinyin": "yuedong"
				}, {
					"name": "流沙",
					"pinyin": "liusha"
				}],
				"guangxi": [{
					"name": "南宁",
					"pinyin": "nanning"
				}, {
					"name": "桂林",
					"pinyin": "guilin"
				}, {
					"name": "柳州",
					"pinyin": "liuzhou"
				}, {
					"name": "玉林",
					"pinyin": "yulin"
				}, {
					"name": "梧州",
					"pinyin": "wuzhou"
				}, {
					"name": "北海",
					"pinyin": "beihai"
				}, {
					"name": "防城港",
					"pinyin": "fangchenggang"
				}, {
					"name": "钦州",
					"pinyin": "qinzhou"
				}, {
					"name": "贵港",
					"pinyin": "guigang"
				}, {
					"name": "贺州",
					"pinyin": "hezhou"
				}, {
					"name": "百色",
					"pinyin": "baise"
				}, {
					"name": "河池",
					"pinyin": "hechi"
				}, {
					"name": "来宾",
					"pinyin": "laibin"
				}, {
					"name": "崇左",
					"pinyin": "chongzuo"
				}],
				"guizhou": [{
					"name": "贵阳",
					"pinyin": "guiyang"
				}, {
					"name": "六盘水",
					"pinyin": "liupanshui"
				}, {
					"name": "遵义",
					"pinyin": "zunyi"
				}, {
					"name": "安顺",
					"pinyin": "anshun"
				}, {
					"name": "铜仁",
					"pinyin": "tongren"
				}, {
					"name": "黔东南",
					"pinyin": "qiandongnan"
				}, {
					"name": "黔南",
					"pinyin": "qiannan"
				}, {
					"name": "黔西南",
					"pinyin": "qianxinan"
				}, {
					"name": "毕节",
					"pinyin": "bijie"
				}],
				"hainan": [{
					"name": "海口",
					"pinyin": "haikou"
				}, {
					"name": "三亚",
					"pinyin": "sanya"
				}, {
					"name": "琼海",
					"pinyin": "qionghai"
				}, {
					"name": "儋州",
					"pinyin": "danzhou"
				}, {
					"name": "五指山",
					"pinyin": "wuzhishan"
				}, {
					"name": "文昌",
					"pinyin": "wenchang"
				}, {
					"name": "万宁",
					"pinyin": "wanning"
				}, {
					"name": "屯昌县",
					"pinyin": "tunchangxian"
				}, {
					"name": "琼中",
					"pinyin": "qiongzhong"
				}, {
					"name": "陵水",
					"pinyin": "lingshui"
				}, {
					"name": "临高县",
					"pinyin": "lingaoxian"
				}, {
					"name": "乐东",
					"pinyin": "ledong"
				}, {
					"name": "东方",
					"pinyin": "dongfang"
				}, {
					"name": "定安县",
					"pinyin": "dinganxian"
				}, {
					"name": "澄迈县",
					"pinyin": "chengmaixian"
				}, {
					"name": "昌江",
					"pinyin": "changjiang"
				}, {
					"name": "保亭",
					"pinyin": "baoting"
				}, {
					"name": "白沙",
					"pinyin": "baisha"
				}],
				"hebei": [{
					"name": "石家庄",
					"pinyin": "shijiazhuang"
				}, {
					"name": "唐山",
					"pinyin": "tangshan"
				}, {
					"name": "保定",
					"pinyin": "baoding"
				}, {
					"name": "邯郸",
					"pinyin": "handan"
				}, {
					"name": "沧州",
					"pinyin": "cangzhou"
				}, {
					"name": "廊坊",
					"pinyin": "langfang"
				}, {
					"name": "邢台",
					"pinyin": "xingtai"
				}, {
					"name": "衡水",
					"pinyin": "hengshui"
				}, {
					"name": "秦皇岛",
					"pinyin": "qinhuangdao"
				}, {
					"name": "张家口",
					"pinyin": "zhangjiakou"
				}, {
					"name": "承德",
					"pinyin": "chengde"
				}],
				"heilongjiang": [{
					"name": "哈尔滨",
					"pinyin": "haerbin"
				}, {
					"name": "大庆",
					"pinyin": "daqing"
				}, {
					"name": "佳木斯",
					"pinyin": "jiamusi"
				}, {
					"name": "齐齐哈尔",
					"pinyin": "qiqihaer"
				}, {
					"name": "牡丹江",
					"pinyin": "mudanjiang"
				}, {
					"name": "绥化",
					"pinyin": "suihua"
				}, {
					"name": "鹤岗",
					"pinyin": "hegang"
				}, {
					"name": "鸡西",
					"pinyin": "jixi"
				}, {
					"name": "黑河",
					"pinyin": "heihe"
				}, {
					"name": "双鸭山",
					"pinyin": "shuangyashan"
				}, {
					"name": "伊春",
					"pinyin": "yichun2"
				}, {
					"name": "七台河",
					"pinyin": "qitaihe"
				}, {
					"name": "大兴安岭",
					"pinyin": "daxinganling"
				}, {
					"name": "齐市",
					"pinyin": "qishi"
				}, {
					"name": "加格达奇",
					"pinyin": "jiagedaqi"
				}],
				"henan": [{
					"name": "郑州",
					"pinyin": "zhengzhou"
				}, {
					"name": "新乡",
					"pinyin": "xinxiang"
				}, {
					"name": "焦作",
					"pinyin": "jiaozuo"
				}, {
					"name": "南阳",
					"pinyin": "nanyang"
				}, {
					"name": "许昌",
					"pinyin": "xuchang"
				}, {
					"name": "洛阳",
					"pinyin": "luoyang"
				}, {
					"name": "濮阳",
					"pinyin": "puyang"
				}, {
					"name": "周口",
					"pinyin": "zhoukou"
				}, {
					"name": "开封",
					"pinyin": "kaifeng"
				}, {
					"name": "商丘",
					"pinyin": "shangqiu"
				}, {
					"name": "安阳",
					"pinyin": "anyang"
				}, {
					"name": "平顶山",
					"pinyin": "pingdingshan"
				}, {
					"name": "信阳",
					"pinyin": "xinyang"
				}, {
					"name": "鹤壁",
					"pinyin": "hebi"
				}, {
					"name": "漯河",
					"pinyin": "luohe"
				}, {
					"name": "三门峡",
					"pinyin": "sanmenxia"
				}, {
					"name": "驻马店",
					"pinyin": "zhumadian"
				}, {
					"name": "济源",
					"pinyin": "jiyuan"
				}],
				"hubei": [{
					"name": "武汉",
					"pinyin": "wuhan"
				}, {
					"name": "荆州",
					"pinyin": "jingzhou"
				}, {
					"name": "宜昌",
					"pinyin": "yichang"
				}, {
					"name": "十堰",
					"pinyin": "shiyan"
				}, {
					"name": "荆门",
					"pinyin": "jingmen"
				}, {
					"name": "黄冈",
					"pinyin": "huanggang"
				}, {
					"name": "黄石",
					"pinyin": "huangshi"
				}, {
					"name": "恩施",
					"pinyin": "enshi"
				}, {
					"name": "潜江",
					"pinyin": "qianjiang"
				}, {
					"name": "天门",
					"pinyin": "tianmen"
				}, {
					"name": "仙桃",
					"pinyin": "xiantao"
				}, {
					"name": "随州",
					"pinyin": "suizhou"
				}, {
					"name": "咸宁",
					"pinyin": "xianning"
				}, {
					"name": "孝感",
					"pinyin": "xiaogan"
				}, {
					"name": "鄂州",
					"pinyin": "ezhou"
				}, {
					"name": "襄阳",
					"pinyin": "xiangfan"
				}, {
					"name": "神农架林区",
					"pinyin": "shennongjialinqu"
				}],
				"hunan": [{
					"name": "长沙",
					"pinyin": "changsha"
				}, {
					"name": "衡阳",
					"pinyin": "hengyang"
				}, {
					"name": "永州",
					"pinyin": "yongzhou"
				}, {
					"name": "常德",
					"pinyin": "changde"
				}, {
					"name": "湘潭",
					"pinyin": "xiangtan"
				}, {
					"name": "岳阳",
					"pinyin": "yueyang"
				}, {
					"name": "株洲",
					"pinyin": "zhuzhou"
				}, {
					"name": "邵阳",
					"pinyin": "shaoyang"
				}, {
					"name": "娄底",
					"pinyin": "loudi"
				}, {
					"name": "益阳",
					"pinyin": "yiyang"
				}, {
					"name": "怀化",
					"pinyin": "huaihua"
				}, {
					"name": "郴州",
					"pinyin": "chenzhou"
				}, {
					"name": "湘西",
					"pinyin": "xiangxi"
				}, {
					"name": "张家界",
					"pinyin": "zhangjiajie"
				}, {
					"name": "马王堆",
					"pinyin": "mawangdui"
				}],
				"jiangsu": [{
					"name": "南京",
					"pinyin": "nanjing"
				}, {
					"name": "苏州",
					"pinyin": "suzhou"
				}, {
					"name": "无锡",
					"pinyin": "wuxi"
				}, {
					"name": "徐州",
					"pinyin": "xuzhou"
				}, {
					"name": "宿迁",
					"pinyin": "suqian"
				}, {
					"name": "南通",
					"pinyin": "nantong"
				}, {
					"name": "常州",
					"pinyin": "changzhou"
				}, {
					"name": "淮安",
					"pinyin": "huaian"
				}, {
					"name": "盐城",
					"pinyin": "yancheng"
				}, {
					"name": "泰州",
					"pinyin": "taizhou"
				}, {
					"name": "连云港",
					"pinyin": "lianyungang"
				}, {
					"name": "扬州",
					"pinyin": "yangzhou"
				}, {
					"name": "镇江",
					"pinyin": "zhenjiang"
				}, {
					"name": "昆山",
					"pinyin": "kunshan"
				}],
				"jiangxi": [{
					"name": "南昌",
					"pinyin": "nanchang"
				}, {
					"name": "上饶",
					"pinyin": "shangrao"
				}, {
					"name": "九江",
					"pinyin": "jiujiang"
				}, {
					"name": "萍乡",
					"pinyin": "pingxiang"
				}, {
					"name": "宜春",
					"pinyin": "yichun"
				}, {
					"name": "赣州",
					"pinyin": "ganzhou"
				}, {
					"name": "景德镇",
					"pinyin": "jingdezhen"
				}, {
					"name": "鹰潭",
					"pinyin": "yingtan"
				}, {
					"name": "新馀",
					"pinyin": "xinyu"
				}, {
					"name": "吉安",
					"pinyin": "jian"
				}, {
					"name": "抚州",
					"pinyin": "fuzhou2"
				}, {
					"name": "赣南",
					"pinyin": "gannan"
				}, {
					"name": "荣城",
					"pinyin": "rongcheng"
				}, {
					"name": "新余",
					"pinyin": "xinyu2"
				}],
				"jilin": [{
					"name": "长春",
					"pinyin": "changchun"
				}, {
					"name": "吉林",
					"pinyin": "jilin2"
				}, {
					"name": "四平",
					"pinyin": "siping"
				}, {
					"name": "辽源",
					"pinyin": "liaoyuan"
				}, {
					"name": "通化",
					"pinyin": "tonghua"
				}, {
					"name": "白山",
					"pinyin": "baishan"
				}, {
					"name": "松原",
					"pinyin": "songyuan"
				}, {
					"name": "白城",
					"pinyin": "baicheng"
				}, {
					"name": "顺达",
					"pinyin": "shunda"
				}, {
					"name": "延边",
					"pinyin": "yanbian"
				}],
				"liaoning": [{
					"name": "沈阳",
					"pinyin": "shenyang"
				}, {
					"name": "大连",
					"pinyin": "dalian"
				}, {
					"name": "鞍山",
					"pinyin": "anshan"
				}, {
					"name": "抚顺",
					"pinyin": "fushun"
				}, {
					"name": "盘锦",
					"pinyin": "panjin"
				}, {
					"name": "葫芦岛",
					"pinyin": "huludao"
				}, {
					"name": "丹东",
					"pinyin": "dandong"
				}, {
					"name": "营口",
					"pinyin": "yingkou"
				}, {
					"name": "辽阳",
					"pinyin": "liaoyang"
				}, {
					"name": "锦州",
					"pinyin": "jinzhou"
				}, {
					"name": "本溪",
					"pinyin": "benxi"
				}, {
					"name": "阜新",
					"pinyin": "fuxin"
				}, {
					"name": "铁岭",
					"pinyin": "tieling"
				}, {
					"name": "辽河",
					"pinyin": "liaohe"
				}, {
					"name": "朝阳",
					"pinyin": "chaoyang2"
				}],
				"neimenggu": [{
					"name": "呼和浩特",
					"pinyin": "huhehaote"
				}, {
					"name": "包头",
					"pinyin": "baotou"
				}, {
					"name": "鄂尔多斯",
					"pinyin": "eerduosi"
				}, {
					"name": "赤峰",
					"pinyin": "chifeng"
				}, {
					"name": "巴彦淖尔盟",
					"pinyin": "bayannaoermeng"
				}, {
					"name": "乌海",
					"pinyin": "wuhai"
				}, {
					"name": "呼伦贝尔盟",
					"pinyin": "hulunbeiermeng"
				}, {
					"name": "阿拉善盟",
					"pinyin": "alashanmeng"
				}, {
					"name": "哲里木盟",
					"pinyin": "zhelimumeng"
				}, {
					"name": "兴安盟",
					"pinyin": "xinganmeng"
				}, {
					"name": "乌兰察布盟",
					"pinyin": "wulanchabumeng"
				}, {
					"name": "锡林郭勒盟",
					"pinyin": "xilinguolemeng"
				}, {
					"name": "通辽",
					"pinyin": "tongliao"
				}, {
					"name": "乌兰察布市",
					"pinyin": "wulanchabushi"
				}, {
					"name": "呼伦贝尔",
					"pinyin": "hulunbeier"
				}],
				"ningxia": [{
					"name": "银川",
					"pinyin": "yinchuan"
				}, {
					"name": "石嘴山",
					"pinyin": "shizuishan"
				}, {
					"name": "吴忠",
					"pinyin": "wuzhong"
				}, {
					"name": "固原",
					"pinyin": "guyuan"
				}],
				"qinghai": [{
					"name": "西宁",
					"pinyin": "xining"
				}, {
					"name": "海东",
					"pinyin": "haidong"
				}, {
					"name": "海南",
					"pinyin": "hainan2"
				}, {
					"name": "海西",
					"pinyin": "haixi"
				}, {
					"name": "海北",
					"pinyin": "haibei"
				}, {
					"name": "黄南",
					"pinyin": "huangnan"
				}, {
					"name": "玉树",
					"pinyin": "yushu"
				}, {
					"name": "果洛",
					"pinyin": "guoluo"
				}],
				"shandong": [{
					"name": "济南",
					"pinyin": "jinan"
				}, {
					"name": "青岛",
					"pinyin": "qingdao"
				}, {
					"name": "潍坊",
					"pinyin": "weifang"
				}, {
					"name": "枣庄",
					"pinyin": "zaozhuang"
				}, {
					"name": "临沂",
					"pinyin": "linyi"
				}, {
					"name": "淄博",
					"pinyin": "zibo"
				}, {
					"name": "济宁",
					"pinyin": "jining"
				}, {
					"name": "聊城",
					"pinyin": "liaocheng"
				}, {
					"name": "泰安",
					"pinyin": "taian"
				}, {
					"name": "东营",
					"pinyin": "dongying"
				}, {
					"name": "威海",
					"pinyin": "weihai"
				}, {
					"name": "滨州",
					"pinyin": "binzhou"
				}, {
					"name": "德州",
					"pinyin": "dezhou"
				}, {
					"name": "菏泽",
					"pinyin": "heze"
				}, {
					"name": "日照",
					"pinyin": "rizhao"
				}, {
					"name": "莱芜",
					"pinyin": "laiwu"
				}, {
					"name": "烟台",
					"pinyin": "yantai"
				}, {
					"name": "蔡州",
					"pinyin": "caizhou"
				}],
				"shanghai": [{
					"name": "上海",
					"pinyin": "shanghai2"
				}],
				"shanxi": [{
					"name": "西安",
					"pinyin": "xian"
				}, {
					"name": "咸阳",
					"pinyin": "xianyang"
				}, {
					"name": "渭南",
					"pinyin": "weinan"
				}, {
					"name": "宝鸡",
					"pinyin": "baoji"
				}, {
					"name": "榆林",
					"pinyin": "yulin2"
				}, {
					"name": "铜川",
					"pinyin": "tongchuan"
				}, {
					"name": "延安",
					"pinyin": "yanan"
				}, {
					"name": "汉中",
					"pinyin": "hanzhong"
				}, {
					"name": "安康",
					"pinyin": "ankang"
				}, {
					"name": "商洛",
					"pinyin": "shangluo"
				}],
				"shanxi2": [{
					"name": "太原",
					"pinyin": "taiyuan"
				}, {
					"name": "临汾",
					"pinyin": "linfen"
				}, {
					"name": "运城",
					"pinyin": "yuncheng"
				}, {
					"name": "大同",
					"pinyin": "datong"
				}, {
					"name": "晋中",
					"pinyin": "jinzhong"
				}, {
					"name": "长治",
					"pinyin": "changzhi"
				}, {
					"name": "阳泉",
					"pinyin": "yangquan"
				}, {
					"name": "晋城",
					"pinyin": "jincheng"
				}, {
					"name": "朔州",
					"pinyin": "shuozhou"
				}, {
					"name": "吕梁",
					"pinyin": "lvliang"
				}, {
					"name": "忻州",
					"pinyin": "xinzhou"
				}],
				"sichuan": [{
					"name": "成都",
					"pinyin": "chengdu"
				}, {
					"name": "绵阳",
					"pinyin": "mianyang"
				}, {
					"name": "德阳",
					"pinyin": "deyang"
				}, {
					"name": "南充",
					"pinyin": "nanchong"
				}, {
					"name": "自贡",
					"pinyin": "zigong"
				}, {
					"name": "攀枝花",
					"pinyin": "panzhihua"
				}, {
					"name": "广元",
					"pinyin": "guangyuan"
				}, {
					"name": "内江",
					"pinyin": "neijiang"
				}, {
					"name": "乐山",
					"pinyin": "leshan"
				}, {
					"name": "宜宾",
					"pinyin": "yibin"
				}, {
					"name": "广安",
					"pinyin": "guangan"
				}, {
					"name": "达川",
					"pinyin": "dachuan"
				}, {
					"name": "雅安",
					"pinyin": "yaan"
				}, {
					"name": "眉山",
					"pinyin": "meishan"
				}, {
					"name": "甘孜",
					"pinyin": "ganzi"
				}, {
					"name": "凉山",
					"pinyin": "liangshan"
				}, {
					"name": "泸州",
					"pinyin": "luzhou"
				}, {
					"name": "遂宁",
					"pinyin": "suining"
				}, {
					"name": "资阳",
					"pinyin": "ziyang"
				}, {
					"name": "巴中",
					"pinyin": "bazhong"
				}, {
					"name": "荣县",
					"pinyin": "rongxian"
				}, {
					"name": "阿坝",
					"pinyin": "aba"
				}, {
					"name": "达州",
					"pinyin": "dazhou"
				}],
				"taiwan": [{
					"name": "台湾",
					"pinyin": "taiwan2"
				}],
				"tianjin": [{
					"name": "天津",
					"pinyin": "tianjin2"
				}],
				"xianggang": [{
					"name": "香港",
					"pinyin": "xianggang2"
				}],
				"xinjiang": [{
					"name": "乌鲁木齐",
					"pinyin": "wulumuqi"
				}, {
					"name": "石河子",
					"pinyin": "shihezi"
				}, {
					"name": "克拉玛依",
					"pinyin": "kelamayi"
				}, {
					"name": "伊犁",
					"pinyin": "yili"
				}, {
					"name": "巴音郭勒",
					"pinyin": "bayinguole"
				}, {
					"name": "昌吉",
					"pinyin": "changji"
				}, {
					"name": "克孜勒苏柯尔克孜",
					"pinyin": "kezilesukeerkezi"
				}, {
					"name": "博尔塔拉",
					"pinyin": "boertala"
				}, {
					"name": "吐鲁番",
					"pinyin": "tulufan"
				}, {
					"name": "哈密",
					"pinyin": "hami"
				}, {
					"name": "喀什",
					"pinyin": "kashi"
				}, {
					"name": "和田",
					"pinyin": "hetian"
				}, {
					"name": "阿克苏",
					"pinyin": "akesu"
				}, {
					"name": "乌市",
					"pinyin": "wushi"
				}, {
					"name": "塔城",
					"pinyin": "tacheng"
				}, {
					"name": "巴州库尔勒",
					"pinyin": "bazhoukuerle"
				}, {
					"name": "五家渠",
					"pinyin": "wujiaqu"
				}, {
					"name": "图木舒克",
					"pinyin": "tumushuke"
				}, {
					"name": "克孜勒苏",
					"pinyin": "kezilesu"
				}, {
					"name": "巴音郭楞",
					"pinyin": "bayinguoleng"
				}, {
					"name": "阿拉尔",
					"pinyin": "alaer"
				}],
				"xizang": [{
					"name": "拉萨",
					"pinyin": "lasa"
				}, {
					"name": "日喀则",
					"pinyin": "rikaze"
				}, {
					"name": "山南",
					"pinyin": "shannan"
				}, {
					"name": "林芝",
					"pinyin": "linzhi"
				}, {
					"name": "昌都",
					"pinyin": "changdu"
				}, {
					"name": "阿里",
					"pinyin": "ali"
				}, {
					"name": "那曲",
					"pinyin": "naqu"
				}],
				"yunnan": [{
					"name": "昆明",
					"pinyin": "kunming"
				}, {
					"name": "曲靖",
					"pinyin": "qujing"
				}, {
					"name": "大理",
					"pinyin": "dali"
				}, {
					"name": "玉溪",
					"pinyin": "yuxi"
				}, {
					"name": "昭通",
					"pinyin": "zhaotong"
				}, {
					"name": "楚雄",
					"pinyin": "chuxiong"
				}, {
					"name": "红河",
					"pinyin": "honghe"
				}, {
					"name": "文山",
					"pinyin": "wenshan"
				}, {
					"name": "西双版纳",
					"pinyin": "xishuangbanna"
				}, {
					"name": "保山",
					"pinyin": "baoshan"
				}, {
					"name": "德宏",
					"pinyin": "dehong"
				}, {
					"name": "丽江",
					"pinyin": "lijiang"
				}, {
					"name": "怒江",
					"pinyin": "nujiang"
				}, {
					"name": "迪庆",
					"pinyin": "diqing"
				}, {
					"name": "临沧",
					"pinyin": "lincang"
				}, {
					"name": "州芒",
					"pinyin": "zhoumang"
				}, {
					"name": "普洱",
					"pinyin": "puer"
				}],
				"zhejiang": [{
					"name": "宁波",
					"pinyin": "ningbo"
				}, {
					"name": "杭州",
					"pinyin": "hangzhou"
				}, {
					"name": "温州",
					"pinyin": "wenzhou"
				}, {
					"name": "金华",
					"pinyin": "jinhua"
				}, {
					"name": "嘉兴",
					"pinyin": "jiaxing"
				}, {
					"name": "绍兴",
					"pinyin": "shaoxing"
				}, {
					"name": "湖州",
					"pinyin": "huzhou"
				}, {
					"name": "丽水",
					"pinyin": "lishui"
				}, {
					"name": "衢州",
					"pinyin": "quzhou"
				}, {
					"name": "舟山",
					"pinyin": "zhoushan"
				}, {
					"name": "义乌",
					"pinyin": "yiwu"
				}, {
					"name": "浒山",
					"pinyin": "hushan"
				}, {
					"name": "康桥",
					"pinyin": "kangqiao"
				}, {
					"name": "台州",
					"pinyin": "taizhou2"
				}]
			}
		},
		host: "http://" + window.location.host,
		address: {
            usedcar_clue: "/usedcar/ClueInsert",
			geo: "/site/getAreaByLocation/?location=",
			series: "/search/ajaxSeries",
			ask_list: "/ask/list",
			news_list: "/news/list",
			shop_list: "/shop/list",
			site_autocomplete: "/site/autocomplete",
            site_autonullcomplete: "/site/autonullcomplete",
			question_validate: "/ask/ajaxValidateCommit",
			question_commit: "/ask/ajaxContentCommit",
			comment_commit: "/ask/ajaxCommentFirstCommit",
			comment_validate: "/ask/ajaxCommentAgainCommit",
			send_sms: "/ask/ajaxSendSms",
			login: "/user/login",
			assess: {
				series: "/assess/ajaxSeries",
				year: "/assess/ajaxYear",
				model: "/assess/ajaxModel",
				check: "/assess/view"
			},
			wechat: "/wechat/jssdk_config",
			register_sendsms: "/user/ajaxSendSms",
			register_validsms: "/user/ajaxValidSms",
			register_commit: "/user/register",
			quick_login: "/user/fastLogin",
			feedback_commit: "/feedback/AjaxSubmit",
		}
	};

	var common = {
		"getData": function(dirStr, args, isSync, successCallback, errorCallback) {
			var ajax_url = config.host + dirStr + args;
			$.ajax({
				cache: false,
				type: "GET",
				async: isSync,
				url: ajax_url,
				dataType: "json",
				success: function(returnData) {
					successCallback(returnData);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//window.location.href = "/";
				}
			})
		},
		"postData": function(dirStr, args, isSync, successCallback, errorCallback) {
			var ajax_url = config.host + dirStr;
			if ($("input[name='_jupiter']").val()) {
				var jupiter = "&_jupiter=" + $("input[name='_jupiter']").val();
			} else {
				var jupiter = '';
			}
			$.ajax({
				cache: false,
				type: "POST",
				async: isSync,
				url: ajax_url,
				dataType: "json",
				data: args + jupiter,
				success: function(returnData) {
					successCallback(returnData);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//window.location.href = "/";
				}
			})
		},
		"getpData": function(dirStr, args, isSync, type, successCallback, errorCallback) {
			var ajax_url = config.host + dirStr + args;
			$.ajax({
				cache: false,
				type: "GET",
				async: isSync,
				url: ajax_url,
				dataType: type,
				success: function(returnData) {
					successCallback(returnData);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//window.location.href = "/";
				}
			})
		},
		"geoLocation": function() {
			var _self = this;

			if (window.navigator) {
				window.navigator.geolocation.getCurrentPosition(function(position) {
					_self.getData(config.address.geo, position.coords.latitude + "," + position.coords.longitude, false, function(data) {
						var area_data = data;
						if (area_data.area_ename && area_data.area_ename !== $.fn.cookie("parea")) {
							var area_ename = area_data.area_ename.indexOf("2") > -1 ? area_data.area_ename.substring(0, area_data.area_ename.length - 1) : area_data.area_ename;

							utils.setSessionStorage("gsta", true);
							$.fn.cookie("parea", area_ename, {
								path: "/"
							});
							$(".head-area").html(area_data.area_name + '<i class="ico1"></i>');
							_self.redirectProcessor(area_ename);
						}
					}, function() {});
				}, function() {
					// pc geo test
					// _self.getData(config.address.geo, "30.294529,120.142577", false, function(data){
					// 	var area_data = data;
					// 	if( area_data.area_ename && area_data.area_ename !== $.fn.cookie("parea") ){
					// 		$.fn.cookie("gsta", true,  {path: "/"});
					// 		$.fn.cookie("parea", area_data.area_ename, {path: "/"});
					// 		$(".head-area").html(area_data.area_name + '<i class="ico1"></i>');

					// 		_self.redirectProcessor(area_data.area_ename);
					// 	}
					// }, function(){});
				}, {
					timeout: 2000
				});
			}
		},
		"redirectProcessor": function(ename) {
			var _alias_name = $("#content_part").attr("data-alias");
			var param = utils.queryUrlExtraData();
			if (_alias_name === "car_list") {
				if (param) {
					window.location.href = "http://" + window.location.host + "/" + ename + "/all/?" + param;
				} else {
					window.location.href = "http://" + window.location.host + "/" + ename + "/all/";
				}
			} else if (_alias_name === "index") {
				// TODO
				if (param) {
					window.location.href = "http://" + window.location.host + "/" + ename + "/?" + param;
				} else {
					window.location.href = "http://" + window.location.host + "/" + ename + "/";
				}
			} else if (_alias_name === "error") {
				window.location.reload();
			} else {
				return false;
			}
		}
	}

	var utils = {
		"webkitTransform": function(eleName, recoverArr, callbackProcessed) {
			if (eleName) {
				var wrap_width = $(".wrap").width();
				if (recoverArr.length > 0 && recoverArr instanceof Array) {
					for (var i = 0; i < recoverArr.length; i++) {
						$("#" + recoverArr[i]).show();
					}

					if (utils.getUA() === "firefox") {
						$("#" + eleName).animate({
							"transform": "translate3d(" + wrap_width + "px, 0, 0)"
						}, {
							duration: 300,
							easing: "ease-out",
							complete: callbackProcessed
						})
					} else {
						$("#" + eleName).animate({
							"-webkit-transform": "translate3d(" + wrap_width + "px, 0, 0)"
						}, {
							duration: 300,
							easing: "ease-out",
							complete: callbackProcessed
						})
					}
				} else {
					if (utils.getUA() === "firefox") {
						$("#" + eleName).css("transform", "translate3d(" + wrap_width + "px, 0px, 0px)");
						$("#" + eleName).show();
						$("#" + eleName).animate({
							"transform": "translate3d(0, 0, 0)",
							"-webkit-transition": "0.2s ease-out"
						}, {
							duration: 300,
							easing: "ease-out",
							complete: callbackProcessed
						})
					} else {
						$("#" + eleName).css("-webkit-transform", "translate3d(" + wrap_width + "px, 0px, 0px)");
						$("#" + eleName).show();
						$("#" + eleName).animate({
							"-webkit-transform": "translate3d(0, 0, 0)",
							"-webkit-transition": "0.2s ease-out"
						}, {
							duration: 300,
							easing: "ease-out",
							complete: callbackProcessed
						})
					}
				}
			}
		},
		"coverLayer": {
			"alphaStart": function(isLoading) {
				var _height = ($(window).height() > $(document).height()) ? $(window).height() : $(document).height();
				if (isLoading === false) {
					$(".alpha span").hide();
				} else {
					$(".alpha span").show();
				}

				$(".alpha").height(_height);
				utils.fade($(".alpha"), "in", 200);
			},
			"alphaEnd": function() {
				setTimeout(function() {
					utils.fade($(".alpha"), "out", 200);
				}, 200);
			},
			"tipsCover": function(element, className) {
				var timer = null;
				var element = element || "";

				utils.coverLayer.alphaStart(false);
				utils.fade(element, "in");
				if (className) {
					$("." + className).show().siblings().hide();
				}

				timer = setTimeout(function() {
					clearTimeout(timer);
					utils.fade([$(".alpha"), element], "out");
				}, 2000);
			}
		},
		"fade": function(elementObj, fadeType, speed) {
			var tips_items_arr = ["question-center"];
			if (typeof speed !== "number") speed = 400;

			if (fadeType === "out") {
				if (elementObj instanceof Array) {
					for (var i = 0; i < elementObj.length; i++) {
						elementObj[i].animate({
							opacity: 0
						}, {
							duration: speed,
							easing: "ease-out",
							complete: function() {
								$(this).hide();
								if ($.inArray($(this).attr("class"), tips_items_arr) > -1) {
									$(this).children().hide();
								}
							}
						});
					}
				} else if (typeof elementObj === "object") {
					elementObj.animate({
						opacity: 0
					}, {
						duration: speed,
						easing: "ease-out",
						complete: function() {
							$(this).hide();
							if ($.inArray($(this).attr("class"), tips_items_arr) > -1) {
								$(this).children().hide();
							}
						}
					});
				}
			} else {
				if (elementObj instanceof Array) {
					for (var j = 0; j < elementObj.length; j++) {
						elementObj[j].css({
							opacity: 0,
							display: "block"
						}).animate({
							opacity: 1
						}, {
							duration: speed,
							easing: "ease-in",
							complete: function() {}
						});
					}
				} else if (typeof elementObj === "object") {
					elementObj.parent().css({
						opacity: 1,
						display: "block"
					});
					elementObj.css({
						opacity: 0,
						display: "block"
					}).animate({
						opacity: 1
					}, {
						duration: speed,
						easing: "ease-in",
						complete: function() {}
					});
				}
			}
		},
		"getUA": function() {
			var _ua = navigator.userAgent.toLowerCase();
			if (_ua.match(/msie ([\d.]+)/)) {
				return "ie";
			} else if (_ua.match(/firefox\/([\d.]+)/)) {
				return "firefox";
			} else if (_ua.match(/chrome\/([\d.]+)/)) {
				return "chrome";
			} else if (_ua.match(/opera.([\d.]+)/)) {
				return "opera";
			} else if (_ua.match(/version\/([\d.]+).*safari/)) {
				return "safari";
			}
		},
		"queryUrlData": function(params) {
			var url = location.href;
			var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
			var paraObj = {}
			for (i = 0; j = paraString[i]; i++) {
				paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
			}
			var returnValue = paraObj[params.toLowerCase()];
			if (typeof(returnValue) == "undefined") {
				return "";
			} else {
				return returnValue;
			}
		},
		"queryUrlExtraData": function() {
			var url = location.href;
			if (url.indexOf("?") > -1) {
				var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
				var returnValue = '';
				for (i = 0; j = paraString[i]; i++) {
					var key = j.substring(0, j.indexOf("="));
					if (key == 'param') {
						continue;
					}
					if (returnValue) {
						returnValue += '&' + key + '=' + j.substring(j.indexOf("=") + 1, j.length);
					} else {
						returnValue += key + '=' + j.substring(j.indexOf("=") + 1, j.length);
					}

				}

				if (typeof(returnValue) == "undefined") {
					return "";
				} else {
					return returnValue;
				}
			}
			return "";
		},

		"log": function(str) {
			console.log(str);
		},
		"checkMobile": function(phoneNum) {
			return (/^1[34578]\d{9}$/.test(phoneNum));
		},
		"checkEMail": function(email) {
			return (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email));
		},
		"photoSmallToMedium": function(src) {
			return src.replace('/small/', '/medium/');
		},
		setSessionStorage: function(keyName, data) {
			if (arguments.length == 2 && keyName !== "" && typeof keyName === "string") {
				window.sessionStorage.setItem(keyName, JSON.stringify(data));
			} else {
				data = keyName;
				window.sessionStorage.setItem("_temp", JSON.stringify(data));
			}
		},
		getSessionStorage: function(keyName) {
			return window.sessionStorage.getItem(keyName);
		}
	}

	$.fn.fadeIn = function(speed) {
		var _speed = speed ? speed : 400,
			_$this = $(this);
		_$this.css({
			display: "block",
			opacity: 0
		});
		_$this.animate({
			opacity: 1
		}, _speed, "ease");
	};

	exports.areaData = config.area;
	exports.address = config.address;
	exports.common = common;
	exports.utils = utils;
	exports.log = utils.log;
})
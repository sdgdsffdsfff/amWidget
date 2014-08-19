define(function(require, exports, module) {
/**
 *
 * AW.DateScroller   (require AW.Scroller)
 * )
 * @namespace AW
 * @author 望断 <fengmian.gfm@alibaba-inc.com>
 * @version 1.0.0
 *
 * */
'use strict';

var DateScroller = function (opts) {
	/*
	 * @desc  opts 配置参数
	 *
	 * @param container - 容器
	 * @param defaultDate - 默认初始时间(可选) {
	 *     @param year  - 初始年
	 *     @param month - 初始月
	 *     @param day   - 初始日
	 * }
	 * @param min_date - 最低的年份 --未完善
	 * @param max_date - 最高的年份 --未完善
	 *
	 */

	//获取容器
	this.container = opts.container;

	// 判断容器是否设置
	if (!this.container) {
		return false;
	}

	//获取当前时间，若无设置默认时间，则为当前时间
	var now = new Date();
	this.defaultDate = opts.defaultDate || {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate()
	};
	//获取设置最小时间，若无设置则默认
	this.min_date = /*opts.min_date ||*/ {
		year: 1980,
		month: 1,
		day: 1
	};
	//获取设置最大时间，若无设置则默认
	this.max_date = /*opts.max_date ||*/ {
		year: 2025,
		month: 12,
		day: 31
	};

	this._initScrollers();
	this.select(this.defaultDate);
}

DateScroller.prototype = {
	_initScrollers: function () {
		var self = this;
		var defaultDate = this.defaultDate;
		var defaultDayNumber = _calcDaysNumber(defaultDate.year, defaultDate.month);

		//构建年份滚轮
		this.yearScroller = new Scroller({
			id: 'year-scroller',
			container: this.container,
			data: _getDatas(self.min_date.year, self.max_date.year, "年"),
			selectedCallback: function (year, prevYear) {
				// 如果前后选择的年份相同
				if (year == prevYear) {
					return;
				}

				//如果两次选择同为闰年或者同为平年
				var isCurrentLeapYear = _isLeapYear(year);
				var isPrevLeapYear = _isLeapYear(prevYear);
				if (isCurrentLeapYear == isPrevLeapYear) {
					return;
				}
				var monthScroller = self.monthScroller;
				var dayScroller = self.dayScroller;
				year = parseInt(year);
				prevYear = parseInt(prevYear);
				var month = parseInt(monthScroller.getValue());
				var day = parseInt(dayScroller.getValue());

				var dayNumber = _calcDaysNumber(year, month);
				var dayData = _getDatas(1, dayNumber, "日");

				//当前面的为闰年2月29号时，现设置的年份不为闰年时，日数会发生该百年
				if (month == 2 && day == 29 && (!isCurrentLeapYear)) {
					dayScroller.render(dayData);
					dayScroller.select(day - 1);
				} else {
					dayScroller.render(dayData);
					dayScroller.select(day);
				}
			}
		});

		this.monthScroller = new Scroller({
			id: 'month-scroller',
			container: this.container,
			data: _getDatas(1, 12, "月"),
			selectedCallback: function (month, prevMonth) {
				if (month == prevMonth) {
					return;
				}

				var year = self.yearScroller.getValue();
				var dayNumber = _calcDaysNumber(year, month);
				var prevDayNumber = _calcDaysNumber(year, prevMonth);

				if (dayNumber == prevDayNumber) {
					return;
				}
				var dayData = _getDatas(1, dayNumber, "日");
				var dayScroller = self.dayScroller;
				var day = parseInt(dayScroller.getValue());

				day = self._calcNearestValue(day, dayNumber, prevDayNumber);
				dayScroller.render(dayData);
				dayScroller.select(day);

			}
		});

		this.dayScroller = new Scroller({
			id: 'day-scroller',
			container: this.container,
			data: _getDatas(1, defaultDayNumber, "日")
		});

	},

	_calcNearestValue: function (value, dayNumber, prevDayNumber) {
		if (dayNumber >= prevDayNumber) {
			return value;
		} else {
			return value > dayNumber ? dayNumber : value;
		}
	},

	select: function (date) {
		date.year && this.yearScroller.selectThenCallback(date.year);
		date.month && this.monthScroller.selectThenCallback(date.month);
		date.day && this.dayScroller.select(date.day);
	},

	/*返回当前日期*/
	getValue: function (format) {
		if (!format) {
			return this.getYear() + "-" + this.getMonth() + "-" + this.getDay();
		}
		var result = {
			year: this.yearScroller.getValue(),
			month: this.monthScroller.getValue(),
			day: this.dayScroller.getValue()
		};
		return result;
	},
	getYear: function () {
		return this.yearScroller.getValue();
	},

	getMonth: function () {
		return this.monthScroller.getValue();
	},

	getDay: function () {
		return this.dayScroller.getValue();
	}

};

/*判断是否为闰年*/
function _isLeapYear(year) {
	year = parseInt(year);
	return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

/*设置数据*/
function _getDatas(begin, end, addition) {
	var Datas = [];
	for (var i = begin; i <= end; i++) {
		Datas.push({
			name: i + addition,
			value: i
		});
	}
	return Datas;
}

// 计算公历或农历中指定年的指定月份有多少天
function _calcDaysNumber(year, month) {
	var isLeapYear = _isLeapYear(year);
	month = parseInt(month);
	var daymonthes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return (month == 2 && isLeapYear) ? 29 : daymonthes[month - 1];

}

// 每个条目的高度
var ITEM_HEIGHT = 44;
// 留白区域高度折算成条目的数量
var BLANK_ITEM_NUMBER = 2;
// 留白区域高度
var BLANK_EDGE_HEIGHT = ITEM_HEIGHT * BLANK_ITEM_NUMBER;
// 快速拖动时（flick）的速度调节因数
var SPEED_FACTOR = 3;
// touchstart -> touchend 的间隔时间小于此值时执行滚动动画
var MAX_ANIMATION_TOUCH_MOVE_TIME = 200;
// 最长滚动动画时长
var MAX_ANIMATION_TIME = 1000;
// 回弹动画时长
var RESET_POSITION_ANIMATION_TIME = 0.2;
// 慢速拖动动画时长
var SLOW_DRAG_ANIMATION_TIME = 0.1;
// scroller 能达到的最大 translate Y 值，通过 -webkit-transform 设置
var MAX_TRANSITION_Y = ITEM_HEIGHT * (BLANK_ITEM_NUMBER + 1);

//CSS className
var ITEM_CLASS = 'scroller-item';
/*var SELECTED_CLASS = 'selected';*/

//scroller 的模板
var TEMPLATE =
	'<div class="scroller-component"> \
	  <div class="mask"></div> \
	  <div class="current-indicator"></div> \
	  <div class="scroller"></div> \
	</div>';

var Scroller = window.Scroller = function (opts) {
	/*
	 * @desc  opts 配置参数
	 *
	 * @param id  -  scoller id
	 * @param container - 容器
	 * @param data data
	 */

	var tempContainer = document.createElement('div');
	tempContainer.innerHTML = TEMPLATE;
	this.scrollerComponent = tempContainer.firstElementChild;
	this.scroller = this.scrollerComponent.lastElementChild;

	opts = opts || {};

	var container = opts.container;
	if (container && container.nodeType == 1) {
		container.appendChild(this.scrollerComponent);
	}

	if (opts.id) {
		this.scrollerComponent.setAttribute('id', opts.id);
	}

	if (opts.data) {
		this.render(opts.data);
	}

	this.callback = opts.selectedCallback;
	this._resetHeight();

	this.startYInMove = 0;
	this.touch = null;
	this._init();
}

Scroller.prototype = {
	currentValue: null,
	prevValue: null,

	_init: function () {
		var self = this;
		this._setTransitionDuratoin(RESET_POSITION_ANIMATION_TIME);
		this._bindEvents();
	},

	//绑定每个scroller的滚动事件
	_bindEvents: function () {
		var self = this;
		var scroller = this.scroller;
		var parent = this.scrollerComponent;
		var parentHeight = this.parentHeight;
		var touchStartTime;
		var speed;
		var translating = false;
		;
		var offsetY;
		var prevCurrentTransitionY;
		var animationTime;
		var scrollDistance;
		var targetTransitionY;

		parent.addEventListener('touchstart', function (e) {
			e.preventDefault();
			self._setTransitionDuratoin(0);
			//如果在滚动，触碰则停止转动
			if (translating) {
				translating = false;
				//计算当前位移值
				var matrix = new WebKitCSSMatrix(window.getComputedStyle(self.scroller).webkitTransform);
				var matrixY = matrix.f;
				if (matrixY != targetTransitionY) {
					//撤去事件
					document.removeEventListener('webkitTransitionEnd', self.scroller, false);
					self._setTransformY(matrixY);
				}
				matrix = new WebKitCSSMatrix(window.getComputedStyle(self.scroller).webkitTransform);
			}

			var changedTouch = e.changedTouches[0];
			touchStartTime = +new Date();
			//保存接触时的Y坐标
			self.startY = self.startYInMove = changedTouch.clientY;
			clearTimeout(self.callbackTimer);
		}, false);

		parent.addEventListener('touchmove', function (e) {
			e.preventDefault();
			self.touch = e.changedTouches[0];
			self._setPosition();
		}, false);

		parent.addEventListener('touchend', function (e) {

			var changedTouch = e.changedTouches[0];
			var now = +new Date();
			var currentTransitionY = self._getCurrentTransitionY();

			prevCurrentTransitionY = currentTransitionY;

			// 快速滑动
			if (now - touchStartTime < MAX_ANIMATION_TOUCH_MOVE_TIME) {

				// 通过速度和剩余长度可以得出动画要进行多久，固定一个时间，最长滚动多长时间
				offsetY = changedTouch.clientY - self.startY;
				var speed = Math.abs(offsetY) / (now - touchStartTime) / SPEED_FACTOR;

				// 计算要拖到底部或顶部需要的时间和目标位移值
				if (offsetY < 0) {
					// 向上拖动
					animationTime = Math.abs(-(self.scrollerHeight - parentHeight) - currentTransitionY) / speed;
					targetTransitionY = -(self.scrollerHeight - parentHeight) - BLANK_EDGE_HEIGHT;
				} else {
					// 向下拖动
					animationTime = Math.abs(currentTransitionY) / speed;
					targetTransitionY = BLANK_EDGE_HEIGHT;
				}

				// 计算实际动画执行时间
				if (animationTime > MAX_ANIMATION_TIME) {
					animationTime = MAX_ANIMATION_TIME;
					scrollDistance = speed * animationTime;
					targetTransitionY = offsetY < 0 ? currentTransitionY - scrollDistance : currentTransitionY + scrollDistance;
				}

				targetTransitionY = Math.round(targetTransitionY / ITEM_HEIGHT) * ITEM_HEIGHT;
				animationTime = animationTime / 1000;
			} else {
				// 慢速拖动
				animationTime = SLOW_DRAG_ANIMATION_TIME;
				targetTransitionY = Math.round(currentTransitionY / ITEM_HEIGHT) * ITEM_HEIGHT;
			}

			// 处理滚动内容超出组件显示范围的情况
			if (targetTransitionY > BLANK_EDGE_HEIGHT) {
				targetTransitionY = BLANK_EDGE_HEIGHT;
			} else if (targetTransitionY < self.minTransitionY + ITEM_HEIGHT) {
				targetTransitionY = self.minTransitionY + ITEM_HEIGHT
			}

			// 如果实际滚动距离很短，使用慢速拖动的动画时间
			if (Math.abs(targetTransitionY - currentTransitionY) < BLANK_EDGE_HEIGHT) {
				animationTime = SLOW_DRAG_ANIMATION_TIME;
			}

			//开始转动
			translating = true;
			self._setTransitionDuratoin(animationTime);
			self._setTransformY(targetTransitionY);

			// 获取选中元素的索引
			var index = Math.abs(targetTransitionY / ITEM_HEIGHT - BLANK_ITEM_NUMBER)
			var selectedElem = scroller.children[parseInt(index)];
			if (selectedElem) {

				animationTime = animationTime * 1000;
				// 选中后回调选中值
				self.prevValue = self.currentValue;
				self.currentValue = selectedElem.dataset.value;
				if (typeof self.callback == 'function') {
					self.callback(self.currentValue, self.prevValue);
				}
				self.callbackTimer = setTimeout(function () {
					translating = false;
				}, animationTime);
			}
			self.touch = null;
		}, false);
	},

	_resetHeight: function () {
		this.scrollerHeight = this.scroller.clientHeight;
		this.parentHeight = this.scrollerComponent.clientHeight;
		this.minTransitionY = -(this.scrollerHeight + MAX_TRANSITION_Y - this.parentHeight);
	},

	_setPosition: function (changedTouch) {
		changedTouch = changedTouch || this.touch;
		if (!changedTouch) {
			return;
		}
		var clientY = changedTouch.clientY;
		var offsetY = clientY - this.startYInMove;
		var currentTransitionY = this._getCurrentTransitionY();
		/*新的位移值*/
		var newClientY = currentTransitionY + offsetY;
		if (newClientY > MAX_TRANSITION_Y) {
			newClientY = MAX_TRANSITION_Y;
		} else if (newClientY < this.minTransitionY) {
			newClientY = this.minTransitionY;
		}

		this._setTransformY(newClientY);
		this.startYInMove = clientY;
	},

	//设置滚动时间
	_setTransitionDuratoin: function (s) {
		var value = 'all ' + s + 's ease-out';
		this.scroller.style.webkitTransition = value;
		this.scroller.style.transition = value;
	},

	/*转到指定的transitionY的值的高度*/
	_setTransformY: function (transitionY) {
		this.scroller.style.webkitTransform = trans3dOpen + '(0, ' + transitionY + 'px' + trans3dClose;
	},

	//获取当前的在Y轴的移动的值
	_getCurrentTransitionY: function () {
		var transform = this.scroller.style.getPropertyCSSValue('-webkit-transform');
		return transform ? parseFloat(transform[0][1].cssText) : 0;
	},

	//选择指定下标元素
	selectByIndex: function (index) {
		var scroller = this.scroller;
		if (index < 0 || index > scroller.childElementCount - 1) {
			return false;
		}

		var transitionY = BLANK_EDGE_HEIGHT - ITEM_HEIGHT * index;
		this._setTransitionDuratoin(RESET_POSITION_ANIMATION_TIME);
		this._setTransformY(transitionY);

		var selectedElem = scroller.children[index];
		/*    this._selectElem(selectedElem);*/
		this.prevValue = this.currentValue;
		this.currentValue = selectedElem.dataset.value;
	},

	select: function (value) {
		if (value === undefined || value === null) {
			return this;
		}

		var children = this.scroller.children;
		for (var i = 0, len = children.length; i < len; i++) {
			if (children[i].dataset.value == value) {
				this.selectByIndex(i);
				return;
			}
		}
		return this;
	},

	selectThenCallback: function (value) {
		this.select(value);
		if (typeof this.callback == 'function') {
			this.callback(this.currentValue, this.prevValue);
		}
		return this;
	},

	getValue: function () {
		return this.currentValue;
	},

	setSelectedCallback: function (callback) {
		this.callback = callback;
		return this;
	},

	//填充data,
	render: function (data) {
		if (!data || data.length == 0 || data.constructor !== Array) {
			return false;
		}
		var html = '';
		if (data[0].constructor === Object) {
			data.forEach(function (elem) {
				html += '<div class="' + ITEM_CLASS + '" data-value="' + elem.value + '">' +
					elem.name + '</div>';
			});
		} else {
			data.forEach(function (elem) {
				html += '<div class="' + ITEM_CLASS + '" data-value="' + elem + '">' + elem + '</div>';
			});
		}

		this.scroller.innerHTML = html;
		this._resetHeight();
		return this;
	}
};

//格式化日期，date日期
function format(ds, expr) {
	var z = {
		Y: ds.getYear(),
		y: ds.getYear(),
		M: ds.getMonth(),
		m: ds.getMonth(),
		D: ds.getDay(),
		d: ds.getDay()
	};

	return expr.replace(/([YyMmDd])+/g, function (v, t) {
		switch (t) {
			case 'y':
				return z[t].toString().slice(-v.length);
			case 'Y':
				return z[t].toString().slice(-v.length);
			default:
				return ((v.length > 1 ? '0' : '') + z[t]).slice(-2);
		}
	});

};

window.onload = function () {
	var body = document.body;
	var inputs = document.getElementsByTagName("input");
	var dateInputs = body.querySelectorAll("input[data-type='date']");
	var AW_dateScroller;
	var target;
	var dateScroller;
	//获取初始高度
	body.style.height = "auto";
	var bodyHeight = body.clientHeight;
	var screenHeight = window.innerHeight;

	if (dateInputs[0]) {

		//设置readonlyt属性
		var len = dateInputs.length;
		for (var i = 0; i < len; i++) {
			dateInputs[i].setAttribute("readOnly", "readonly");
		}
		//存在dateType=date类型的input 则创建datescroller
		AW_dateScroller = document.createElement('div');
		AW_dateScroller.id = "ds-container";

		//滚盘选择按钮等
		var optionwWrapper = document.createElement("div");
		optionwWrapper.id = "ds-optionWrapper";
		//确定按钮
		var confirmBtn = document.createElement("span");
		confirmBtn.id = "ds-confirm";
		confirmBtn.className = "ds-btn";
		confirmBtn.innerHTML = "确定";
		//取消按钮
		var cancelBtn = document.createElement("span");
		cancelBtn.id = "ds-cancel";
		cancelBtn.className = "ds-btn";
		cancelBtn.innerHTML = "取消";

		optionwWrapper.appendChild(cancelBtn);
		optionwWrapper.appendChild(confirmBtn);
		AW_dateScroller.appendChild(optionwWrapper);

		document.body.appendChild(AW_dateScroller);
		dateScroller = new DateScroller({container: byId("ds-container")});

		AW_dateScroller.style.display = "none";

		body.addEventListener(END_EVENT, function (e) {

			var targ = e.target;

			var nodeName = targ.nodeName.toUpperCase();
			if (nodeName == "INPUT") {
				var dataType = targ.getAttribute("data-type");
				if (!dataType || dataType != "date") {
					AW_dateScroller.style.display = "none";
					body.style.height = bodyHeight + "px";
				} else {
					targ.setAttribute("readOnly", "readonly");
					target = targ;
					//创建dateScroller
					//延迟300ms弹出。让系统软键盘收回先
					setTimeout(function () {
						AW_dateScroller.style.display = "block";

						//弹出滚盘缓冲 (需改进--需解决offsetParent为body的问题//或者采用获取点击坐标方式)
						var bodyOffsetY = body.scrollTop || document.documentElement.scrollTop;
						var inputBottomOffsetY = target.offsetTop + target.offsetHeight;
						//空余高度
						var emptyHeight = screenHeight - (inputBottomOffsetY - bodyOffsetY);

						var ds_Height = AW_dateScroller.offsetHeight;
						body.style.height = ( bodyHeight + ds_Height) + "px";
						//空余高度不足以放下滚盘
						if (emptyHeight <= ds_Height) {
							var scrollTo_y = ds_Height - emptyHeight;
							body.scrollTop = bodyOffsetY + scrollTo_y;
						}

					}, 300)

				}

			}
			//确定按钮的事件，获得值并且重置

			if (targ.id == "ds-confirm") {

				var value = dateScroller.getValue(false);
				var expr = target.getAttribute("data-format");
				//判断是否有data-format的属性
				if (expr) {
					target.value = format(dateScroller, expr);
				} else {
					target.value = value;
				}
				AW_dateScroller.style.display = "none";
				body.style.height = bodyHeight + "px";
			}
			//取消按钮的事件
			if (targ.id == "ds-cancel") {
				AW_dateScroller.style.display = "none";
				body.style.height = bodyHeight + "px";

			}
		}, false);
	}

}

// Device sniffing
var isIphone = (/iphone/gi).test(navigator.appVersion),
	isIpad = (/ipad/gi).test(navigator.appVersion),
	isAndroid = (/android/gi).test(navigator.appVersion),
	isTouch = isIphone || isIpad || isAndroid,
// Event sniffing
	START_EVENT = isTouch ? 'touchstart' : 'mousedown',
	MOVE_EVENT = isTouch ? 'touchmove' : 'mousemove',
	END_EVENT = isTouch ? 'touchend' : 'mouseup',
// is  translate3d compatible?
	has3d = !('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
	trans3dOpen = has3d ? 'translate3d' : 'translate',
	trans3dClose = has3d ? ', 0)' : ')';

module.exports = DateScroller;
})
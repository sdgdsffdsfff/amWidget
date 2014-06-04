/**
 *
 * AW widget
 * @namespace AW
 * @author 雷骏 <leijun.wulj@alipay.com>
 * @version 1.0.0
 *
 * */
(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) { // 兼容 CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) { // 兼容 AMD / RequireJS
        define(factory);
    } else {
        root.AW = root.AW || {};
        AW.lazyload = factory();
    }
}(this, function (require, exports, module) {
     'use strict';
    /**
     *
     * @namespace
     *
     * @memberof AW
     * */

    var lazyload = {
        /**
         * 默认配置参数
         *
         * @memberof AW.lazyload
         * @param {!Boolean} auto - 是否自动执行
         * @param {!Number} offsetPre - 懒加载提前偏移量，使体验更好
         * @param {!String} lazyAttr - 懒加载替换图片放置路径
         *
         * @desc 默认配置参数
         *
         */
        options:{
            auto:true,
            offsetPre:10,//预加载偏移量，默认10，提升懒加载体验
            lazyAttr:'data-src'
        },
        //lazyload资源池
        matchStack:[],
        /**
         * 初始化方法
         *
         * @memberof AW.lazyload
         * @param {!Object} options - 配置参数
         *
         * @desc 初始化方法(可供外部调用)
         *
         * @example
         * AW.lazyload.init();
         * AW.lazyload.init({offsetPre:20});
         */
        init:function(options){
            var lazyOpition=document.querySelector('body').getAttribute('data-lazy');
            lazyOpition=lazyload._setOptions(lazyload._parseObj(lazyOpition));
            this.options=this._extend(this.options,lazyOpition);
            this._setOptions(options);
            this.runLock=true;
            if(this.options.auto){
                var initStack = document.querySelectorAll('img['+this.options.lazyAttr+']');
                this.add(initStack);
                this.run();
            }
        },
        /**
         * 对资源池添加懒加载监听，仅运行一次
         *
         * @memberof AW.lazyload
         *
         * @desc 对资源池添加懒加载监听，仅运行一次(可供外部调用)
         *
         * @example
         * AW.lazyload.run();
         */
        run:function(){
            if(this.runLock){
                this.runLock=false;
                this._loadFactory();
                window.addEventListener('scroll', this._loadFactory, false);
                window.addEventListener('resize', this._loadFactory, false);
                window.addEventListener('orientchange', this._loadFactory, false);
            }
        },
        /**
         * 添加新的图片
         *
         * @memberof AW.lazyload
         * @param {?String|?Object} addStack - 可以为选择器，可以为节点数据集，可以为节点
         *
         * @desc 添加新的图片(可供外部调用)
         *
         * @example
         * AW.lazyload.add('.lazy img');//选择器
         * AW.lazyload.add([Nodelist]);//节点Nodelist（伪数组）
         * AW.lazyload.add([Array]);//节点Array
         * AW.lazyload.add(ImageElement);//图片节点
         * AW.lazyload.add(OtherElement);//除图片外其它节点，找寻内部图片节点
         * AW.lazyload.add(jQueryObject);//jQuery节点集（伪数组）
         * AW.lazyload.add(ZeptoObject);//Zepto节点集（伪数组）
         *
         */
        add:function(addStack){
            this._lazyStack(addStack);
        },
        /**
         * 参数设置方法
         *
         * @memberof AW.lazyload
         * @param {!Object} options - 配置参数
         *
         * @desc 参数设置方法(仅供内部调用)
         *
         */
        _setOptions:function(options){
            this.options=this._extend(this.options,options);
        },
        /**
         * 继承实现
         *
         * @memberof AW.lazyload
         * @param {!Object} target - 目标对象
         * @param {!Object} source - 重载数据
         *
         * @returns {Object}
         *
         * @desc 继承实现(仅供内部调用)
         *
         */
        _extend:function(target,source){
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }
            return target;
        },
        /**
         * 字符串转对象
         *
         * @memberof AW.lazyload
         * @param {!String} data - 目标数据
         *
         * @returns {Object}
         *
         * @desc 字符串转对象(仅供内部调用)
         *
         */
        _parseObj:function(data){
            try{
                return (new Function("return " + data))();
            }catch(e){
                return {};
            }
        },
        /**
         * 图片资源池构建
         *
         * @memberof AW.lazyload
         * @param {?String|?Object} matchStack - 可以为选择器，可以为节点数据集，可以为节点
         *
         * @desc 图片资源池构建(仅供内部调用)
         *
         */
        _lazyStack:function(matchStack){
            //将matchStack进行处理，获得指定节点集。
            switch(typeof matchStack){
                case 'object':
                    //如果是对象，首先判断是否element节点
                    if(matchStack.nodeType === 1){
                        //如果是img节点，添加进栈，如果其它节点，找寻子节点中是否有满足的img节点
                        if(matchStach.nodeName==='IMG'){
                            var temp=[];
                            Array.prototype.push.call(temp,matchStack);
                            matchStack=temp;
                        }else{
                            matchStach=matchStach.querySelectorAll(this.options.lazyAttr);
                        }
                    }
                    break;
                //如果是字符串，姑且认为是选择器
                case 'string':
                    matchStack = document.querySelectorAll(matchStack);
                    break;
            }
            //将伪数组转为数组
            if(matchStack.length&&matchStack.length>0){
                if(matchStack.constructor.name!=='Array'){
                    matchStack = Array.prototype.slice.call(matchStack);
                }
            }else{
                return;
            }
            this.matchStack=this.matchStack.concat(matchStack);
        },
        /**
         * 加载执行工厂
         *
         * @memberof AW.lazyload
         *
         * @desc 加载执行工厂(仅供内部调用)
         *
         */
        _loadFactory:function() {
            var matchStack=AW.lazyload.matchStack;
            if (matchStack.length === 0) {
                return;
            }
            for (var index = 0; index < matchStack.length; index++) {
                var elem = matchStack[index];
                if (AW.lazyload._isNeedLoad(elem)) {
                    AW.lazyload._lazyimgReplace(elem);
                    //实时从堆栈中删除懒加载已完成节点
                    matchStack.splice(index, 1);
                    index--;
                }
            }
        },
        /**
         * 是否加载图片判断
         *
         * @memberof AW.lazyload
         * @param {!Element} elem - 图片节点
         *
         * @desc 是否加载图片判断(仅供内部调用)
         *
         */
        _isNeedLoad:function(elem) {
            var viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            var offsetPre=this.options.offsetPre;
            var elAxis = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            };
            if (typeof elem.getBoundingClientRect !== "undefined") {
                //此处如果图片未定宽高，那么domready时获取出来的top可能不准确，但不妨碍大局：）
                elAxis = elem.getBoundingClientRect();
            }
            return ((elAxis.bottom + offsetPre >= 0 && elAxis.top - offsetPre < viewport.height) && (elAxis.right + offsetPre >= 0 && elAxis.left - offsetPre < viewport.width) )
        },
        /**
         * 图片节点执行懒加载
         *
         * @memberof AW.lazyload
         * @param {!Element} elem - 图片节点
         *
         * @desc 图片节点执行懒加载(仅供内部调用)
         *
         */
        _lazyimgReplace:function(elem) {
            var lazyAttr=this.options.lazyAttr;
            elem.src = elem.getAttribute(lazyAttr);
            elem.removeAttribute(lazyAttr);
        }

    };

    /**
     * 内部DOMReady后懒加载函数自执行部分功能
     *
     * @desc 内部DOMReady后懒加载函数自执行部分功能
     *
     */
    document.addEventListener("DOMContentLoaded", function () {
        lazyload.init();
        lazyload.run();
    }, false);

    // 兼容 seajs
    if (module && module instanceof Object) {
        module.exports = lazyload;
    }

    return lazyload;
}));
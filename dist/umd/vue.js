(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Mustache = factory());
})(this, (function () { 'use strict';

    /**
     * 扫描器类
     */
    // export default class Scanner  {
    //     constructor(templateStr, data){
    //         this.templateStr = templateStr
    //         this.pos = 0
    //         this.tail = this.templateStr.substr(this.pos)
    //     }
    //     // 指针扫描字符串，知道遇见目标内容结束，并记录扫描过的内容
    //     scanUtil (tag) {
    //         const pos_backup = this.pos
    //         var str = this.tail
    //         while(!this.eos() && this.tail.indexOf(tag) != 0){
    //             this.pos++
    //             this.tail = this.templateStr.substr(this.pos)
    //         }
    //         return this.templateStr.substring(pos_backup, this.pos)
    //     }
    //     // 跳过目标关键字，准备开启下一轮扫描
    //     scan (tag) {
    //         if(this.tail.indexOf(tag) === 0){
    //             this.pos += tag.length
    //             this.tail = this.templateStr.substr(this.pos)
    //         }
    //     }
    //     // 指针是否走到结尾
    //     eos () {
    //         return this.pos >= this.templateStr.length
    //     } 
    // }
    class Scanner {
      constructor(templateStr, data) {
        this.templateStr = templateStr;
        this.data = data;
        this.pos = 0; // 初始化指针

        this.tail = this.templateStr.substr(this.pos); // 初始化尾巴字符串
      } // 扫描标识符，并记录走过内容


      scanUtil(stopTag) {
        var pos_backup = this.pos;

        while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
          this.pos++;
          this.tail = this.templateStr.substr(this.pos);
        }

        return this.templateStr.substring(pos_backup, this.pos);
      } // 跳过标识符


      scan(tag) {
        if (this.tail.indexOf(tag) === 0) {
          var pos_backup = this.pos;
          this.pos += tag.length;
          this.tail = this.templateStr.substr(this.pos);
          return this.templateStr.substring(pos_backup, this.pos);
        }
      } // 查询中止条件


      eos() {
        return this.pos >= this.templateStr.length;
      }

    }

    function NestTokens(tokens) {
      var sections = []; // 作为栈队，记录每层标识符的出入

      var nestTokens, collector;
      nestTokens = collector = []; // 收集每层的内容，并将改变同步到nestTOkens中

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        switch (token[0]) {
          case '#':
            collector.push(token);
            sections.push(token);
            collector = token[2] = [];
            break;

          case '/':
            sections.pop();
            collector = sections.length > 0 ? sections[sections.length - 1][2] : nestTokens;
            break;

          default:
            collector.push(token);
        }
      }

      return nestTokens;
    }

    function ParseTemplateToTokens(templateStr) {
      var tokens = []; // 创建扫描器

      var scanner = new Scanner(templateStr);
      var words; // 扫描工作

      while (!scanner.eos()) {
        // 收集开始标签前的内容
        words = scanner.scanUtil('{{').replace(/\s/g, ''); // todo 合理去除空格

        words ? tokens.push(['text', words]) : '';
        scanner.scan("{{"); // 收集结束标签前的内容

        words = scanner.scanUtil('}}');

        if (words[0] == '#') {
          words ? tokens.push(['#', words.substring(1)]) : '';
        } else if (words[0] == '/') {
          words ? tokens.push(['/', words.substring(1)]) : '';
        } else {
          words ? tokens.push(['name', words]) : '';
        }

        scanner.scan("}}");
      }

      return NestTokens(tokens);
    }

    /**
     * 递归找到数据源中对应属性值
     * @param {数据对象} dataObj 
     * @param {变量名} keyName 
     * @returns 
     */
    function lookup(dataObj, keyName) {
      if (keyName.indexOf('.') != -1 && keyName != '.') {
        // 将.获取属性转化为数组
        var keys = keyName.split('.');
        var temp = dataObj; // 设置一个临时变量，剥洋葱法获取最终值

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          temp = temp[key]; // 一层层获取值，存入临时变量中
        }

        return temp;
      } else {
        return dataObj[keyName];
      }
    }

    /**
     * 遍历渲染数组类型的模板片段，拼接到模板字符串中
     * 渲染仍交由renderTemplate完成，此处存在互相调用
     * @param {数组对应tokens} tokenArr 
     * @param {数组对应数据源} dataObj 
     * @returns 
     */

    function parseArray(tokenArr, dataObj) {
      var resStr = '';
      console.log(tokenArr, dataObj);

      if (Array.isArray(tokenArr)) {
        // 遍历的次数，此时应该由数据源数组的项数决定
        for (let i = 0; i < dataObj.length; i++) {
          const data = dataObj[i]; // 支持{{.}}渲染数组简单项，需在对象上扩展一个'.'属性，值等于本身

          resStr += renderTemplate(tokenArr, { ...data,
            '.': data
          });
        }
      }

      return resStr;
    }

    function renderTemplate(tokens, data) {
      var resStr = '';

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token[0] == 'text') {
          // 普通文本或HTML标签，拼接字符串模板即可
          resStr += token[1];
        } else if (token[0] == 'name') {
          // 变量类型，替换对应数据渲染模板
          resStr += lookup(data, token[1]);
        } else if (token[0] == '#') {
          // 数组类型，需要遍历解析数组，递归渲染模板
          var keyName = token[1];
          var dataObj = lookup(data, keyName);
          resStr += parseArray(token[2], dataObj);
        }
      }

      return resStr;
    }

    // function Vue(options){
    const Mustache = {
      render(templateStr, data) {
        // 将模板处理成tokens
        var tokens = new ParseTemplateToTokens(templateStr);
        console.log(tokens); // 将tokens结合数据，转化为真实html字符串

        var resStr = renderTemplate(tokens, data);
        return resStr; // var scanner = new Scanner(templateStr, data) 
        // while(!scanner.eos()){
        // 	word = scanner.scanUtil('{{')
        // 	console.log(word);
        // 	scanner.scan('{{')
        // 	word = scanner.scanUtil('}}')
        // 	console.log(word);
        // 	scanner.scan('}}')  
        // }
        // var res = lookup({
        // 	a: {
        // 		b: {
        // 			c: 100
        // 		}
        // 	}
        // }, 'a.b.c')
        // console.log(res);
      }

    };

    return Mustache;

}));
//# sourceMappingURL=vue.js.map

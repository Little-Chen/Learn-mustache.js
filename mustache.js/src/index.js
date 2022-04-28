import ParseTemplateToTokens from "./parseTemplateToTokens"
import renderTemplate from "./renderTemplate";
// import lookup from "./lookup"


/**
 * 约定本简版模板引擎功能及api
 * 
 * 功能：
 * 1. 支持小胡子语法
 * 2. 支持数组循环渲染，支持无限层级嵌套
 * 
 * api:
 * 1.变量渲染：{{variable}}
 * 
 * 2.数组循环：
 * 演示数据： 
 * test:[
 *   {
 * 		name: 'A',
 *      sex: 'man'
 *   },
 *   {
 * 		name: 'B',
 *      sex: 'woman'
 *   },
 * ]
 * 
 * 对应模板：
 * {{#Array}}
 * 	  <p>{{name}}</p>
 * 	  <p>{{sex}}</p>
 * {{/Array}}
 */

var word = ''

const Mustache = {
	render (templateStr, data) {
		// 1.将模板处理成tokens
		var tokens = new ParseTemplateToTokens(templateStr)
		console.log(tokens);

		// 2.将tokens结合数据，转化为真实html字符串
		var resStr = renderTemplate(tokens, data)

		return resStr

		// var scanner = new Scanner(templateStr, data) 
		// while(!scanner.eos()){
		// 	word = scanner.scanUtil('{{')
		// 	console.log(word);
		// 	scanner.scan('{{')
		// 	word = scanner.scanUtil('}}')
		// 	console.log(word);
		// 	scanner.scan('}}')  
		// }

		// 测试递归找寻目标属性值
		// var res = lookup({
		// 	a: {
		// 		b: {
		// 			c: 100
		// 		}
		// 	}
		// }, 'a.b.c')
		// console.log(res);
	}
}

export default Mustache
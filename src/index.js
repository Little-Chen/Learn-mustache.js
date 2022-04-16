// function Vue(options){
//     console.log(options)
//     console.log(2)
// }

// export default Vue

import ParseTemplateToTokens from "./parseTemplateToTokens"
import renderTemplate from "./renderTemplate";
// import lookup from "./lookup"

var word = ''

const Mustache = {
	render (templateStr, data) {
		// 将模板处理成tokens
		var tokens = new ParseTemplateToTokens(templateStr)
		console.log(tokens);

		// 将tokens结合数据，转化为真实html字符串
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
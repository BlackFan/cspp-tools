	def = []
	def['Object'] = ["length", "name", "prototype", "assign", "getOwnPropertyDescriptor", "getOwnPropertyDescriptors", "getOwnPropertyNames", "getOwnPropertySymbols", "is", "preventExtensions", "seal", "create", "defineProperties", "defineProperty", "freeze", "getPrototypeOf", "setPrototypeOf", "isExtensible", "isFrozen", "isSealed", "keys", "entries", "fromEntries", "values", "hasOwn"]
	def['Object.prototype'] = ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"]

	def['String'] = ["length", "name", "prototype", "fromCharCode", "fromCodePoint", "raw"]
	def['String.prototype'] = ["length", "constructor", "anchor", "big", "blink", "bold", "charAt", "charCodeAt", "codePointAt", "concat", "endsWith", "fontcolor", "fontsize", "fixed", "includes", "indexOf", "italics", "lastIndexOf", "link", "localeCompare", "match", "matchAll", "normalize", "padEnd", "padStart", "repeat", "replace", "search", "slice", "small", "split", "strike", "sub", "substr", "substring", "sup", "startsWith", "toString", "trim", "trimStart", "trimLeft", "trimEnd", "trimRight", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase", "valueOf", "replaceAll", "at"]

	def['Number'] = ["length", "name", "prototype", "isFinite", "isInteger", "isNaN", "isSafeInteger", "parseFloat", "parseInt", "MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY", "MAX_SAFE_INTEGER", "MIN_SAFE_INTEGER", "EPSILON"]
	def['Number.prototype'] = ["constructor", "toExponential", "toFixed", "toPrecision", "toString", "valueOf", "toLocaleString"]

	def['Array'] = ["length", "name", "prototype", "isArray", "from", "of"]
	def['Array.prototype'] = ["length", "constructor", "concat", "copyWithin", "fill", "find", "findIndex", "lastIndexOf", "pop", "push", "reverse", "shift", "unshift", "slice", "sort", "splice", "includes", "indexOf", "join", "keys", "entries", "values", "forEach", "filter", "flat", "flatMap", "map", "every", "some", "reduce", "reduceRight", "toLocaleString", "toString", "at"]

	def['Function'] = ["length", "name", "prototype", "arguments", "caller"]
	def['Function.prototype'] = ["length", "name", "arguments", "caller", "constructor", "apply", "bind", "call", "toString"]

	def['Boolean'] = ["length", "name", "prototype"]
	def['Boolean.prototype'] = ["constructor", "toString", "valueOf"]

	check = {
		'Object': Object, 
		'Object.prototype': Object.prototype, 
		'String': String, 
		'String.prototype': String.prototype, 
		'Number': Number, 
		'Number.prototype': Number.prototype, 
		'Array': Array, 
		'Array.prototype': Array.prototype, 
		'Function': Function, 
		'Function.prototype': Function.prototype, 
		'Boolean': Boolean, 
		'Boolean.prototype': Boolean.prototype
	}

	function getType(obj) { 
		if(obj == null) return 'null'
		var funcNameRegex = /function (.{1,})\(/
		var results = (funcNameRegex).exec((obj).constructor.toString())
		return (results && results.length > 1) ? results[1] : ""
	}

	function checkProperties(obj, objType, path) {
		var filtered = Object.getOwnPropertyNames(obj).filter(value => (!(def[objType] ?? []).includes(value)) && !(objType=="String" && /\d/.test(value)))
		filtered.forEach(k => {
			kpath = `${path}["${k}"]`
			type = getType(obj[k])
			if(!['Function'].includes(type))
				console.log(`%c${kpath} ${type}`, 'background: #222; color: #bada55;')
			else
				console.log(`${kpath} ${type}`)
			if(obj[k] != null)
			checkProperties(obj[k], type, `${kpath}`)
		})
	}

	Object.keys(check).forEach(key => {
		checkProperties(check[key], key, key)
	})
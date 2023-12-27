class Tree {
	loop(data, parentNode) {
		if (!Array.isArray(data)) return;
		return data.map((item) => {
			const node = new Node(item);
			node.parent = parentNode;
			node.children = this.loop(item.children, node);
			return node;
		});
	}
}

/**
 * 在树中搜索节点
 * @param {node[]} nodes
 * @param {Function} filter 搜索条件
 * @param {Function|undefined} done 结束条件
 * @returns node[]
 */
Tree.search = function (nodes, filter, done) {
	if (!Array.isArray(nodes)) return;
	const res = [];
	for (const node of nodes) {
		if (done?.(node)) break;
		if (filter(node)) res.push(node);
		res.push(Tree.search(node.children, filter, done));
	}
	return res.flat().filter(Boolean);
};

Tree.find = function (nodes, filter) {
	let findNode;
	Tree.search(
		nodes,
		(node) => {
			const includes = filter(node);
			if (includes) findNode = node;
			return includes;
		},
		() => findNode !== undefined
	);
	return findNode;
};

class Node {
	/**
	 * 获取所有子孙节点
	 */
	getNodes() {
		if (!Array.isArray(this.children)) return;
		return this.children
			.map((child) => [child].concat(child.getNodes()))
			.flat()
			.filter(Boolean);
	}
	/**
	 * 获取所有父级
	 */
	getParents() {
		const parent = this.parent;
		if (!parent) return;
		return [parent].concat(parent.getParents()).filter(Boolean);
	}
	constructor(data) {
		this.data = data;
	}
}
const generateRandomTreeData = (() => {
	let startId = 10;

	const randomCount = () => Math.floor(Math.random() * 5) + 1;

	function randomString(length, chars) {
		let result = "";
		for (let i = length; i > 0; --i)
			result += chars[Math.floor(Math.random() * chars.length)];
		return result;
	}

	class Node {
		name = randomString(6, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		path = randomString(6, "abcdefghijklmnopqrstuvwxyz");
	}

	const randomNodes = () =>
		Array(randomCount())
			.fill(undefined)
			.map(() => new Node());

	return function generate(depth) {
		depth = Math.min(depth, 10);
		if (depth <= 0) return;
		--depth;
		return randomNodes().map((node) => {
			node.id = startId++;
			const children = generate(depth);
			if (children) {
				node.children = children;
			}
			return node;
		});
	};
})();

/**
 * 
 * @param {string[]} paths 
 */
function pathsToTree(paths) {
	const tree = [];
	paths.forEach(path => {
		const arr = path.split("/");
		let length = arr.length;
		let i = 0;
		let parentChildren = tree;
		while (i < length) {
			const label = arr[i];
			const find = parentChildren.find(node => node.label === label);
			const obj = find || { ...{ label }, children: i + 1 !== length ? [] : undefined };
			if (!find) parentChildren.push(obj);
			parentChildren = obj.children;
			i++;
		}
	});
	return tree;
}


module.exports = {
	Tree,
	Node,
	generateRandomTreeData,
	pathsToTree,
};

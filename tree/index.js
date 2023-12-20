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

module.exports = {
	Tree,
	Node,
};

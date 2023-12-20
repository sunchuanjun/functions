const dataJson = require("../tree/data.json");
const { Tree, Node } = require("../tree/index");

function _each(arr) {
	if (!Array.isArray(arr)) return;
	return arr
		.map((item) => [item].concat(_each(item.children)))
		.flat()
		.filter(Boolean);
}

const tree = new Tree();
const root = new Node();
const treeData = tree.loop(dataJson, root);

var assert = require("assert");
describe("Tree", function () {
	describe("#loop()", function () {
		it("转换后个数相同", function () {
			assert.ok(_each(dataJson).length === _each(treeData).length);
		});

		it("转换为Node[]格式", function () {
			_each(treeData).forEach((node) => {
				assert.ok(node instanceof Node);
			});
		});

		it("父级parent类型是Node", function () {
			_each(treeData).forEach((node) => {
				assert.ok(node.parent instanceof Node);
			});
		});
		it("子级children类型是Node", function () {
			_each(treeData)
				.map((node) => node.children)
				.flat()
				.filter(Boolean)
				.forEach((childNode) => {
					assert.ok(childNode instanceof Node);
				});
		});
	});
	describe("#search()", function () {
		it("结果个数正确", function () {
			const F1 = (node) => node.data.name.includes("HY");
			const R1 = Tree.search(treeData, F1);
			assert.ok(R1.length === 3);
			const F2 = (node) => node.data.name.includes("AD");
			const R2 = Tree.search(treeData, F2);
			assert.ok(R2.length === 3);
		});
		it("结果类型为Node[]", function () {
			const F1 = (node) => node.data.name.includes("HY");
			const R1 = Tree.search(treeData, F1);
			R1.forEach((node) => {
				assert.ok(node instanceof Node);
			});
		});
		it("结果符合条件", function () {
			const F1 = (node) => node.data.name.includes("HY");
			const R1 = Tree.search(treeData, F1);
			R1.forEach((node) => {
				assert.ok(F1(node));
			});
		});
		it("终止条件有效", function () {
			const names = ["IQQWEL", "GJGNDR"];
			let count = 0;
			const F1 = (node) => {
				const index = names.indexOf(node.data.name);
				const includes = index !== -1;
				includes && names.splice(index, 1);
				++count;
				return includes;
			};
			const R1 = Tree.search(treeData, F1, () => names.length === 0);
			assert.ok(count < _each(treeData).length);
		});
	});

	describe("#find()", function () {
		it("找到符合条件", function () {
			const F1 = (node) => node.data.name === "HULZHA";
			const node = Tree.find(treeData, F1);
			assert.ok(F1(node));
		});
	});
});

describe("Node", function () {
	describe("#getNodes()", function () {
		it("结果个数正确", function () {
			const F1 = (node) => node.data.name === "HULZHA";
			const node = Tree.find(treeData, F1);
			assert.ok(node.getNodes().length === 18);
		});
		it("类型为Node,undefined为leaf", function () {
			_each(treeData).forEach((node) => {
				const nodes = node.getNodes();
				if (nodes) {
					nodes.forEach((node) => {
						assert.ok(node instanceof Node);
					});
				} else {
					const leaf = !Array.isArray(node.children);
					assert.ok(leaf);
				}
			});
		});
	});
	describe("#getParents()", function () {
		it("结果个数正确", function () {
			const F1 = (node) => node.data.name === "GPBUQD";
			const node = Tree.find(treeData, F1);
			assert.ok(node.getParents().length === 3);
		});
		it("顶层为root", function () {
			_each(treeData).forEach((node) => {
				const nodes = node.getParents();
				assert.ok(nodes.at(-1) === root);
			});
		});
	});
});

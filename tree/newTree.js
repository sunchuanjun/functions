const DEFAULT_CONFIG = {
    id: 'id',
    children: 'children',
    pid: 'pid'
}
class Tree {
    constructor(
        config
    ) {
        this.config = Object.assign({}, DEFAULT_CONFIG, config);
    }
    fromTree(tree) {
        this.tree = tree;
    }
    fromList(list) {
        const nodeMap = new Map(), result = [], { id, children, pid } = this.config;
        for (const node of list) {
            node[children] = node[children] || []
            nodeMap.set(node[id], node)
        }
        for (const node of list) {
            const parent = nodeMap.get(node[pid]);
            (parent ? parent[children] : result).push(node)
        }
        this.tree = result;
    }
    toList() {
        const { children } = this.config, result = [...this.tree]
        for (let i = 0; i < result.length; i++) {
            if (!result[i][children]) continue
            result.splice(i + 1, 0, ...result[i][children])
        }
        return result
    }

    findNode(func) {
        const { children } = this.config, list = [...this.tree]
        for (let node of list) {
            if (func(node)) return node
            node[children] && list.push(...node[children])
        }
        return null
    }

    findNodeAll(func) {
        const { children } = this.config, list = [...this.tree], result = []
        for (let node of list) {
            func(node) && result.push(node)
            node[children] && list.push(...node[children])
        }
        return result
    }

    findPath(func) {
        const path = [], list = [...this.tree], visitedSet = new Set(), { children } = this.config
        while (list.length) {
            const node = list[0]
            if (visitedSet.has(node)) {
                path.pop()
                list.shift()
            } else {
                visitedSet.add(node)
                node[children] && list.unshift(...node[children])
                path.push(node)
                if (func(node)) return path
            }
        }
        return null
    }

    findPathAll(func) {
        const path = [], list = [...this.tree], result = []
        const visitedSet = new Set(), { children } = this.config
        while (list.length) {
            const node = list[0]
            if (visitedSet.has(node)) {
                path.pop()
                list.shift()
            } else {
                visitedSet.add(node)
                node[children] && list.unshift(...node[children])
                path.push(node)
                func(node) && result.push([...path])
            }
        }
        return result
    }

    filter(func) {
        const { children } = this.config
        function listFilter(list) {
            return list.map(node => ({ ...node })).filter(node => {
                node[children] = node[children] && listFilter(node[children])
                return func(node) || (node[children] && node[children].length)
            })
        }
        return listFilter(this.tree)
    }

    forEach(func) {
        const list = [...this.tree], { children } = this.config
        for (let i = 0; i < list.length; i++) {
            func(list[i])
            list[i][children] && list.splice(i + 1, 0, ...list[i][children])
        }
    }

    _insert(node, targetNode, after) {
        const { children } = this.config
        function insert(list) {
            let idx = list.indexOf(node)
            idx < 0 ? list.forEach(n => insert(n[children] || [])) : list.splice(idx + after, 0, targetNode)
        }
        insert(this.tree, node)
    }

    insertBefore(newNode, oldNode) {
        this._insert(oldNode, newNode, 0)
    }

    insertAfter(oldNode, newNode) {
        this._insert(oldNode, newNode, 1)
    }

    removeNode(func) {
        const { children } = this.config, list = [this.tree]
        while (list.length) {
            const nodeList = list.shift()
            const delList = nodeList.reduce((r, n, idx) => (func(n) && r.push(idx), r), [])
            delList.reverse()
            delList.forEach(idx => nodeList.splice(idx, 1))
            const childrenList = nodeList.map(n => n[children]).filter(l => l && l.length)
            list.push(...childrenList)
        }
    }
    getAllChildren(node) {
        const { children } = this.config, list = node[children], result = [];
        while (list?.length) {
            const item = list.shift();
            result.push(item);
            if ([children] in item) list.push(...item[children]);
        }
        return result
    }
}

module.exports = Tree

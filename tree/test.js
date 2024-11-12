const Tree = require('./newTree.js');

const instance = new Tree({ pid: "parentId" });

function getTree() {
  const tree = [
    {
      id: '1',
      title: '节点1',
      children: [
        {
          id: '1-1',
          title: '节点1-1'
        },
        {
          id: '1-2',
          title: '节点1-2',
          children: [
            {
              id: '1-2-1',
              title: '节点1-2-1'
            },
            {
              id: '1-2-2',
              title: '节点1-2-2'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: '节点2',
      children: [
        {
          id: '2-1',
          title: '节点2-1'
        }
      ]
    }
  ]
  return tree
}

function getList() {
  const list = [
    {
      id: '1',
      title: '节点1',
      parentId: '',
    },
    {
      id: '1-1',
      title: '节点1-1',
      parentId: '1'
    },
    {
      id: '1-2',
      title: '节点1-2',
      parentId: '1'
    },
    {
      id: '2',
      title: '节点2',
      parentId: ''
    },
    {
      id: '2-1',
      title: '节点2-1',
      parentId: '2'
    }
  ]
  return list
}

// 列表结构转树
function testFromList() {
  const tree = instance.fromList(getList())
  console.log(JSON.stringify(tree, null, 2))
}

// 树结构转列表结构
function testToList() {
  instance.fromTree(getTree())
  const list = instance.toList()
  console.log(list.map(i => i.id))
}

// 查找节点
function testFindNode() {
  const callback = node => node.id == '2-1'
  instance.fromTree(getTree())
  const result = instance.findNode(callback)
  console.log(JSON.stringify(result, null, 2))
}

// 查找符合条件的所有节点
function testFindNodeAll() {
  const list = getList()
  instance.fromList(list)

  const callback = node => node.parentId == '1'
  const result = instance.findNodeAll(callback)
  console.log(JSON.stringify(result, null, 2))
}

// 查找节点路径
function testFindPath() {
  const callback = node => node.id == '1-2-2'
  instance.fromTree(getTree())
  const result = instance.findPath(callback)
  console.log(result.map(i => i.id))
}

// 查找符合条件的所有节点的路径
function testFindPathAll() {
  const callback = node => node.id == '2-1' || node.id == '1-2-1';
  instance.fromTree(getTree())
  const result = instance.findPathAll(callback)
  console.log(result)
}

// 树节点过滤
function testFilter() {
  const callback = node => node.id == '2-1'
  instance.fromTree(getTree())
  const result = instance.filter(callback)
  console.log(JSON.stringify(result, null, 2))
}

// 树节点遍历 深度优先
function testForEach() {
  const idList = [];
  instance.fromTree(getTree())
  instance.forEach(node => idList.push(node.id))
  console.log(idList)
}

// 节点插入：在node前插入newNode
function testInsertBefore() {
  instance.fromTree(getTree())
  const node = instance.findNode(n => n.id == '1-2-1')
  const newNode = {
    id: '1-2-0-9',
    title: '节点1-2-0-9'
  }
  instance.insertBefore(newNode, node)
  const idList = []
  instance.forEach(node => idList.push(node.id))
  console.log(idList)
}

// 节点插入：在node后插入newNode
function testInsertAfter() {
  instance.fromTree(getTree())
  const node = instance.findNode(n => n.id == '1-2-1')
  const newNode = {
    id: '1-2-2-99',
    title: '节点1-2-2'
  }
  instance.insertAfter(node, newNode)
  const idList = []
  instance.forEach(node => idList.push(node.id))
  console.log(idList)
}

// 节点删除：删除符合条件的Node
function testRemoveNode() {
  instance.fromTree(getTree())
  instance.removeNode(n => n.id == '2')
  console.log(JSON.stringify(instance.tree, null, 2))
}

function testGetAllChildren() {
  instance.fromTree(getTree())
  const node = instance.findNode(n => n.id == '1');
  console.log(instance.getAllChildren(node))
}

function test() {
  // testToList()
  // testFromList()
  // testFindNode()
  // testFindNodeAll()
  testFindPath()
  // testFilter()
  // testForEach()
  // testFindPathAll()
  // testInsertBefore()
  // testInsertAfter()
  // testRemoveNode()
  // testGetAllChildren()
}

test()
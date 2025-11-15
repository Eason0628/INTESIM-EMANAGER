export function list2tree(
    list: any[],
    keyField: string,
    parentField: string,
    childrenField: string
) {
    let map = {};
    let tree: any[] = [];
    for (let it of list) {
        map[it[keyField]] = it;
    }
    for (let i in map) {
        if (parentField in map[i] && map[map[i][parentField]]) {
            if (!map[map[i][parentField]][childrenField]) {
                map[map[i][parentField]][childrenField] = [];
            }
            if (map[map[i][parentField]][childrenField]) {
                map[map[i][parentField]][childrenField].push(map[map[i][keyField]]);
                map[map[i][parentField]][childrenField].sort(
                    (t1: any, t2: any) => t1.sortNum - t2.sortNum
                );
            }
        } else {
            tree.push(map[i]);
        }
    }
    return tree;
}

export function tree2list(arr: any[]) {
    let stack = arr;
    let data: any[] = [];
    while (stack.length) {
      let { children, ...item } = stack.pop();
      data.push(item);
      if (children)
        for (let i = children.length - 1; i >= 0; i--) stack.push(children[i]);
    }
    return data;
  }
  
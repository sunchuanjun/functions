import { BehaviorSubject } from 'rxjs';

// 创建一个全局状态管理
class GlobalState {
    constructor() {
        // 使用 BehaviorSubject，初始值为空对象
        this.state$ = new BehaviorSubject({});
    }

    // 获取当前状态
    getState() {
        return this.state$.getValue();
    }

    // 更新状态
    setState(newState) {
        // 将新状态合并到当前状态中
        const currentState = this.getState();
        this.state$.next({ ...currentState, ...newState });
    }
}
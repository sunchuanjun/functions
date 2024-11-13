
import ClipboardJS from "clipboard"

const map = new Map();

function change(el, { value }) {

    value = String(value)

    if (map.has(el)) {

        const obj = map.get(el);

        obj.value = value;

    } else {
        const obj = { value };

        const clipboard = new ClipboardJS(el, {
            text: () => obj.value
        });

        obj.clipboard = clipboard;

        map.set(el, obj);

        clipboard.on("success", () => {
            console.log("复制成功")
        })

        clipboard.on("error", () => {
            console.log("复制失败")
        })

    }
}

export default {
    created: change,
    updated: change,
    beforeUnmount: (el) => {
        const obj = map.get(el);
        obj.clipboard.destroy();
        map.delete(el);
    }
};
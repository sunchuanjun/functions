
const DEFAULT_IMAGE_URL = './empty-img.png';

export default {
    mounted(el, binding) {
        updateImage(el, binding.value);
    },
    update(el, binding) {
        updateImage(el, binding.value);
    },
}

// 辅助函数：更新图片源并验证有效性
function updateImage(el, src) {
    el.src = src; // 更新图片地址
    el.classList.remove('default-img');
    validateImage(el, src);
}

// 验证图片有效性
function validateImage(el, src) {
    const img = new Image();
    img.src = src;
    // 检测图片是否有效
    img.onload = () => {
        // 图片有效
    };
    img.onerror = () => {
        el.src = DEFAULT_IMAGE_URL; // 图片无效，则使用默认图像
        el.classList.add('default-img'); // 加入"默认图片"的 CSS 类
    };
}
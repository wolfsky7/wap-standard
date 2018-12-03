export const data = [
    {
        title: "首页",
        href: "/",
        navId: "home",
        cls: "tab-icon-home"
    }, {
        title: "大师",
        href: "/app/t2",
        cls: "tab-icon-master",
        navId: "master"
    }, {
        title: "学习",
        href: "/app/t3",
        cls: "tab-icon-study",
        navId: "learn"
    }, {
        title: "消息",
        href: "/app/t4",
        cls: "tab-icon-msg",
        navId: "msg",
        badge: 3
    }, {
        title: "我的",
        href: "/app/t5",
        cls: "tab-icon-my",
        navId: "my"
    }
]

export const showFooter = href => {
    if (!href) {
        return true;
    }
    const index = data.findIndex(item => item.href == href);
    // console.log("footer" + href + "--" + index);
    return index != -1
}

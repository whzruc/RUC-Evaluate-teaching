// 定义点击列表中元素的函数
function clickElementsInSequence(xpathList) {
    const result = document.evaluate(xpathList, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    const elements = [];

    // 保存所有匹配的节点到数组
    for (let i = 0; i < result.snapshotLength; i++) {
        elements.push(result.snapshotItem(i));
    }


    

    // 如果没有元素，终止操作
    if (elements.length === 0) {
        console.log('没有更多的元素可供点击。');
        return;
    }

    // 定义一个递归函数来逐个处理元素
    function processNextElement(index) {
        if (index >= elements.length) {
            console.log('所有元素已处理完毕。');
            return;
        }

        const element = elements[index];
        console.log('点击列表中的元素:', element);
        element.click(); // 点击当前元素进入新界面

        // 使用 MutationObserver 等待页面变化，确保新界面完全加载后执行 click_all
        const observer = new MutationObserver((mutations, obs) => {
            const newElement = document.querySelector("div.paper_title_p");
            if (newElement) {
                console.log('新页面加载完成，执行 click_all 操作...');
                obs.disconnect(); // 停止观察
                click_all(() => {
                    console.log('click_all 操作完成，等待界面自动退出...');
                    
                    // 等待界面自动退出后继续处理下一个元素
                    waitForElementToDisappear("//div[@class='paper_title_p']", function() {
                        console.log('界面退出完成，继续下一个元素...');
                        processNextElement(index + 1); // 处理下一个元素
                    });
                });
            }else{
                console.log('点击列表中的元素:', element);
                element.click(); // 点击当前元素进入新界面

                // 如果页面没有变化，尝试刷新页面
                console.log('未检测到新页面元素，等待页面刷新...');
                setTimeout(() => {
                    window.location.reload();
                }, 3000); // 等待3秒后刷新页面
            }
        });

        // 开始观察文档的根节点
        observer.observe(document, { childList: true, subtree: true });
    }

    // 开始处理第一个元素
    processNextElement(0);
    // for(let i=0;i<result.snapshotLength;i++){
        // processNextElement(i);
    // }
}

// 等待指定元素消失的函数
function waitForElementToDisappear(xpath, callback, delay = 500) {
    const interval = setInterval(() => {
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const targetElement = result.singleNodeValue;

        if (!targetElement) {
            console.log('元素已消失，继续执行...');
            clearInterval(interval); // 停止检测
            if (callback) callback(); // 执行回调函数
        }
    }, delay);
}



// 启动点击过程，传入要处理的元素列表 XPath

clickElementsInSequence("//div[@class='bh-card bh-card-lv1 bh-pull-left bh-m-8']//div[@class='sc-panel-diagonalStrips sc-panel-warning']/div[@class='sc-panel-diagonalStrips-text pjwj_card_content']");







function click_all(callback){
    // 第一步：使用 XPath 表达式查找所有目标 <i> 元素并点击
    const xpath1 = "//div[@class='paper_tm']//label[5]/i";
    const result1 = document.evaluate(xpath1, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    // 将所有匹配的节点保存到数组
    const elements1 = [];
    for (let i = 0; i < result1.snapshotLength; i++) {
        elements1.push(result1.snapshotItem(i));
    }
    
    // 遍历数组并点击每个元素
    elements1.forEach(element => {
        console.log('点击元素:', element); // 输出当前元素到控制台
        element.click(); // 点击当前元素
    });
    
    // 第二步：等待一段时间后再执行第二次点击操作
    setTimeout(() => {
        const xpath2 = "//footer[@id='pjfooter']/a[2]";
        const result2 = document.evaluate(xpath2, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const targetElement2 = result2.singleNodeValue;
    
        // 点击第二个目标元素
        if (targetElement2) {
            console.log('点击第二个元素:', targetElement2); // 输出到控制台
            targetElement2.click();
        } else {
            console.error('未找到指定的第二个元素');
        }
    }, 1000); // 1秒后执行第二次点击操作
    
    // 第二步：等待一段时间后再执行第二次点击操作
    setTimeout(() => {
        const xpath3 = "//div[@class='bh-dialog-btnContainerBox']/a[1]";
        const result3 = document.evaluate(xpath3, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const targetElement3 = result3.singleNodeValue;
    
        // 点击第二个目标元素
        if (targetElement3) {
            console.log('点击第三个元素:', targetElement3); // 输出到控制台
            targetElement3.click();
        } else {
            console.error('未找到指定的第三个元素');
        }

        // 如果提供了回调函数，则调用它
        if (typeof callback === 'function') {
            callback();
        }
    }, 1000); // 1秒后执行第二次点击操作
}

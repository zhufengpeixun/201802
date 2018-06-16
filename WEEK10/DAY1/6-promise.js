class Promise {
    constructor(excutorCallBack) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledAry = [];
        this.rejectedAry = [];

        //=>执行EXCUTOR（异常捕获）
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledAry.forEach(item => item(this.value));
            }, 0);
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                this.rejectedAry.forEach(item => item(this.value));
            }, 0);
        };
        try {
            excutorCallBack(resolveFn, rejectFn);
        } catch (err) {
            //=>有异常信息按照REJECTED状态处理
            rejectFn(err);
        }
    }

    then(fulfilledCallBack, rejectedCallBack) {
        //=>返回一个新的PROMISE实例
        

        this.fulfilledAry.push(fulfilledCallBack);
        this.rejectedAry.push(rejectedCallBack);
    }
}

module.exports = Promise;
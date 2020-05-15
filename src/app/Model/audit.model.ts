
interface IAudit {
    userName: string;
    reqStartTime: number;
    reqEndTime: number;
    reqDuration: number;
    location: string;
    deviceName: string;
    viewName: string;
}

export class Audit {
    userName: string;
    reqStartTime: number;
    reqEndTime: number;
    reqDuration: number;
    location: string;
    deviceName: string;
    viewName: string;

    constructor(obj?: IAudit) {
        this.userName = obj && obj.userName || ""
        this.reqStartTime = obj && obj.reqStartTime || 0
        this.reqEndTime = obj && obj.reqEndTime || 0
        this.reqDuration = obj && obj.reqDuration || 0
        this.location = obj && obj.location || ""
        this.deviceName = obj && obj.deviceName || ""
        this.viewName = obj && obj.viewName || ""
    }
}
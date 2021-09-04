import { Notyf } from "notyf";

class Nofity {
    private notification = new Notyf({ duration: 10000, position: { x: "left", y: "top" } });

    public success(message: string): void {
        this.notification.success(message);
    }

    public error(err: any): void {
        const message = this.getErrorMessage(err);
        this.notification.error(message);
    }

    private getErrorMessage(err: any) {
        console.log( err);
        if (typeof err === "string") {
            return err;
        }
        if (typeof err.response?.data === "string") {
            return err.response.data;
        }
        if (Array.isArray(err.response?.data)) {
            return err.response.data[0];
        }
        if (typeof err.message === "string") {
            return err.message;
        }
        return "some error occurred, please try again";
    }
}

const notify = new Nofity();

export default notify;

import { Notyf } from "notyf";

class Notify {

    private notification = new Notyf({ duration: 1500, ripple: false, position: { x: "left", y: "center" } });

    public success(message: string): void {
        this.notification.success(message);
    }

    public error(err: any): void {
        const message = this.getErrorMessage(err);
        this.notification.error(message);
    }
    


    private getErrorMessage(err: any) {
        if (typeof err === "string") {
            return err;
        }

        if (typeof err.response?.data === "string") {
            return err.response.data;
        }

        if (Array.isArray(err.response?.data)) {
            let allErrors = "";
            for (const item of err.response.data) {
                allErrors += item + "\n";
            }
            return allErrors;
        }

        if (typeof err.message === "string") {
            return err.message;
        }

        return "Some error occurred, please try again.";
    }
}

const notify = new Notify();

export default notify;